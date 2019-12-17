var express = require("express");
var router = express.Router();
var routerLogin = require("./login");
var routerRegister = require("./register");

var path = require("path");
var fs = require("fs");
var zlib = require("zlib");

router.get("/", function (req, res) {
  // TODO: 更安全的访问控制，现在的其实没啥用
  if (req.cookies.email &&
    req.cookies.email !== "x") {
    // 已登录
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
// 个人认为应该属于永久重定向
router.get("/*.html", function (req, res) {
  res.redirect(301, "/login");
});

// 匹配静态资源，比如图片、字体、CSS、JS
// TODO: 可能需要更详尽的列表，这里只是挑了几个目前需要的
router.get(/^.*\.(jpg|jpeg|png|mp4|js|css|woff|ttf)$/, function (req, res) {
  var file = path.join(__dirname, "../public" + req.url);
  console.log(file);
  fs.stat(file, (err) => {
    if (err) {
      res.send(404);
    } else {
      // 询问浏览器支持的压缩方式
      var acceptEncoding = req.headers["accept-encoding"];
      if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader("Content-Encoding", "gzip");
        var gzip = zlib.createGzip();
        fs.createReadStream(file).pipe(gzip).pipe(res);
      } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader("Content-Encoding", "deflate");
        var deflate = zlib.createDeflate();
        fs.createReadStream(file).pipe(deflate).pipe(res);
      } else {
        fs.createReadStream(file).pipe(res);
      }
    }
  });
});

// 除静态资源外，匹配404页面
router.get(/^((?!assets|scripts|css).)+$/, function (req, res) {
  var notFoundPagePath = path.join(__dirname, "../public/404.html");
  // 有一说一，找不到确实应该返回404状态码
  res.status(404)
    .sendFile(notFoundPagePath);
});

module.exports = router;
