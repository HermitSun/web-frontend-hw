/**
 * 用于表单验证的工具函数
 * @author WenSun
 * @date 2019.12.10
 */

/**
 * 判断输入是否是合法的邮箱
 * @param input 输入的字符串
 * @return boolean true是false否
 */
function is_email(input) {
  var email_regex = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
  return email_regex.test(input);
}

/**
 * 判断输入是否是符合要求的密码（长度在6-16位之间）
 * @param input 输入的字符串
 * @return boolean true是false否
 */
function is_password(input) {
  return 6 <= input.length && input.length <= 16;
}
