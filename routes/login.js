var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
  var loginPagePath = path.join(__dirname, "../public/login.html");
  res.sendFile(loginPagePath);
});

module.exports = router;
