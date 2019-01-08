var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'lemon';
var dbColl = "user";
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/users/addUser', function(req, res, next) {
    var name = req.body.name;
    mongodb.find(dbBase, dbColl, { name: name }, function(result) {
        if (result.length > 0) {
            res.send({ code: 0, message: "查询成功", data: result })
        } else {
            res.send({ code: 1, message: "查询失败" })
        }
    });
});

module.exports = router;