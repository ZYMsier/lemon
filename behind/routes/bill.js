var express = require('express');
var router = express.Router();
var bill = require('./billApi/index.js');
//添加账单
router.post('/bill/billlist', bill.billlist);
router.get('/bill/getBill', bill.getBill);

module.exports = router;