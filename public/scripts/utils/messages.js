/**
 * 用于显示（和隐藏）消息提示的工具函数
 * @author WenSun
 * @date 2019.12.11
 */

// 显示消息提示，3s后消失
function showMsg(msgDOM, msgContentDOM, msgContent, type) {
  var msgType = "el-message--" + type;
  msgContentDOM.innerText = msgContent;
  msgDOM.classList.remove("hidden");
  msgDOM.classList.add("el-message", msgType);
  // 利用事件队列保证同步
  setTimeout(function () {
    msgDOM.classList.add("el-message-fade-leave", "el-message-fade-leave-active");
  }, 3000);
  setTimeout(function () {
    msgDOM.classList.remove("el-message", msgType, "el-message-fade-leave", "el-message-fade-leave-active");
    msgContentDOM.innerText = "";
  }, 3000);
  setTimeout(function () {
    msgDOM.classList.add("hidden");
  }, 3000);
}
