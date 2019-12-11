var mysql = require("mysql");
var config = require("./dbs");

var users = mysql.createPool(config.users);

module.exports = {
  users
};
