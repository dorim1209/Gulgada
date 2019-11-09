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
      db_pnum: req.body.params.pnum // 보내주는 전화번호와 db의 전화번호 비교
    }
  })
    // 조회 성공시
    .then(result => {
      console.log(result[0].dataValues.db_public);
      console.log("성공");

      Apply.findAll({
        attributes: [
          "db_articleId",
          "db_title",
          "db_wtype",
          "db_name",
          "db_apubKey",
          "db_opubKey",
          "db_accept"
        ],
        where: {
          db_opubKey: result[0].dataValues.db_public
        }
      })
        .then(applyList => {
          console.log("applyList[0].dataValues", applyList[0].dataValues);
          console.log("applyList.dataValues", applyList.dataValues);
          console.log("applyList", applyList);

          res.send({ applyList: applyList });
        })
        .catch(err => {
          console.error("Apply findAll err : " + err);
          next(err);
        });
    })
    .catch(err => {
      console.error("Join findAll err : " + err);
      next(err);
    });
});

router.post("/approve", function(req, res) {
  Apply.findAll({
    attributes: ["db_accept"],

    // 조건과 값이 일치하는 경우
    where: {
      db_articleId: req.body.params.articleId // parameter 값 수정
    }
  })
    // 조회 성공시
    .then(
      Apply.update(
        { db_accept: "0" },
        {
          where: {
            db_articleId: req.body.params.articleId,
            db_apubKey: req.body.params.apubKey
          }
        } // parameter 값 수정
      )
        .then(result => {
          console.log("result : " + result);
          res.status(201).json({ result: 0 });

          //create Contract Data
          /*
          Contract.create({
            articleId: Apply.db_articleId, //articleId 가져옴
            owner_key: db_opubKey, //owner_key 가져옴
            worker_key: db_apubKey, //worker_key 가져옴

          })
            .then(result => {
              console.log("result : " + result);
              res.status(201).json({ result: "계약서 작성 완료" });
            })
            .catch(err => {
              console.error("Contract err : " + err);
            });
            */
        })
        .catch(err => {
          console.error("Apply err : " + err);
        })
    )
    .catch(err => {
      console.error("Join findAll err : " + err);
      next(err);
    });
});

router.post("/deny", function(req, res) {
  Article.findAll({
    attributes: ["db_accept"],

    // 조건과 값이 일치하는 경우
    where: {
      db_articleId: req.body.params.articleId, // parameter 값 수정
      db_apubKey: req.body.params.apubKey, // parameter 값 수정
      db_opubKey: req.body.params.opubKey // parameter 값 수정
    }
  })
    // 조회 성공시
    .then(
      Apply.update(
        { db_accept: "1" },
        { where: { db_articleId: req.body.params.articleId } } // parameter 값 수정
      )
        .then(result => {
          console.log("result : " + result);
          res.status(201).json({ result: "거절하셨습니다." });
        })
        .catch(err => {
          console.error(err);
        })
    )
    .catch(err => {
      console.error("Join findAll err : " + err);
      next(err);
    });
});
module.exports = router;
