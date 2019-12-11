/**
 * 对users表操作的封装
 * @author WenSun
 * @date 2019.12.11
 */

var users = require("../config/mysql").users;

/**
 * 根据ID查询用户
 * @param id 用户ID
 * @param callback 回调函数，第一个参数表示查询是否成功，第二个参数返回查询结果
 */
function findByID(id, callback) {
  var sql = "SELECT * FROM users WHERE id = ?";

  users.query(sql, [id], function (err, results) {
    if (err) {
      console.log(err);
      callback(false);
      return;
    }
    callback(true, results);
  });
}

/**
 * 根据邮箱和密码查询用户
 * @param email 用户邮箱
 * @param password 用户密码
 * @param callback 回调函数，第一个参数表示查询是否成功，第二个参数返回查询结果
 */
function findByEmailAndPassword(email, password, callback) {
  var sql = "SELECT * FROM users WHERE email = ? and password = ?";

  users.query(sql, [email, password], function (err, results) {
    if (err) {
      console.log(err);
      callback(false);
      return;
    }
    callback(true, results);
  });
}

/**
 * 查询所有用户
 * @param callback 回调函数，第一个参数表示查询是否成功，第二个参数返回查询结果
 */
function getAllUsers(callback) {
  var sql = "SELECT * FROM users";
  users.query(sql, function (err, results) {
    if (err) {
      console.log(err);
      callback(false);
      return;
    }
    callback(true, results);
  });
}

/**
 * 新增用户
 * @param email 用户邮箱
 * @param password 用户密码
 * @param callback 回调函数，第一个参数表示查询是否成功
 */
function addUser(email, password, callback) {
  var sql = "INSERT INTO users(email, password) VALUES (?, ?)";
  users.query(sql, [email, password], function (err) {
    if (err) {
      console.log(err);
      callback(false);
      return;
    }
    callback(true);
  });
}

/**
 * 删除用户
 * @param id 用户ID
 * @param callback 回调函数，第一个参数表示查询是否成功
 */
function removeUserById(id, callback) {
  var sql = "DELETE FROM users WHERE id = ?";
  users.query(sql, [id], function (err) {
    if (err) {
      console.log(err);
      callback(false);
      return;
    }
    callback(true);
  });
}

/**
 * 执行自定义SQL语句
 * @param sql SQL语句
 * @param callback 回调函数，第一个参数表示查询是否成功，第二个参数返回查询结果
 */
function executeSQL(sql, callback) {
  users.query(sql, function (err, results) {
    if (err) {
      console.log(err);
      callback(false);
      return;
    }
    callback(true, results);
  });
}

module.exports = {
  findByID,
  findByEmailAndPassword,
  getAllUsers,
  addUser,
  removeUserById,
  executeSQL
};
