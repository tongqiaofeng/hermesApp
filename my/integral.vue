<template>
  <view class="integral-container">
    <!-- 积分明细 -->
    <view
      v-if="memberDetails.length == 0"
      class="no-data"
      style="padding-top: 300rpx"
    >
      <image src="../static/imgs/common/no.png" mode="aspectFill"></image>
      <text style="font-size: 30rpx">暂无积分明细~</text>
    </view>
    <view v-else>
      <view class="container-title">
        <view>{{ totalIntegral }}</view>
      </view>
      <view class="container-main">
        <view
          class="container-every"
          v-for="(item, index) in memberDetails"
          :key="index"
        >
          <view class="every-main">
            <view class="every-top">
              <view class="every-time">{{ item.time }}</view>
              <view class="every-time every-integral">{{
                item.recordPoint
              }}</view>
            </view>
            <view class="every-note">{{ item.description }}</view>
          </view>
          <view class="line"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      haveMore: 0,
      haveData: 1,
      page: 1,
      memberDetails: [],
      totalIntegral: null,
    };
  },
  onShow() {
    this.getMemberDetails();
  },
  onReady() {
    this.hidePageNavInWechatBrowser();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.memberDetails = [];
    this.haveMore = 0;

    this.getMemberDetails();
    uni.stopPullDownRefresh();
  },
  onReachBottom() {
    if (this.haveMore == 0) {
      this.page++;
      this.getMemberDetails();
    }
  },
  methods: {
    // 获取积分明细
    getMemberDetails() {
      uni.showLoading({
        title: "加载中...",
      });
      uni.request({
        url:
          this.$baseUrl +
          "/jewellery/api/memberDetails?page=" +
          this.page +
          "&pageNum=10&status=0",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        complete: (res) => {
          console.log("积分明细");
          console.log(res);
          uni.hideLoading();
          this.totalIntegral = res.data.totalIntegral;
          if (res.data.length == 0) {
            this.haveMore = 1;
          } else {
            let list = this.memberDetails.concat(res.data.list);
            this.memberDetails = list;
          }

          if (this.memberDetails.length == 0) {
            this.haveData = 0;
            uni.showToast({
              icon: "none",
              title: "暂无数据",
            });
          } else {
            this.haveData = 1;
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.integral-container {
  min-height: 100vh;
  padding: 0 20rpx 40rpx;
  background-color: #f9f9f9;

  .container-title {
    padding: 20rpx 0;
    padding-left: 20rpx;
    font-size: 48rpx;
    color: #85dbd0;
  }

  .container-main {
    padding: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;

    .container-every {
      background-color: #fff;

      .every-main {
        flex: 1;

        .every-top {
          margin-bottom: 10rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .every-time {
            margin-right: 20rpx;
            font-size: 28rpx;
          }
        }

        .every-note {
          font-size: 22rpx;
          color: #aaa;
        }
      }
    }

    .line {
      width: 100%;
      height: 2rpx;
      margin: 30rpx 0;
      background-color: #f9f9f9;
    }
  }
}
</style>
