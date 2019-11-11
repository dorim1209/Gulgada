var express = require("express");
var router = express.Router();
var Join = require("../models").Join;
var Key = require("../models").Key;
var cors = require("cors");
router.use(cors());

const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

router.post("/", function(req, res) {
  const account = caver.klay.accounts.create();
  console.log("******************************************");
  console.log("account.address : ", account.address);
  console.log("account.accountKey : ", account.accountKey);
  console.log("account.privateKey : ", account.privateKey);
  console.log("account.signTransaction : ", account.signTransaction);
  console.log("account.sign : ", account.sign);
  console.log("account.encrypt : ", account.encrypt);
  console.log("account.getKlaytnWalletKey : ", account.getKlaytnWalletKey);
  console.log("******************************************");
  /* Join 테이블의 데이터를 생성하는 SQL문 */
  console.log(req.body);

  Key.create({
    db_publickey: account.address,
    db_privatekey: account.privateKey
  })
    /* 조회 성공시 */
    .then(result => {
      console.log("result : " + result);
      /* result 값을 json 형태로 리턴 */
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("Key _ err : " + err);
    });

  Join.create({
    db_ptype: req.body.params.ptype,
    db_pnum: req.body.params.pnum,
    db_name: req.body.params.name,
    db_pw: req.body.params.pw,
    db_birth: req.body.params.birth,
    db_public: account.address
  })
    .then(result => {
      console.log("result : " + result);
      res.status(201).json({ result: "회원가입되었습니다." });
    })
    .catch(err => {
      console.error("Join _ err : " + err);
    });
});

function Key(db_publickey, db_privatekey) {
  Key.create({
    db_publickey: db_publickey,
    db_privatekey: db_privatekey
  })
    /* 조회 성공시 */
    .then(result => {
      console.log("result : " + result);
      /* result 값을 json 형태로 리턴 */
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("Key _ err : " + err);
    });
}
module.exports = router;
