var express = require("express");
var router = express.Router();
var Apply = require("../models").Apply;
var cors = require("cors");
router.use(cors());

router.post("/", function(req, res) {
  Apply.findAll({
    /* id, db_apubKey, db_opubKey, db_accept, db_articleId 값을 가져옴 */
    attributes: ["id", "db_apubKey", "db_opubKey", "db_accept", "db_articleId"],

    /* 조건과 값이 일치하는 경우 */
    where: {
      db_opubKey: req.body.params.pubKey
    }
  })
    /* 조회 성공시 */
    .then(apply => {
      res.send({ apply: apply });
    });
});

module.exports = router;
