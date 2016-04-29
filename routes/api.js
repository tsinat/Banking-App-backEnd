'use strict';

var express = require('express');
var router = express.Router();

router.use('/balances', require('./balances'));

module.exports = router;
