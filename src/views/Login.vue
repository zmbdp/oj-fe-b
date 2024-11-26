<template>
  <div class="login-page">
    <div class="orange"></div>
    <div class="blue"></div>
    <div class="blue small"></div>
    <div class="login-box">
      <div class="logo-box">
        <div class="right">
          <div class="sys-name">LaatCode-后台管理</div>
          <div class="sys-sub-name">先刷一千题</div>
        </div>
      </div>
      <div class="form-box">
        <div class="form-item">
          <img src="../assets/images/shouji.png" />
          <el-input v-model="userAccount" placeholder="请输入账号" />
        </div>
        <div class="form-item">
          <img src="../assets/images/yanzhengma.png" />
          <el-input v-model="password" type="password" show-password placeholder="请输入密码" />
        </div>
        <div class="submit-box" @click="loginFun">
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 在这里可以编写需要的 JavaScript 代码
import { ref } from 'vue'
import { loginService } from '../apis/suser'
import { setToken } from '../utils/cookie'
import router from '../router';

const userAccount = ref('')
const password = ref('')

async function loginFun() {
  try {
    const loginResult = await loginService(userAccount.value, password.value)
    console.log("loginResult: ", loginResult)
    router.push("/oj/system")
    setToken(loginResult.data)
  } catch (error) {
    console.log("error: ", error)
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  .login-box {
    overflow: hidden;
    width: 456px;
    height: 404px;
    background: #ffffff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    opacity: 0.9;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    padding: 50px 72px 0;

    .logo-box {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      img {
        width: 68px;
        height: 68px;
        margin-right: 16px;
      }

      .sys-name {
        height: 33px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 24px;
        color: #222222;
        line-height: 33px;
        margin-bottom: 13px;
      }

      .sys-sub-name {
        height: 22px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #222222;
        line-height: 22px;
      }
    }

    :deep(.form-box) {
      .submit-box {
        margin-top: 90px;
        width: 456px;
        height: 48px;
        background: #32c5ff;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 1px;
      }

      .form-item {
        display: flex;
        align-items: center;
        width: 456px;
        height: 48px;
        background: #f8f8f8;
        border-radius: 8px;
        margin-bottom: 30px;
        position: relative;

        .code-btn-box {
          position: absolute;
          right: 0;
          width: 151px;
          height: 48px;
          background: #32c5ff;
          border-radius: 8px;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          span {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
        }

        .error-tip {
          position: absolute;
          width: 140px;
          text-align: right;
          padding-right: 12px;
          height: 20px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #fd4c40;
          line-height: 20px;
          right: 0;

          &.bottom {
            right: 157px;
          }
        }

        .el-input {
          width: 380px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 16px;
          color: #222222;
        }

        .el-input__wrapper {
          border: none;
          box-shadow: none;
          background: transparent;
          width: 230px;
          padding-left: 0;
        }

        img {
          width: 24px;
          height: 24px;
          margin: 0 18px;
        }
      }
    }
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(255, 255, 255, 0.8);
    z-index: 1;
    content: "";
  }

  .orange {
    background: #f0714a;
    width: 498px;
    height: 498px;
    border-radius: 50%;
    opacity: 0.67;
    filter: blur(50px);
    left: 14.2%;
    top: 41%;
    position: absolute;
  }

  .blue {
    width: 334px;
    height: 334px;
    background: #32c5ff;
    opacity: 0.67;
    filter: blur(50px);
    position: absolute;
    top: 16.3%;
    left: 80.7%;

    &.small {
      width: 186px;
      height: 186px;
      top: 8.2%;
      left: 58.2%;
    }
  }
}
</style>