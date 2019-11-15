var express = require("express");
var router = express.Router();
var Article = require("../models").Article;
var cors = require("cors");
router.use(cors());

/* GET users listing. */
router.get("/", function (req, res, next) {
  Article.findAll({

    attributes: ['id', "db_title", "db_wtype", "db_sdate", "db_edate", "db_stime", 'db_smin', 'db_etime', 'db_emin', 'db_money', 'db_address', 'db_img'],
    order: [["id", "DESC"]]
  }).then(article => {
    res.send({ article: article });
  });
});

module.exports = router;
