var express = require("express");
var router = express.Router();
var routerLogin = require("./login");
var routerRegister = require("./register");
var path = require("path");

router.get("/", function (req, res) {
  if (req.cookies.email &&
    req.cookies.email !== "x") {
    // 已登录
    // TODO: 更安全的访问控制，现在的其实没啥用
    var indexPagePath = path.join(__dirname, "../public/index.html");
    res.sendFile(indexPagePath);
  } else {
    // 重定向到登录
    res.redirect("/login");
  }
});

// 嵌套路由
router.use("/login", routerLogin);
router.use("/register", routerRegister);

// 权限控制，禁止直接访问静态页面
router.get("/*.html", function (req, res) {
  res.redirect(301, "/login");
});

// 除静态资源外，匹配404页面
router.get(/^((?!assets|scripts|css).)+$/, function (req, res) {
  var notFoundPagePath = path.join(__dirname, "../public/404.html");
  res.sendFile(notFoundPagePath);
});

module.exports = router;
