var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// 解析请求中的body
var bodyJSONParser = require("body-parser").json();
var logger = require("morgan");

// 数据库连接
var dbs = require("./config/mysql");

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyJSONParser);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

// 进程退出时释放数据库连接
process.on("SIGINT", function () {
  dbs.users.end(function (err) {
    console.log("db connections released");
    process.exit(err ? -1 : 0);
  });
});

process.on("SIGTERM", function () {
  dbs.users.end(function (err) {
    console.log("db connections released");
    process.exit(err ? -1 : 0);
  });
});

module.exports = app;
