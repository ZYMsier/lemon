var mongodb = require('mongodb-curd');
var dbBase = 'lemon';
var dbClassifyColl = "classify"; //分类
var dbUserColl = "user"; //用户
var dbBillColl = "billlist"; //账单

var billlist = function(req, res, next) {
        var parmas = req.body,
            iname = parmas.iname, //icon名称
            cname = parmas.cname, //分类名称
            type = parmas.type, //类型
            money = parmas.money, //金额
            time = parmas.time, //时间
            user = parmas.user, //用户id
            cid = parmas.cid; //分类id
        if (!iname || !cname || !type || !money || !time || !cid || !user) {
            res.send({ code: 2, message: "缺少参数" });
        } else {
            getHasUser();
        };

        function getHasUser() {
            mongodb.find(dbBase, dbUserColl, { _id: user }, function(result) {
                if (result.length > 0) {
                    getHasClassify();
                } else {
                    res.send({ code: 0, message: "该用户不存在" })
                }
            });
        };

        function getHasClassify() {
            mongodb.find(dbBase, dbClassifyColl, { _id: cid }, function(result) {
                if (result.length > 0) {
                    add();
                } else {
                    res.send({ code: 0, message: "该分类不存在" })
                }
            });
        }

        function add() {
            parmas.time = new Date(time); //时间
            mongodb.insert(dbBase, dbBillColl, parmas, function(result) {
                if (result) {
                    res.send({ code: 0, message: "添加账单成功" })
                } else {
                    res.send({ code: 3, message: "添加失败" })
                }
            });
        }
    }
    //根据时间筛选
var getBill = function(req, res, next) {
    var parmas = req.query,
        user = parmas.user,
        time = parmas.time,
        iname = parmas.name.split(",");
    if (!user || !time || !iname) {
        res.send({ code: 2, message: "缺少参数" });
    } else {
        if (time.indexOf('-') != -1) { //按月
            var timeArr = time.split('-'); //变为数组
            if (timeArr[1] == '12') { //2018-12  
                maxTime = (timeArr[0] * 1 + 1) + "-01";
            } else {
                maxTime = timeArr[0] + '-' + (timeArr[1] * 1 + 1);
            }
        } else { //按年
            maxTime = time * 1 + 1;
        }
    }
    mongodb.find(dbBase, dbBillColl, { time: { $lt: new Date('2019'), $gte: new Date(time) }, user: user, iname: { $in: iname } }, function(result) {
        if (result.length > 0) {
            res.send({ code: 0, message: result })
        } else {
            res.send({ code: 1, message: "查询失败" })
        }
    });
}
module.exports = {
    billlist: billlist,
    getBill: getBill
};