var express = require("express");
var router = express.Router();
var path = require("path");
// 加密
var crypto = require("crypto");

var modelUsers = require("../models/users");
var StatusCode = require("../enums/status").StatusCodes;
var ErrorMessages = require("../enums/status").ErrorMessages;

// 查看页面
router.get("/", function (req, res) {
  var registerPagePath = path.join(__dirname, "../public/register.html");
  res.sendFile(registerPagePath);
});

// 注册接口
router.post("/", function (req, res) {
  var status = StatusCode.OK;
  var msg = ErrorMessages[status];
  // 对密码加密
  var password = crypto.createHash("sha256")
    .update(req.body.password, "utf8")
    .digest("hex");

  modelUsers.addUser(
    req.body.email,
    password,
    function (success) {
      if (!success) {
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
