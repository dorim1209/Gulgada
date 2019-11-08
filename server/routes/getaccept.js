var express = require("express");
var router = express.Router();
var Apply = require("../models").Apply;
var cors = require("cors");
router.use(cors());

router.post("/", function(req, res) {
  // console.log("id", id);
  Apply.findAll({
    attributes: ["db_accept"],

    // 조건과 값이 일치하는 경우
    where: {
      db_apubKey: req.body.params.apubKey,
      db_opubKey: req.body.params.opubKey
    }
  })
    // 조회 성공시
    .then(result => {
      console.log("result : " + result);
      res.status(201).json({ result: db_accept });
      console.log("result : " + result);
    })
    // 조회 실패시
    .catch(err => {
      console.error("err : " + err);
      next(err);
    });
});

module.exports = router;
