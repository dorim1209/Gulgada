var express = require("express");
var router = express.Router();
var Timelog = require("../models").Timelog;
var cors = require("cors");
router.use(cors());

router.post("/", function(req, res) {
  /* Timelog 테이블의 데이터를 생성하는 SQL문 */
  Timelog.create({
    db_pnum: req.body.params.pnum,
    db_name: req.body.params.name,
    db_go: req.body.params.go,
    db_leave: req.body.params.leave,
    db_timelog: req.body.params.timelog
  })
    /* 조회 성공시 */
    .then(result => {
      console.log("result : " + result);
      /* result 값을 json 형태로 리턴 */
      res.status(201).json({ result: req.body.params.timelog });
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("err : " + err);
    });
});

module.exports = router;
