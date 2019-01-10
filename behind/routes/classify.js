var express = require('express');
var router = express.Router();
var classify = require('./classifyApi/index.js');
//查看所有的icon
router.get('/classify/iconlist', classify.iconlist);
//添加分类的接口
router.post('/classify/addclassify', classify.addclassify);
//查询分类的接口
router.get('/classify/getClassify', classify.getClassify);
module.exports = router;