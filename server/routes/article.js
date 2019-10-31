var express = require("express");
var router = express.Router();
var Article = require("../models").Article;
var cors = require("cors");
router.use(cors());

/* GET users listing. */
router.get("/", function(req, res, next) {
  Article.findAll({}).then(article => {
    res.send({ article: article });
  });
});

module.exports = router;
