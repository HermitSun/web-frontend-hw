var express = require("express");
var router = express.Router();
var path = require("path");

var modelUsers = require("../models/users");
var StatusCode = require("../enums/status").StatusCodes;
var ErrorMessages = require("../enums/status").ErrorMessages;

// 查看页面
router.get("/", function (req, res) {
  var loginPagePath = path.join(__dirname, "../public/login.html");
  res.sendFile(loginPagePath);
});

// 登录接口
router.post("/", function (req, res) {
  var status = StatusCode.OK;
  var msg = ErrorMessages[status];

  modelUsers.findByEmailAndPassword(
    req.body.email,
    req.body.password,
    function (success, results) {
      if (success) {
        console.log(!results[0]);
        if (!results[0]) {
          status = StatusCode.NOT_FOUND;
        }
      } else {
        status = StatusCode.INTERNAL_SERVER_ERROR;
      }
      msg = ErrorMessages[status];
      // 在回调里返回
      res.json({
        status: status,
        msg: msg
      });
    }
  );
});

module.exports = router;
