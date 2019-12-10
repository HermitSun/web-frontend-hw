var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
  var indexPagePath = path.join(__dirname, "../public/index.html");
  res.sendFile(indexPagePath);
});

module.exports = router;
