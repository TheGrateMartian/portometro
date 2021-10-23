const express = require('express');
const router = express.Router();
const {distanceSensor} = require('../services/distanceSensor');

router.get('/', function(req, res, next) {
    res.json({
        "r": distanceSensor.get()
    })
});

module.exports = router;
