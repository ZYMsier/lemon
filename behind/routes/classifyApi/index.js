var mongodb = require('mongodb-curd');
var dbBase = 'lemon';
var dbColl = "iconlist";
var dbClassifyColl = "classify";
var iconlist = function(req, res, next) {
    mongodb.find(dbBase, dbColl, {}, function(result) {
        if (result.length > 0) {
            res.send({ code: 0, message: "查询成功", data: result })
        } else {
            res.send({ code: 1, message: "查询失败" })
        }
    });
}
var addclassify = function(req, res, next) {
    var parmas = req.body;
    iname = parmas.iname,
        cname = parmas.cname,
        type = parmas.type,
        user = parmas.user;
    if (!iname || !cname || !type || !user) {
        res.send({ code: 2, message: "缺少参数" });
    } else {
        getIsClassify();
    };

    function getIsClassify() {
        mongodb.find(dbBase, dbClassifyColl, { iname: iname, type: type, user: { $in: ["*", user] } }, function(result) {
            if (result.length > 0) {
                res.send({ code: 1, message: "该分类已存在" })
            } else {
                add();
            }
        });
    };

    function add() {
        mongodb.insert(dbBase, dbClassifyColl, { iname: iname, type: type, user: user, cname: cname }, function(result) {
            if (result) {
                res.send({ code: 0, message: "添加分类成功" })
            } else {
                res.send({ code: 3, message: "添加失败" })
            }
        });
    }
}
module.exports = {
    iconlist: iconlist,
    addclassify: addclassify
};