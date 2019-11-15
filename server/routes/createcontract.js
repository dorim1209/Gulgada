var express = require("express");
var router = express.Router();
var Apply = require("../models").Apply;
var Contract = require("../models").Contract;
var cors = require("cors");
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651"); // cypress에서는 "https://api.cypress.klaytn.net:8651"를 사용하세요.

router.use(cors());


router.post("/", function (req, res) {
    Apply.findAll({
        attributes: [
            "db_articleId",
            "db_title",
            "db_wtype",
            "db_name",
            "db_apubKey",
            "db_opubKey",
            "db_accept"
        ],
        where: {
            db_opubKey: req.body.params.pubKey
        }
    })
        .then(applyList => {
            res.send({ applyList: applyList });
        })
        .catch(err => {
            console.error("Apply findAll err : " + err);
            next(err);
        });
});

router.post("/approve", function (req, res) {

    const findDB = () => {

        Apply.findAll({
            attributes: ["db_accept", "db_articleId", "db_apubKey", "db_opubKey"],

            // 조건과 값이 일치하는 경우
            where: {
                db_articleId: req.body.params.articleId // parameter 값 수정
            }
        }).then(Apply.update(
            { db_accept: "0" },
            {
                where: {
                    db_articleId: req.body.params.articleId,
                    db_apubKey: req.body.params.apubKey
                }
            } // parameter 값 수정
        )).then(Contract.create({
            articleId: req.body.params.articleId, //articleId 가져옴
            owner_key: req.body.params.opubKey, //owner_key 가져옴
            worker_key: req.body.params.apubKey //worker_key 가져옴
        }))

        const getPrivateKey = async () => {
            const key = await Key.findAll({
                attributes: ["db_privatekey"],
                where: {
                    db_publickey: req.body.params.pubKey
                }
            });
        }
        result = {
            Num: req.body.params.articleId,
            ownerkey: getPrivateKey(),
            workerAddr: req.body.params.apubKey
        }

        return result;
    }

    // 조회 성공시

    const klayOwner = (result) => {
        const contractAbi = '[{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"workerAddr","type":"address"},{"indexed":false,"name":"ContractData","type":"bytes32"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PaperUploaded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"uint8"}],"name":"accepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"indexId","type":"uint256"}],"name":"createdIndex","type":"event"},{"constant":false,"inputs":[{"name":"ownerAddr","type":"address"},{"name":"workerAddr","type":"address"}],"name":"createPaper","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"indexId","type":"uint256"}],"name":"ownerAcception","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"indexId","type":"uint256"},{"name":"ContractData","type":"bytes32"}],"name":"uploadPaper","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalPaperCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"indexId","type":"uint256"}],"name":"getPaper","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint8"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]';
        let ownerKey = result.ownerkey;
        console.log(111111111111, ownerKey);
        let wokerAddress = result.workerAddr;

        const walletInstanceAdmin = caver.klay.accounts.privateKeyToAccount(
            "0xe8aa335fbee3cbcacee311f266fb596c2f7afb34cf0d82c5041714832be4b5f6" // 고정 어드민
        );
        const walletInstance = caver.klay.accounts.privateKeyToAccount(
            ownerkey
        );
        caver.klay.accounts.wallet.add(walletInstanceAdmin);
        caver.klay.accounts.wallet.add(walletInstance);

        console.log("111111111111", caver.klay.accounts.wallet[0].address);
        // console.log(caver.klay.accounts.wallet[1].address);

        // 고정된 컨트랙트 배포 주소
        let contractAddress = "0x9e1b995c15a7caf4cde521e5f0a6a5cb2db9262a"

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
            await contractAdmin.methods.createPaper(ownerAddr, wokerAddr)
                .send({ from: caver.klay.accounts.wallet[0].address, gas: "5000000" })//caver.klay.accounts.wallet[0].address
                .then(function (result) {
                    console.log(result.events.createdIndex.returnValues['0']);
                    contract.methods.ownerAcception(result.events.createdIndex.returnValues['0'])
                        .send({ from: ownerAddress, gas: "5000000" })//caver.klay.accounts.wallet[0].address
                        .then(function (result) {
                            console.log(result);
                        })
                });
        }

        create(caver.klay.accounts.wallet[1].address, wokerAddress)
    }


    klayOwner(findDB());


    res.send();





});

router.post("/deny", function (req, res) {
    Apply.findAll({
        attributes: ["db_accept", "db_articleId", "db_apubKey", "db_opubKey"],

        // 조건과 값이 일치하는 경우
        where: {
            db_articleId: req.body.params.articleId // parameter 값 수정
        }
    })
        // 조회 성공시
        .then(
            Apply.update(
                { db_accept: "1" },
                {
                    where: {
                        db_articleId: req.body.params.articleId,
                        db_apubKey: req.body.params.apubKey
                    }
                } // parameter 값 수정
            )
                .then(result => {
                    console.log("result : " + result);
                    res.status(201).json({ result: "거부되었습니다." });
                })
                .catch(err => {
                    console.error("Contract err : " + err);
                })
        )
        .catch(err => {
            console.error("Apply err : " + err);
        })

        .catch(err => {
            console.error("Join findAll err : " + err);
            next(err);
        });
});
module.exports = router;