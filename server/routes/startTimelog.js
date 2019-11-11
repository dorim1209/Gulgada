var express = require("express");
var router = express.Router();
var Timelog = require("../models").Timelog;
var cors = require("cors");
router.use(cors());

router.post("/", function (req, res) {
  console.log('asdasdasdasd: ', req.body.params);

  /* Timelog 테이블의 데이터를 생성하는 SQL문 */
  Timelog.findAll({
    /* limit: 1, */
    attributes: ["db_resultFlag", "db_timeLog"],

    /* 조건과 값이 일치하는 경우 */
    where: {
      db_pnum: req.body.params.pnum,
    }, order: [['db_milliTime', 'DESC']]
  })
    /* 조회 성공시 */
    .then(result => {
      console.log("초장부터 장난질이냐 : " + result[0].db_resultFlag);

      /* result 값을 json 형태로 리턴 */
      res.status(201).json({ result: result[0].db_resultFlag });
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("err : " + err);
    });
});

module.exports = router;
