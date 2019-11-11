var express = require("express");
var router = express.Router();
var Article = require("../models").Article;
var cors = require("cors");
router.use(cors());

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log('asdasdasd : ', req.query.id);

  Article.findAll({
    where: {
      id: req.query.id,
    }
  }).then(result => {
    res.send({ article: result });
  });
});

module.exports = router;
