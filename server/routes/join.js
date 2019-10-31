var express = require("express");
var router = express.Router();
var Join = require("../models").Join;
var cors = require("cors");
router.use(cors());

router.post("/", function(req, res) {
  /* Join 테이블의 데이터를 생성하는 SQL문 */
  console.log(req.body);
  Join.create({
    db_ptype: req.body.params.ptype, // 수정
    db_pnum: req.body.params.pnum, // 수정
    db_name: req.body.params.name, //수정
    db_pw: req.body.params.pw, //수정
    db_birth: req.body.params.birth //수정
  })
    /* 조회 성공시 */
    .then(result => {
      console.log("result : " + result);
      /* result 값을 json 형태로 리턴 */
      res.status(201).json({ result: "회원가입되었습니다." });
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("err : " + err);
    });
});

module.exports = router;
