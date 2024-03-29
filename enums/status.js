/**
 * 前后端通信的状态码
 * @author WenSun
 * @date 2019.12.11
 */

var StatusCodes = {
  /**
   * 请求成功
   */
  OK: 200,
  /**
   * 参数错误
   */
  BAD_REQUEST: 400,
  /**
   * 未授权
   */
  UNAUTHORIZED: 401,
  /**
   * 禁止访问
   */
  FORBIDDEN: 403,
  /**
   * 请求的URL不存在
   */
  NOT_FOUND: 404,
  /**
   * 服务端错误
   */
  INTERNAL_SERVER_ERROR: 500,
  /**
   * 用户已存在
   */
  USER_HAS_EXIST: 50001,
  /**
   * 网关错误
   */
  BAD_GATEWAY: 502,
  /**
   * 服务不可用
   */
  SERVICE_UNAVAILABLE: 503,
  /**
   * 网关超时
   */
  GATEWAY_TIMEOUT: 504
};

/**
 * 状态码对应的错误提示
 */
var ErrorMessages = {
  200: "请求成功",
  400: "参数错误",
  401: "需要先登录",
  404: "请求内容不存在",
  500: "服务端错误",
  50001: "用户已存在",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
};

module.exports = {
  StatusCodes,
  ErrorMessages
};
