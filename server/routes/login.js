var express = require("express");
var router = express.Router();
var Join = require("../models").Join;
var cors = require("cors");
router.use(cors());

/* GET users listing. */
router.post("/", function(req, res, next) {
  if (!req.body.params.pnum) {
    res.json(JSON.stringify("휴대폰 번호를 입력하세요"));
  } else if (!req.body.params.pw) {
    res.json(JSON.stringify("비밀번호를 입력하세요"));
  } else {
    /* Join 테이블의 데이터를 가져오는 SQL문 */
    Join.findAll({
      /* db_ptype, db_pnum, db_name, db_pw, db_birth 값을 가져옴 */
      attributes: ["db_ptype", "db_pnum", "db_name", "db_pw", "db_birth"],

      /* 조건과 값이 일치하는 경우 */
      where: {
        db_pnum: req.body.params.pnum,
        db_pw: req.body.params.pw
      }
    })
      /* 조회 성공시 */
      .then(result => {
        console.log("result : " + JSON.stringify(result));

        let DB2 = JSON.stringify(result);
        let DB1 = JSON.parse(DB2);
        let DB = DB1[0];
        if (DB) {
          console.log("DB", DB);

          //req.session.login = true;
          res.json({ result: 1, pnum: DB.db_pnum, name: DB.db_name });
        } else {
          res.json({ result: 0 });
        }
      })
      /* 조회 실패시 */
      .catch(err => {
        console.error("err : " + err);
        next(err);
      });
  }
});

module.exports = router;
