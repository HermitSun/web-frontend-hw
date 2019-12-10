var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
  var registerPagePath = path.join(__dirname, "../public/register.html");
  res.sendFile(registerPagePath);
});

module.exports = router;
