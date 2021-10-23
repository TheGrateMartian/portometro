const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json({
        "r":"r"
    })
});

module.exports = router;
