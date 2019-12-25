/**
 * 原生XHR封装类似jQuery的ajax
 * 感谢原作者南歌子
 * @date 2019.12.11
 */

/**
 样例（GET请求需要自行拼接URL）
 ajax({
    type: "POST",
    url: "/login",
    async: true,
    dataType: "json",
    data: {},
    beforeSend: function () {},
    success: function () {},
    error: function () {}
  });
 */

function ajax() {
  var ajaxData = {
    type: (arguments[0].type || "GET").toUpperCase(),
    url: arguments[0].url || "",
    async: arguments[0].async || "true",
    data: arguments[0].data || null,
    dataType: arguments[0].dataType || "json",
    contentType: arguments[0].contentType || "application/x-www-form-urlencoded; charset=utf-8",
    beforeSend: arguments[0].beforeSend || function () {
    },
    success: arguments[0].success || function () {
    },
    error: arguments[0].error || function () {
    }
  };

  ajaxData.beforeSend();
  var xhr = createxmlHttpRequest();
  xhr.responseType = ajaxData.dataType;

  xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
  xhr.setRequestHeader("Content-Type", ajaxData.contentType);
  xhr.send(convertData(ajaxData.data));

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        ajaxData.success(xhr.response);
      } else {
        ajaxData.error();
      }
    }
  };
}

function createxmlHttpRequest() {
  if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
}

function convertData(data) {
  if (typeof data === "object") {
    var convertResult = "";
    for (var c in data) {
      convertResult += c + "=" + data[c] + "&";
    }
    convertResult = convertResult.substring(0, convertResult.length - 1);
    return convertResult;
  } else {
    return data;
  }
}

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

/**
 * 首页页面逻辑
 * 为了兼容，还是选择使用var进行变量声明
 * 并不是很优雅，不过无所谓了
 * @author WenSun
 * @date 2019.12.16
 */

(function (window) {
  var globalThis = window.document;
  // 图片总数
  var IMAGE_COUNT = 6;
  // 图片项
  var imageItemsList = [];
  // 图片是否已加载
  var imageHasLoaded = [];
  // 是否已全部加载（可以进一步优化循环性能）
  var loadedCount = 0;
  for (var i = 1; i <= IMAGE_COUNT; ++i) {
    // 利用IIFE解决循环 + 回调的问题
    (function (i) {
      var imageItem = globalThis.querySelector("#image-list-item-" + i);
      imageItemsList.push(imageItem);
      imageHasLoaded.push(false);
    })(i);
  }
  // 错误消息
  var indexErrorMsg = globalThis.querySelector("#index-error-message");
  var indexErrorMsgContent = indexErrorMsg.querySelector("p");
  // 页面加载后开始请求图片
  loadImages();

  // 滚动事件，经过防抖处理
  // 每次滚动检查是否需要加载图片
  window.addEventListener("scroll", debounce(function () {
    loadImages();
  }, 100));

  // 函数防抖
  function debounce(fn, interval, callback, immediate) {
    if (immediate === void 0) {
      immediate = true;
    }
    var timer = -1;
    return function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      // 如果计时器存在，先清除
      if (timer !== -1) {
        clearTimeout(timer);
      }
      if (immediate) {
        // 如果现在不存在定时器，调用函数；否则刷新计时器
        if (timer === -1) {
          fn.apply(void 0, args);
        }
        timer = setTimeout(function () {
          timer = -1;
          // 计时结束后执行可能存在的操作
          if (callback) {
            callback();
          }
        }, interval);
      } else {
        timer = setTimeout(function () {
          fn.apply(void 0, args);
          // 计时结束后执行可能存在的操作
          if (callback) {
            callback();
          }
        }, interval);
      }
    };
  }

  // 获取当前距离页面顶部的Y坐标
  function getCurrentY() {
    return (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) +
      (document.documentElement.clientHeight || document.body.clientHeight);
  }

  // 获取当前元素页面顶部的Y坐标
  function getElementY(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }

  // 加载图片
  function loadImages() {
    for (i = 0; i < imageItemsList.length; ++i) {
      (function (i) {
        // 未全部加载时判断
        if (loadedCount !== IMAGE_COUNT) {
          // 如果图片未加载
          if (!imageHasLoaded[i]) {
            var Y = getElementY(imageItemsList[i]);
            var isVisible = getCurrentY() >= Y;
            // 并且图片出现在可视区域，加载
            if (isVisible) {
              var loadAnimation = imageItemsList[i].querySelector(".el-image__error");
              var imgDOM = imageItemsList[i].querySelector("img");
              var imgPath = imgDOM.getAttribute("data-src");
              // 加载图片
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
                  // 标记为加载完成
                  imageHasLoaded[i] = true;
                  ++loadedCount;
                },
                error: function () {
                  showMsg(
                    indexErrorMsg,
                    indexErrorMsgContent,
                    "图片加载失败",
                    "error"
                  );
                }
              });
            }
          }
        }
      })(i);
    }
  }

})(window);
