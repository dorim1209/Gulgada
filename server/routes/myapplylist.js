var express = require("express");
var router = express.Router();
var Apply = require("../models").Apply;
var Article = require("../models").Article;
var Contract = require("../models").Contract;
var Key = require("../models").Key;

const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651"); // cypress에서는 "https://api.cypress.klaytn.net:8651"를 사용하세요.
var sha256 = require('js-sha256').sha256;

const contractAbi = '[{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"workerAddr","type":"address"},{"indexed":false,"name":"ContractData","type":"bytes32"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PaperUploaded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"uint8"}],"name":"accepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"indexId","type":"uint256"}],"name":"createdIndex","type":"event"},{"constant":false,"inputs":[{"name":"ownerAddr","type":"address"},{"name":"workerAddr","type":"address"}],"name":"createPaper","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"indexId","type":"uint256"}],"name":"ownerAcception","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"indexId","type":"uint256"},{"name":"ContractData","type":"bytes32"}],"name":"uploadPaper","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalPaperCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"indexId","type":"uint256"}],"name":"getPaper","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint8"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]';


var cors = require("cors");
router.use(cors());
router.post("/accept", function (req, res) {
    console.log("계약서 서명 하기야 : ", req.body);


    //1. db_articleId 로 해당 칼럼의 db_accept 값을 전달 받은 db_accect으로 update해주기  
    Apply.update({
        db_accept: 1,
    }, {
        where: {
            db_articleId: req.body.params.db_articleId
        }
    }).then(result => {
        Apply.findAll({
            attributes: [
                "db_articleId",
                "db_apubKey",
                "db_opubKey",
            ],
            where: {
                db_articleId: req.body.params.db_articleId
            }
        }).then(result => {

            console.log("계약서 서명 하기 result : ", result);

            let DB2 = JSON.stringify(result);
            let DB1 = JSON.parse(DB2);
            let DB = DB1[0];

            Article.findAll({
                attributes: ["id", "db_sdate", "db_edate", "db_stime", 'db_smin', 'db_etime', 'db_emin', 'db_money', 'db_address'],
                where: {
                    id: req.body.params.db_articleId
                }
            }).then(article => {

                console.log('DB.db_articleId : ', DB.db_articleId);

                let article2 = JSON.stringify(article);
                let article1 = JSON.parse(article2);
                let article3 = article1[0];

                let hash = (sha256(DB.db_articleId + DB.db_apubKey + DB.db_opubKey + article3.db_sdate + article3.db_edate + article3.db_stime + article3.db_smin + article3.db_etime + article3.db_emin + article3.db_money + article3.db_address))

                Key.findAll({
                    attributes: [
                        "db_privatekey",
                    ],
                    where: {
                        db_publickey: DB.db_apubKey
                    }
                }).then(result => {
                    console.log('Key.result', result);
                    let result1 = JSON.stringify(result);
                    let result2 = JSON.parse(result1);
                    let result3 = result2[0];


                    // 1. 로그인된 유저키 받기
                    const walletInstance = caver.klay.accounts.privateKeyToAccount(result3.db_privatekey);
                    caver.klay.accounts.wallet.add(walletInstance);

                    // 고정된 컨트랙트 배포 주소
                    let contractAddress = "0x0947b7bf36ec2ad06adce327bbe6688e78a2214d";

                    const contract = new caver.klay.Contract(JSON.parse(contractAbi), contractAddress, {
                        from: caver.klay.accounts.wallet[0].address
                    });

                    const signWorker = (indexNum, hash) => {
                        contract.methods
                            .uploadPaper(indexNum, hash)
                            .send({ from: caver.klay.accounts.wallet[0].address, gas: "5000000" })
                            .then(function (result1) {
                                console.log(result1);
                            })
                    }
                    signWorker(DB.db_articleId, '0x' + hash)
                })
            });

        }).catch(err => {
            console.error("Apply findAll err : " + err);
            next(err);
        });
    })
})



router.post("/", function (req, res) {
    console.log("myapplylist");
    console.log("asdasdasdasasdasdas : ", req.body);

    Apply.findAll({
        attributes: [
            "db_title",
            "db_wtype",
            "db_accept",
            "db_apubKey",
            "db_articleId"
        ],
        where: {
            db_apubKey: req.body.params.db_pubkey
        }, order: [['db_articleId', 'DESC']]
    })
        .then(result => {
            console.log('123123123123123123:', result);
            let DB = JSON.stringify(result)
            console.log('222222222222:', DB);
            let DB1 = JSON.parse(DB)
            console.log('1111111:', DB1);

            res.send({ result: DB1 });
        })
        .catch(err => {
            console.error("Apply findAll err : " + err);
            next(err);
        });
})

module.exports = router;