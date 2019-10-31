var express = require("express");
var router = express.Router();
var Article = require("../models").Article;
var cors = require("cors");
router.use(cors());

router.post("/", function(req, res) {
  /* Article 테이블의 데이터를 생성하는 SQL문 */
  console.log(req.body);
  Article.create({
    db_title: req.body.params.title,
    db_date: req.body.params.date,
    db_money: req.body.params.money,
    db_address: req.body.params.address
  })
    /* 조회 성공시 */
    .then(result => {
      console.log("result : " + result);
      /* result 값을 json 형태로 리턴 */
      res.status(201).json({ result: "공고가 등록 되었습니다." });
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("err : " + err);
    });
});

module.exports = router;
