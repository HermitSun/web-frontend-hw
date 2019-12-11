/**
 * 注册页面逻辑
 * 为了兼容，还是选择使用var进行变量声明
 * @author WenSun
 * @date 2019.12.10
 */

(function (window) {
  var globalThis = window.document;
  // 登录表单中邮箱输入部分
  var registerFormItemAccount = globalThis.querySelector("#form-register-item-account");
  var registerFormItemAccountInput = globalThis.querySelector("#account-input");
  // 登录表单中密码输入部分
  var registerFormItemPassword = globalThis.querySelector("#form-register-item-password");
  var registerFormItemPasswordInput = globalThis.querySelector("#password-input");
  // 登录表单中确认密码部分
  var registerFormItemConfirmPassword = globalThis.querySelector("#form-register-item-confirm-password");
  var registerFormItemConfirmPasswordInput = globalThis.querySelector("#confirm-password-input");
  // 表单只有一个提交按钮，所以直接用子元素选择器
  var registerFormButtonSubmit = globalThis.querySelector("#form-register button[type=\"submit\"]");
  // 表单验证
  var accountErrorMsg = globalThis.querySelector(".email-error");
  var passwordErrorMsg = globalThis.querySelector(".password-error");
  var confirmPasswordErrorMsg = globalThis.querySelectorAll(".confirm-password-error");
  var is_legal_email = false;
  var is_legal_password = false;
  var is_legal_confirm_password = false;

  // 每次输入框失焦都会进行验证
  // 邮箱格式错误时提示
  registerFormItemAccountInput.addEventListener("blur", function () {
    validate_email();
  });
  // 密码格式错误时提示
  registerFormItemPasswordInput.addEventListener("blur", function () {
    validate_password();
    confirm_password();
  });
  // 确认密码错误时提示
  registerFormItemConfirmPasswordInput.addEventListener("blur", function () {
    confirm_password();
  });

  // 提交按钮，再次进行验证
  registerFormButtonSubmit.addEventListener("click", function (event) {
    // 阻止默认点击事件
    event.preventDefault();
    validate_email();
    validate_password();
    confirm_password();
    if (is_legal_email && is_legal_password && is_legal_confirm_password) {
      // 注册
      ajax({
        type: "POST",
        url: "/register",
        async: true,
        dataType: "json",
        data: {
          email: registerFormItemAccountInput.value,
          password: registerFormItemPasswordInput.value
        },
        success: function (res) {
          console.log(res);
          if (res.status === 200) {
            window.location.href = "/login";
          } else {
            alert(res.msg);
          }
        },
        error: function (err) {
          // TODO: 网络错误？
        }
      });
    }
  });

  // 验证邮箱
  function validate_email() {
    is_legal_email = is_email(registerFormItemAccountInput.value);
    if (!is_legal_email) {
      registerFormItemAccount.classList.add("is-error");
      accountErrorMsg.classList.remove("hidden");
    } else {
      registerFormItemAccount.classList.remove("is-error");
      accountErrorMsg.classList.add("hidden");
    }
  }

  // 验证密码
  function validate_password() {
    is_legal_password = is_password(registerFormItemPasswordInput.value);
    if (!is_legal_password) {
      registerFormItemPassword.classList.add("is-error");
      passwordErrorMsg.classList.remove("hidden");
    } else {
      registerFormItemPassword.classList.remove("is-error");
      passwordErrorMsg.classList.add("hidden");
      confirmPasswordErrorMsg.forEach(function (msg) {
        msg.classList.add("hidden");
      });
    }
  }

  // 确认密码
  function confirm_password() {
    is_legal_confirm_password = registerFormItemPasswordInput.value === registerFormItemConfirmPasswordInput.value;
    if (!is_legal_confirm_password) {
      registerFormItemPassword.classList.add("is-error");
      registerFormItemConfirmPassword.classList.add("is-error");
      passwordErrorMsg.classList.add("hidden");
      confirmPasswordErrorMsg.forEach(function (msg) {
        msg.classList.remove("hidden");
      });
    } else {
      registerFormItemPassword.classList.remove("is-error");
      registerFormItemConfirmPassword.classList.remove("is-error");
      confirmPasswordErrorMsg.forEach(function (msg) {
        msg.classList.add("hidden");
      });
    }
  }

})(window);
