<template>
  <view class="update-my-msg-container">
    <view class="update-main">
      <view class="update-list">
        <view class="update-font"> 头像 </view>
        <view
          style="
            display: flex;
            justify-content: flex-end;
            flex: 1;
            align-items: center;
          "
          @click="uploadClick"
        >
          <image
            v-if="headPic"
            :src="furl + '/file/' + headPic"
            mode="aspectFill"
            style="width: 30px; height: 30px; border-radius: 50%"
          ></image>
          <image
            src="../static/imgs/right.png"
            mode="aspectFill"
            style="width: 15px; height: 15px; margin-left: 15px"
          ></image>
        </view>
      </view>
      <view class="update-list">
        <view class="update-font"> 昵称 </view>
        <view style="display: flex; align-items: center">
          <input type="text" v-model="nick" class="update-input" />
          <image
            src="../static/imgs/right.png"
            mode="aspectFill"
            style="width: 15px; height: 15px; margin-left: 15px"
          ></image>
        </view>
      </view>
      <view class="update-list">
        <view class="update-font"> 修改手机号/邮箱 </view>
        <view style="display: flex; align-items: center" @click="updatePhone">
          <input type="text" v-model="phoneNumber" class="update-input" />
          <image
            src="../static/imgs/right.png"
            mode="aspectFill"
            style="width: 15px; height: 15px; margin-left: 15px"
          ></image>
        </view>
      </view>
    </view>
    <view class="update-button">
      <image
        src="../static/imgs/common/update.png"
        mode="aspectFill"
        @click="updateMsgSure"
      ></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      furl: this.$baseFileUrl,
      headPic: uni.getStorageSync("headPic"),
      nick: uni.getStorageSync("nick"),
      phoneNumber: uni.getStorageSync("phoneNumber"),
    };
  },
  onShow() {
    // console.log("uuu",uni.getStorageSync("headPic"))
    if (
      uni.getStorageSync("newPhone") !== "" &&
      uni.getStorageSync("newPhone") !== null
    ) {
      this.phoneNumber = uni.getStorageSync("newPhone");
    }
  },
  onReady() {
    this.hidePageNavInWechatBrowser();
  },
  methods: {
    // 更改头像
    uploadClick() {
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], //指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: (res) => {
          console.log("成功", res);
          const tempFilePaths = res.tempFilePaths;
          console.log("成功", tempFilePaths[0]);
					
          uni.uploadFile({
            url: this.$baseFileUrl + "/upload", //post请求的地址
            fileType: "image",
            filePath: tempFilePaths[0],
            name: "upload-images",
            success: (res) => {
              console.log(res);
              this.headPic = res.data.split("|")[0];
              console.log("头像", this.headPic);
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
    // 修改手机号
    updatePhone() {
      uni.navigateTo({
        url: "./updatePhone",
      });
    },
    // 确定修改信息
    updateMsgSure() {
      uni.showLoading({
        title: "信息修改中...",
      });
      uni.request({
        method: "POST",
        url: this.$baseUrl + "/wechat/api/userMsgSave",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        data: {
          id: uni.getStorageSync("userId"),
          headPic: this.headPic,
          nick: this.nick,
          username: this.phoneNumber,
        },
        complete: (res) => {
          uni.hideLoading();
          console.log("修改");
          console.log(res);

          if (this.checkBack(res, true) == false) return;

          this.setUserInfo(res);
          this.$isResolve();

          uni.switchTab({
            url: "../comm/mine",
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.update-my-msg-container {
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;

  .update-main {
    .update-list {
      height: 86rpx;
      padding: 0 40rpx;
      margin-top: 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;

      .update-font {
        font-size: 28rpx;
        color: #000;
        font-weight: bold;
      }

      .update-input {
        color: #c3c3c3;
        font-size: 28rpx;
        text-align: right;
      }
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
