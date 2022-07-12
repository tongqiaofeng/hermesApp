<template>
  <view class="update-phone-container">
    <view class="update-phone">
      <view class="phone-left">
        <text class="update-font">手机号/邮箱：</text>
        <input
          type="text"
          class="update-input"
          v-model="newPhone"
          placeholder="请输入要绑定的新手机号/邮箱"
        />
      </view>
    </view>
    <view class="update-phone">
      <view class="phone-left">
        <text class="update-font">验证码：</text>
        <input
          type="text"
          class="update-input"
          v-model="newCode"
          placeholder="请输入验证码"
        />
      </view>
      <button
        type="text"
        :plain="true"
        size="mini"
        style="border: none"
        @click="getCode"
        class="phone-right"
        :disabled="disable"
        :class="{ codeGeting: isGeting }"
      >
        {{ time }}
      </button>
    </view>
    <view class="update-button">
      <image
        src="../static/imgs/common/save.png"
        mode="aspectFill"
        @click="updatePhoneNumber"
      ></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      newPhone: "",
      newCode: "",
      time: "获取验证码",
      count: 59,
      isGeting: false,
      disable: false,
      countDown: null,
    };
  },
  onReady() {
    this.hidePageNavInWechatBrowser();
  },
  methods: {
    // 修改手机号
    updatePhoneNumber() {
      if (this.newPhone == "") {
        uni.showToast({
          title: "请输入新手机号",
          icon: "none",
        });
      } else if (this.newCode == "") {
        uni.showToast({
          title: "请输入验证码",
          icon: "none",
        });
      } else {
        uni.setStorageSync("newPhone", this.newPhone);
        uni.navigateTo({
          url: "./updateMyMsg",
        });
      }
    },
    // 获取验证码
    getCode() {
      if (this.newPhone == "") {
        uni.showToast({
          title: "请输入手机号/邮箱",
          icon: "none",
        });
      } else {
        uni.showLoading({
          title: "验证码获取中...",
        });
        uni.request({
          method: "GET",
          url: this.$baseUrl + "/wechat/api/smsCodeGet",
          header: {
            "content-type": "application/json",
          },
          data: {
            phoneNumber: this.newPhone,
          },
          complete: (res) => {
            uni.hideLoading();
            if (res.statusCode == 200) {
              this.countDown = setInterval(() => {
                if (this.count < 1) {
                  this.isGeting = false;
                  this.disable = false;
                  this.time = "获取验证码";
                  this.count = 59;
                  console.log(this.time);
                  clearInterval(this.countDown);
                  this.countDown = null;
                } else {
                  this.isGeting = true;
                  this.disable = true;
                  this.time = this.count-- + "s后可重发";
                }
              }, 1000);
            }
            if (this.checkBack(res, true) == false) return;

            this.$isResolve();
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.update-phone-container {
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;

  .update-phone {
    height: 86rpx;
    padding: 0 40rpx;
    margin-top: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    .phone-left {
      display: flex;
      align-items: center;
      flex: 1;

      .update-font {
        font-size: 28rpx;
        color: #000;
        font-weight: bold;
      }

      .update-input {
        flex: 1;
        color: #c3c3c3;
        font-size: 28rpx;
      }
    }

    .phone-right {
      color: #000;
      font-size: 28rpx;
    }

    .codeGeting {
      color: #c3c3c3;
    }
  }

  .update-button {
    width: 90%;
    height: 125rpx;
    margin: 0 auto;
    margin-top: 50rpx;

    image {
      width: 100%;
      height: 125rpx;
    }
  }
}
</style>
