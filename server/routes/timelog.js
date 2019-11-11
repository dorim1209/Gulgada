var express = require("express");
var router = express.Router();
var Timelog = require("../models").Timelog;
var cors = require("cors");
router.use(cors());

router.post("/", function (req, res) {
  console.log('asdasdasdasd: ', req.body.params);

  /* Timelog 테이블의 데이터를 생성하는 SQL문 */
  Timelog.create({
    db_pnum: req.body.params.pnum,
    db_name: req.body.params.name,
    db_resultFlag: req.body.params.resultFlag,
    db_timeLog: req.body.params.timeLog,
    db_milliTime: req.body.params.milliTime
  })
    /* 조회 성공시 */
    .then(result => {

      const DB = JSON.stringify(result)
      console.log("DB : " + DB);

      /* result 값을 json 형태로 리턴 */
      res.status(201).json({ result: req.body.params.timeLog });
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("err : " + err);
    });
});

module.exports = router;
