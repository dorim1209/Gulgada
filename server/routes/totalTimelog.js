var express = require("express");
var router = express.Router();
var Timelog = require("../models").Timelog;
var cors = require("cors");
router.use(cors());

router.post("/", function (req, res) {
  console.log('asdasdasdasd: ', req.body.params);

  /* Timelog 테이블의 데이터를 생성하는 SQL문 */
  Timelog.findAll({
    attributes: ["db_resultFlag", "db_milliTime"],

    /* 조건과 값이 일치하는 경우 */
    where: {
      db_pnum: req.body.params.pnum,
    }
  })
    /* 조회 성공시 */
    .then(result => {
      console.log(result);
      let time_1 = 0;
      let time_0 = 0;
      result.map(result => {
        console.log(result.db_resultFlag);
        console.log(result.db_milliTime);
        if (result.db_resultFlag === '1') {
          time_1 = time_1 + parseInt(result.db_milliTime)
        } else {
          time_0 = time_0 + parseInt(result.db_milliTime)
        }
      })

      const total = msToTime(time_1 - time_0)
      console.log('안녕 테스트 모드 : ', total);

      /* result 값을 json 형태로 리턴 */
      res.status(201).json({ result: total });
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("err : " + err);
    });
});

/* 시간 변환 */
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100)
    , seconds = parseInt((duration / 1000) % 60)
    , minutes = parseInt((duration / (1000 * 60)) % 60)
    , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return (hours + "시" + minutes + "분");
}

module.exports = router;