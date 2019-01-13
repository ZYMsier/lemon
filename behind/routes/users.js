var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'lemon';
var dbColl = "user";
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//添加用户
router.post('/users/addUser', function(req, res, next) {
    var name = req.body.name;
    mongodb.insert(dbBase, dbColl, { name: name }, function(result) {
        if (result) {
            res.send({ code: 0, message: "查询成功", id: result.ops[0]._id })
        } else {
            res.send({ code: 1, message: "查询失败" })
        }
    });
});

module.exports = router;