<template>
  <view class="register-container">
    <view class="upload-img" @click="uploadClick">
      <view>
        <image :src="avatarImg" mode="aspectFill" class="avatar"></image>
      </view>
      <text class="upload-font">点击上传头像</text>
    </view>
    <view class="register-container-main">
      <uni-forms
        ref="registerForm"
        :modelValue="registerData"
        :rules="registerRules"
      >
        <uni-forms-item name="nick">
          <view class="register-every">
            <text
              class="every-font"
              :style="{ color: plurSelect == 1 ? '#000' : '#c3c3c3' }"
              >昵称</text
            >
            <input
              class="every-input"
              placeholder="请输入昵称"
              placeholder-style="color: #dadada;"
              type="text"
              v-model="registerData.nick"
              @focus="nickFocus"
            />
            <view
              class="every-line"
              :style="{
                backgroundColor: plurSelect == 1 ? '#85dbd0' : '#ebebeb',
              }"
            >
            </view>
          </view>
        </uni-forms-item>
        <uni-forms-item name="phoneNumber">
          <view class="register-every">
            <text
              class="every-font"
              :style="{ color: plurSelect == 2 ? '#000' : '#c3c3c3' }"
              >手机号/邮箱</text
            >
            <input
              class="every-input"
              placeholder="请输入手机号/邮箱"
              placeholder-style="color: #dadada;"
              type="text"
              v-model="registerData.phoneNumber"
              @focus="phoneFocus"
            />
            <view
              class="every-line"
              :style="{
                backgroundColor: plurSelect == 2 ? '#85dbd0' : '#ebebeb',
              }"
            >
            </view>
          </view>
        </uni-forms-item>
        <uni-forms-item name="code">
          <view class="register-every">
            <text
              class="every-font"
              :style="{ color: plurSelect == 3 ? '#000' : '#c3c3c3' }"
              >验证码</text
            >
            <view
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <input
                class="every-input"
                placeholder="请输入验证码"
                placeholder-style="color: #dadada;"
                type="text"
                v-model="registerData.code"
                @focus="codeFocus"
              />
              <button
                type="text"
                :plain="true"
                size="mini"
                style="border: none; padding: 0"
                @click="getCode"
                class="phone-num"
                :disabled="disable"
                :class="{ codeGeting: isGeting }"
              >
                <text style="margin: 0 10px; color: #c3c3c3">|</text>{{ time }}
              </button>
            </view>
            <view
              class="every-line"
              :style="{
                backgroundColor: plurSelect == 3 ? '#85dbd0' : '#ebebeb',
              }"
            >
            </view>
          </view>
        </uni-forms-item>
        <!-- <uni-forms-item name="password">
					<view class="register-every">
						<text class="every-font" :style="{color: plurSelect == 4 ? '#000' : '#c3c3c3'}">密码</text>
						<input class="every-input" placeholder="请输入6-14位密码" placeholder-style="color: #dadada;"
							type="password" v-model="registerData.password" @focus="pswFocus" />
						<view class="every-line" :style="{backgroundColor: plurSelect == 4 ? '#85dbd0' : '#ebebeb'}">
						</view>
					</view>
				</uni-forms-item> -->
      </uni-forms>
    </view>
    <view class="register-button">
      <image
        src="../static/imgs/mine/register/register.png"
        mode="aspectFill"
        @click="userRegister"
      >
      </image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "",
      avatarImg: require("../static/imgs/mine/avatar.png"),
      plurSelect: 0,
      registerData: {
        headPic: "",
        nick: "",
        phoneNumber: "",
        code: "",
        // password: "",
      },
      registerRules: {
        nick: {
          rules: [
            {
              required: true,
              errorMessage: "请输入昵称",
              trigger: "blur",
            },
          ],
        },
        phoneNumber: {
          rules: [
            {
              required: true,
              errorMessage: "请输入手机号/邮箱",
              trigger: "blur",
            },
          ],
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: "请输入验证码",
              trigger: "blur",
            },
          ],
        },
        // password: {
        // 	rules: [{
        // 		required: true,
        // 		errorMessage: "请输入6-14位密码",
        // 	}, ],
        // },
      },
      time: "获取验证码",
      count: 59,
      isGeting: false,
      disable: false,
      countDown: null,
    };
  },
  methods: {
    // 上传头像
    uploadClick() {
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], //指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: (res) => {
          console.log("成功", res);
          const tempFilePaths = res.tempFilePaths;
          this.avatarImg = tempFilePaths[0];
          uni.uploadFile({
            url: this.$baseFileUrl + "/upload", //post请求的地址
            fileType: "image",
            filePath: tempFilePaths[0],
            name: "upload-images",
            success: (res) => {
              console.log(res);
              this.registerData.headPic = res.data.split("|")[0];
              uni.showToast({
                title: "头像上传成功",
                icon: "none",
              });
            },
            fail: (err) => {
              console.log(err);
              uni.showToast({
                title: "头像上传失败",
              });
            },
          });
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    // 注册
    userRegister() {
      this.$refs.registerForm
        .validate()
        .then((res) => {
          console.log("表单数据", res);
          uni.showLoading({
            title: "注册中......",
          });
          uni.request({
            method: "POST",
            url: this.$baseUrl + "/wechat/api/register",
            header: {
              "content-type": "application/json",
            },
            data: this.registerData,
            complete: (res) => {
              console.log("注册啦");
              console.log(res);
              uni.hideLoading();

              if (this.checkBack(res, true) == false) return;

              this.setUserInfo(res);
              this.$isResolve();

              uni.switchTab({
                url: "../comm/mine",
              });
            },
          });
        })
        .catch((err) => {
          console.log("表单错误", err);
        });
    },
    // 获取验证码
    getCode() {
      if (this.registerData.phoneNumber == "") {
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
            phoneNumber: this.registerData.phoneNumber,
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
    // 焦点
    nickFocus() {
      this.plurSelect = 1;
    },
    phoneFocus() {
      this.plurSelect = 2;
    },
    codeFocus() {
      this.plurSelect = 3;
    },
    pswFocus() {
      this.plurSelect = 4;
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  padding: 0 60rpx;

  .upload-img {
    margin-top: 100rpx;
    text-align: center;

    .avatar {
      width: 152rpx;
      height: 152rpx;
      border-radius: 50%;
    }

    .upload-font {
      margin-top: 20rpx;
      font-size: 26rpx;
    }
  }

  .register-container-main {
    margin-top: 96rpx;

    .register-every {
      .every-font {
        font-size: 26rpx;
      }

      .every-input {
        margin-top: 16rpx;
        font-size: 26rpx;
        color: #000;
      }

      .phone-num {
        color: #000;
        font-size: 26rpx;
      }

      .codeGeting {
        color: #c3c3c3;
      }

      .every-line {
        width: 100%;
        height: 2rpx;
        margin: 20rpx 0 0;
      }
    }
  }

  .register-button {
    width: 630rpx;
    margin: 0 auto;
    margin-top: 89rpx;

    image {
      width: 630rpx;
      height: 125rpx;
    }
  }
}
</style>
