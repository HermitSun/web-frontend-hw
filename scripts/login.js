/**
 * 登录页面逻辑
 * 为了兼容，还是选择使用var进行变量声明
 * @author WenSun
 * @date 2019.12.10
 */

(function (window) {
  var globalThis = window.document;
  // 登录表单中邮箱输入部分
  var loginFormItemAccount = globalThis.querySelector("#form-login-item-account");
  var loginFormItemAccountInput = globalThis.querySelector("#account-input");
  // 登录表单中密码输入部分
  var loginFormItemPassword = globalThis.querySelector("#form-login-item-password");
  var loginFormItemPasswordInput = globalThis.querySelector("#password-input");
  // 登录表单中的提交按钮
  // 表单只有一个提交按钮，所以直接用子元素选择器
  var loginFormButtonSubmit = globalThis.querySelector("#form-login button[type=\"submit\"]");
  // 表单验证
  var accountErrorMsg = globalThis.querySelector(".email-error");
  var accountOrPasswordErrorMsg = globalThis.querySelectorAll(".email-or-password-error");
  var passwordErrorMsg = globalThis.querySelector(".password-error");
  var is_legal_email = false;
  var is_legal_password = false;

  // 每次输入框失焦都会进行验证
  // 邮箱格式错误时提示
  loginFormItemAccountInput.addEventListener("blur", function () {
    validate_email();
  });
  // 密码格式错误时提示
  loginFormItemPasswordInput.addEventListener("blur", function () {
    validate_password();
  });

  // 提交按钮，再次进行验证
  loginFormButtonSubmit.addEventListener("click", function (event) {
    // 阻止默认点击事件
    event.preventDefault();
    validate_email();
    validate_password();
    if (is_legal_email && is_legal_password) {
      // TODO: 暂时写死，回头连数据库
      if (loginFormItemAccountInput.value === "test@test.com" &&
        loginFormItemPasswordInput.value === "123456") {
        window.location.href = "index.html";
      } else {
        // 邮箱或密码错误
        accountOrPasswordErrorMsg.forEach(function (msg) {
          loginFormItemAccount.classList.add("is-error");
          loginFormItemPassword.classList.add("is-error");
          msg.classList.remove("hidden");
        });
      }
    }
  });

  // 验证邮箱
  function validate_email() {
    is_legal_email = is_email(loginFormItemAccountInput.value);
    if (!is_legal_email) {
      loginFormItemAccount.classList.add("is-error");
      accountErrorMsg.classList.remove("hidden");
    } else {
      loginFormItemAccount.classList.remove("is-error");
      accountErrorMsg.classList.add("hidden");
      accountOrPasswordErrorMsg.forEach(function (msg) {
        msg.classList.add("hidden");
      });
    }
  }

  // 验证密码
  function validate_password() {
    is_legal_password = is_password(loginFormItemPasswordInput.value);
    if (!is_legal_password) {
      loginFormItemPassword.classList.add("is-error");
      passwordErrorMsg.classList.remove("hidden");
    } else {
      loginFormItemPassword.classList.remove("is-error");
      passwordErrorMsg.classList.add("hidden");
      accountOrPasswordErrorMsg.forEach(function (msg) {
        msg.classList.add("hidden");
      });
    }
  }

})(window);
