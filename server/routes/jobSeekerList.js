var express = require("express");
var router = express.Router();
var Apply = require("../models").Apply;
var Contract = require("../models").Contract;
var Key = require("../models").Key;
var cors = require("cors");
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651"); // cypress에서는 "https://api.cypress.klaytn.net:8651"를 사용하세요.

router.use(cors());


router.post("/accept", function (req, res) {

    console.log(req.body);
    //1. db_articleId 로 해당 칼럼의 db_accept 값을 전달 받은 db_accect으로 update해주기  
    Apply.update({
        db_accept: 0,
    }, {
        where: {
            db_articleId: req.body.params.articleId
        }
    }).then(result1 => {
        Apply.findAll({
            attributes: [
                "db_articleId",
                "db_apubKey",
                "db_opubKey",
            ],
            where: {
                db_articleId: req.body.params.articleId
            }
        }).then(article => {
            let article2 = JSON.stringify(article);
            let article1 = JSON.parse(article2);
            let article3 = article1[0];

            Key.findAll({
                attributes: [
                    "db_privatekey",
                ],
                where: {
                    db_publickey: article3.db_opubKey
                }
            }).then(result3 => {
                console.log(result3);
                let a1 = JSON.stringify(result3);
                let a2 = JSON.parse(a1);
                let a3 = a2[0];

                console.log('db_privatekey : ', a3.db_privatekey);


                const klayOwner = () => {
                    const contractAbi = '[{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"workerAddr","type":"address"},{"indexed":false,"name":"ContractData","type":"bytes32"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PaperUploaded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"uint8"}],"name":"accepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"indexId","type":"uint256"}],"name":"createdIndex","type":"event"},{"constant":false,"inputs":[{"name":"ownerAddr","type":"address"},{"name":"workerAddr","type":"address"}],"name":"createPaper","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"indexId","type":"uint256"}],"name":"ownerAcception","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"indexId","type":"uint256"},{"name":"ContractData","type":"bytes32"}],"name":"uploadPaper","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalPaperCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"indexId","type":"uint256"}],"name":"getPaper","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint8"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]';
                    let ownerKey = a3.db_privatekey;
                    console.log(111111111111, ownerKey);
                    let wokerAddress = article.db_apubKey;

                    const walletInstanceAdmin = caver.klay.accounts.privateKeyToAccount(
                        "0xe8aa335fbee3cbcacee311f266fb596c2f7afb34cf0d82c5041714832be4b5f6" // 고정 어드민
                    );
                    const walletInstance = caver.klay.accounts.privateKeyToAccount(
                        ownerKey
                    );
                    caver.klay.accounts.wallet.add(walletInstanceAdmin);
                    caver.klay.accounts.wallet.add(walletInstance);
                    console.log('caver.klay.accounts.wallet[1].address : ', caver.klay.accounts.wallet[1].address);


                    console.log("22222222222", caver.klay.accounts.wallet[0].address);
                    // console.log(caver.klay.accounts.wallet[1].address);

                    // 고정된 컨트랙트 배포 주소
                    let contractAddress = "0x4f0e72fe3703b659df5f4af0f545d2d6c39a404a"

                    // owner
                    const contractAdmin = new caver.klay.Contract(JSON.parse(contractAbi), contractAddress, {
                        from: caver.klay.accounts.wallet[0].address
                    });
                    // 어드민 컨트랙트 인스턴스
                    const contract = new caver.klay.Contract(JSON.parse(contractAbi), contractAddress, {
                        from: caver.klay.accounts.wallet[1].address
                    })

                    // 인자 두개 해당하는 공고 누구인지 주소 넣기
                    async function create(ownerAddr, wokerAddr) {
                        console.log(caver.klay.accounts.wallet[0].address);

                        await contractAdmin.methods.createPaper(ownerAddr, wokerAddr)
                            .send({ from: caver.klay.accounts.wallet[0].address, gas: "5000000" })//caver.klay.accounts.wallet[0].address
                            .then(function (result) {
                                console.log('adasdasdasdas : ', result.events.createdIndex.returnValues['0']);
                                contract.methods.ownerAcception(result.events.createdIndex.returnValues['0'])
                                    .send({ from: caver.klay.accounts.wallet[1].address, gas: "5000000" })//caver.klay.accounts.wallet[0].address
                                    .then(function (result) {
                                        console.log(result);
                                    })
                            });
                    }
                    console.log('article3.db_apubKey : ', article3.db_apubKey);


                    create(article3.db_opubKey, article3.db_apubKey)
                }

                klayOwner();
            })
        })
    })
})

router.post("/", function (req, res) {
    console.log("jobSeekerList");
    console.log(req.body);

    Apply.findAll({
        attributes: [
            "db_title",
            "db_wtype",
            "db_accept",
            "db_apubKey",
            "db_articleId"
        ],
        where: {
            db_opubKey: req.body.params.db_pubkey
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