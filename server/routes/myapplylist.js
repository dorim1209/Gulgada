var express = require("express");
var router = express.Router();
var Join = require("../models").Join;
var Apply = require("../models").Apply;
var cors = require("cors");
router.use(cors());

router.post("/", function(req, res) {
  Join.findAll({
    attributes: ["db_public"],

    // 조건과 값이 일치하는 경우
    where: {
      db_pnum: req.body.params.pnum
    }
  })
    // 조회 성공시
    .then(result => {
      console.log(
        "result[0].dataValues.db_public",
        result[0].dataValues.db_public
      );
      console.log("성공");

      Apply.findAll({
        attributes: ["db_title", "db_wtype", "db_accept", "db_apubKey"],
        where: {
          db_apubKey: result[0].dataValues.db_public
        }
      })
        .then(myApplyList => {
          console.log("myApplyList[0].dataValues", myApplyList[0].dataValues);
          console.log("myApplyList.dataValues", myApplyList.dataValues);
          console.log("myApplyList", myApplyList);

          res.send({ myApplyList: myApplyList });
        })
        .catch(err => {
          console.error("Apply findAll err : " + err);
          next(err);
        });
    })

    // 조회 실패시

    .catch(err => {
      console.error("Join.err : " + err);
      next(err);
    });
});

module.exports = router;
