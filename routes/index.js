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
router.get(/^.*\.(jpg|jpeg|png|js|css|woff|ttf)$/, function (req, res) {
  var file = path.join(__dirname, "../public" + req.url);
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

// 视频分块加载
// 感谢原作者：简书@水一川
router.get(/^.*\.(mp4)$/, function (req, res) {
  var file = path.join(__dirname, "../public" + req.url);
  var stat = fs.statSync(file);
  var fileSize = stat.size;
  var range = req.headers.range;

  if (range) {
    //有range头才使用206状态码
    var parts = range.replace(/bytes=/, "").split("-");
    var start = parseInt(parts[0], 10);
    var end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

    // end 在最后取值为 fileSize - 1
    end = end > (fileSize - 1) ? fileSize - 1 : end;
    var chunkSize = (end - start) + 1;
    file = fs.createReadStream(file, {start, end});
    var head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

// 除静态资源外，匹配404页面
router.get(/^((?!assets|scripts|css).)+$/, function (req, res) {
  var notFoundPagePath = path.join(__dirname, "../public/404.html");
  // 有一说一，找不到确实应该返回404状态码
  res.status(404)
    .sendFile(notFoundPagePath);
});

module.exports = router;
