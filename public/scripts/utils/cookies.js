/**
 * 用于cookies的工具函数
 * @author WenSun
 * @date 2019.12.11
 */

/**
 * 添加cookie
 * @param name
 * @param value
 * @param expiresHours 过期时间
 */
function addCookie(name, value, expiresHours) {
  var cookieString = name + "=" + escape(value);
  //判断是否设置过期时间
  if (expiresHours > 0) {
    var date = new Date();
    date.setTime(date.getTime() + expiresHours * 3600 * 1000);
    console.log(date.toGMTString());
    cookieString = cookieString + "; expires=" + date.toGMTString();
  }
  console.log(cookieString);
  document.cookie = cookieString;
}

/**
 * 获取cookie
 * @param name
 * @return {string} cookie内容
 */
function getCookie(name) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (arr[0] === name) return arr[1];
  }
  return "";
}

/**
 * 移除cookie
 * @param name
 */
function deleteCookie(name) {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = name + "=x; expires=" + date.toGMTString();
}
