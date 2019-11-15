var express = require('express');
var router = express.Router();
var cors = require('cors');
var Contract = require('../models').Contract;
router.use(cors());

router.post('/', function (req, res, next) {
    Contract.findAll({
        attributes: ['id', 'articleId', 'owner_key', 'worker_key', 'is_sign'],
        order: [['id', 'DESC']],
        where: {
            worker_key: req.body.params.pubKey,
        },
    }).then(contract => {
        console.log(JSON.stringify(contract));

        res.send({ contracts: contract });
    });
});

module.exports = router;