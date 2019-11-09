var express = require("express");
var router = express.Router();
var Apply = require("../models").Apply;
var Article = require("../models").Article;
var cors = require("cors");
router.use(cors());

router.post("/", function(req, res) {
  Article.findAll({
    /* id, db_pubKey 값을 가져옴 */
    attributes: ["id", "db_pubKey", "db_title", "db_wtype"],

    /* 조건과 값이 일치하는 경우 */
    where: {
      id: req.body.params.articleId
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

        Apply.create({
          db_apubKey: req.body.params.apubKey,
          db_articleId: req.body.params.articleId,
          db_opubKey: DB.db_pubKey,
          db_title: DB.db_title,
          db_wtype: DB.db_wtype,
          db_name: req.body.params.name,
          db_accept: req.body.params.accept
        })
          /* 조회 성공시 */
          .then(result => {
            console.log("result : " + result);
            /* result 값을 json 형태로 리턴 */
            res.status(201).json({ result: 1 });
          })
          /* 조회 실패시 */
          .catch(err => {
            console.error("err : " + err);
          });
      } else {
        res.json({ result: 0 });
      }
    })
    /* 조회 실패시 */
    .catch(err => {
      console.error("err : " + err);
      next(err);
    });
});

module.exports = router;
