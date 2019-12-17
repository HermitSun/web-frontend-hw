/**
 * 首页页面逻辑
 * 为了兼容，还是选择使用var进行变量声明
 * @author WenSun
 * @date 2019.12.16
 */

(function (window) {
  var globalThis = window.document;
  // 图片项
  var imageItem1 = globalThis.querySelector("#image-list-item-1");
  var imageItem2 = globalThis.querySelector("#image-list-item-2");
  var imageItem3 = globalThis.querySelector("#image-list-item-3");
  var imageItem4 = globalThis.querySelector("#image-list-item-4");
  var imageItem5 = globalThis.querySelector("#image-list-item-5");
  var imageItem6 = globalThis.querySelector("#image-list-item-6");
  var imageItemsList = [imageItem1, imageItem2, imageItem3, imageItem4, imageItem5, imageItem6];
  // 错误消息
  var indexErrorMsg = globalThis.querySelector("#index-error-message");
  var indexErrorMsgContent = indexErrorMsg.querySelector("p");
  // 页面加载后开始请求图片
  for (var i = 0; i < imageItemsList.length; ++i) {
    var loadAnimation = imageItemsList[i].querySelector(".el-image__error");
    var imgDOM = imageItemsList[i].querySelector("img");
    var imgPath = imgDOM.getAttribute("data-src");
    // 利用IIFE解决循环 + 回调的问题
    (function (loadAnimation, imgDOM, imgPath) {
      ajax({
        type: "GET",
        url: imgPath,
        async: true,
        dataType: "blob",
        success: function (res) {
          // 隐藏加载动画
          loadAnimation.classList.add("not-exist");
          // 从返回值加载图片
          imgDOM.src = window.URL.createObjectURL(res);
          imgDOM.onload = function () {
            window.URL.revokeObjectURL(imgDOM.src);
          };
          imgDOM.classList.remove("not-exist");
        },
        error: function (err) {
          showMsg(
            indexErrorMsg,
            indexErrorMsgContent,
            "图片加载失败",
            "error"
          );
        }
      });
    })(loadAnimation, imgDOM, imgPath);
  }

})(window);
