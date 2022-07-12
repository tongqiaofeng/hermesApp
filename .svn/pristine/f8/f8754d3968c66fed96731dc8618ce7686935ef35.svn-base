<template>
  <view class="">
    <!-- 物流 -->
    <view class="">
      <text>物流单号：</text>
      {{ logisMsg.mailNo }}
    </view>
    <view class="">
      <!-- {{logisMsg.routes}} -->
      <uni-steps
        :options="[{ title: '买家下单', desc: '2018-11-11' }]"
        direction="column"
        :active="logisMsg.routes.length - 1"
        activeColor="#85dbd0"
      ></uni-steps>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      logisMsg: {},
    };
  },
  onLoad(option) {
    this.detailId = option.id;
    this.getLogisticsInfo(option.id);
  },
  methods: {
    // 获取物流详情
    getLogisticsInfo(id) {
      uni.showLoading({
        title: "加载中...",
      });
      uni.request({
        url: this.$baseUrl + "/searchRoutes",
        data: {
          id: id,
        },
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        complete: (res) => {
          uni.hideLoading();
          console.log("物流信息");
          console.log(res);
          this.logisMsg = res.data;
        },
      });
    },
  },
};
</script>

<style></style>
