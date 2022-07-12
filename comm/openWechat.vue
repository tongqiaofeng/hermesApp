<template>
  <view class="content"></view>
</template>

<script>
export default {
  onShow() {
    this.getConfig();
  },
  methods: {
    // H5打开微信小程序
    getConfig() {
      uni.request({
        url: this.$baseUrl + "/wechat/api/ticketGet",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        complete: (res) => {
          console.log("微信小程序URL");
          console.log(res);
          location.href = res.data.openLink;
        },
      });
    },
  },
};
</script>

<style></style>
