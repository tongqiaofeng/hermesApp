<template>
  <view class="content">
    <!-- 珠宝原材料 -->
    <popwndSelect
      :visible.sync="bShowStock"
      strTitle="请选择地点"
      :lst="stocks"
      strName="name"
      :sel="stockIdx"
      @confirm="stockChange"
    >
    </popwndSelect>
    <popwndSelect
      :visible.sync="bShowMaterial"
      strTitle="请选择裸石类型"
      :lst="materialModelList"
      strName="name"
      :sel="materialIdx"
      @confirm="materialChange"
    >
    </popwndSelect>
    <popwndSelect
      :visible.sync="bShowState"
      strTitle="请选择状态"
      :lst="states"
      strName="name"
      :sel="stateIdx"
      @confirm="stateChange"
    ></popwndSelect>
    <view class="inventory-top">
      <view :style="{ height: height + 'px' }"></view>
      <!--  #ifdef  MP-WEIXIN -->
      <view class="mine-title">
        <image
          @click="goBack"
          style="width: 17rpx; height: 30rpx"
          src="../static/imgs/common/back.png"
          mode="aspectFill"
        ></image>
        <input
          class="search-input"
          type="text"
          v-model="keyWord"
          placeholder="搜索"
          placeholder-style="color: #7b7b7b;font-size: 24rpx;"
          @input="inputChange"
        />
      </view>
      <!--  #endif -->
      <!--  #ifndef  MP-WEIXIN -->
      <uni-search-bar
        v-model="keyWord"
        placeholder="搜索"
        @input="inputChange"
        cancelButton="none"
      />
      <!--  #endif -->
      <view class="inputs">
        <view class="item">
          <view class="clrGray" style="flex: 1" @click="bShowStock = true">
            <text v-if="stocks.length !== 0">{{ stocks[stockIdx].name }}</text>
            <image src="../static/imgs/mine/down.png" mode="aspectFill"></image>
          </view>

          <view class="clrGray" style="flex: 1" @click="bShowMaterial = true">
            <text v-if="materialModelList.length !== 0">{{
              materialModelList[materialIdx].name
            }}</text>
            <image src="../static/imgs/mine/down.png" mode="aspectFill"></image>
          </view>

          <view class="clrGray" style="flex: 1" @click="bShowState = true">
            <text>{{ states[stateIdx].name }}</text>
            <image src="../static/imgs/mine/down.png" mode="aspectFill"></image>
          </view>
        </view>

        <view class="line"></view>
        <view class="material-filter">
          <view class="filter-every" @click="filterSel(1)">
            <view class="every-main">
              <text
                class="every-font"
                :style="{ color: sortType == 1 ? '#000' : '#c3c3c3' }"
                >时间</text
              >
              <view class="every-img">
                <image
                  :src="
                    sortType == 1 && isUp == 1
                      ? img1
                      : sortType == 1 && isUp == 2
                      ? img2
                      : img3
                  "
                  mode="aspectFit"
                ></image>
              </view>
            </view>
            <view class="filter-line" v-if="sortType == 1"></view>
          </view>
          <view class="filter-every" @click="filterSel(2)">
            <view class="every-main">
              <text
                class="every-font"
                :style="{ color: sortType == 2 ? '#000' : '#c3c3c3' }"
                >单价</text
              >
              <view class="every-img">
                <image
                  :src="
                    sortType == 2 && isUp == 1
                      ? img1
                      : sortType == 2 && isUp == 2
                      ? img2
                      : img3
                  "
                  mode="aspectFit"
                ></image>
              </view>
            </view>
            <view class="filter-line" v-if="sortType == 2"></view>
          </view>
          <view class="filter-every" @click="filterSel(3)">
            <view class="every-main">
              <text
                class="every-font"
                :style="{ color: sortType == 3 ? '#000' : '#c3c3c3' }"
                >总价</text
              >
              <view class="every-img">
                <image
                  :src="
                    sortType == 3 && isUp == 1
                      ? img1
                      : sortType == 3 && isUp == 2
                      ? img2
                      : img3
                  "
                  mode="aspectFit"
                ></image>
              </view>
            </view>
            <view class="filter-line" v-if="sortType == 3"></view>
          </view>
          <view class="filter-every" @click="filterSel(4)">
            <view class="every-main">
              <text
                class="every-font"
                :style="{ color: sortType == 4 ? '#000' : '#c3c3c3' }"
                >重量</text
              >
              <view class="every-img">
                <image
                  :src="
                    sortType == 4 && isUp == 1
                      ? img1
                      : sortType == 4 && isUp == 2
                      ? img2
                      : img3
                  "
                  mode="aspectFit"
                ></image>
              </view>
            </view>
            <view class="filter-line" v-if="sortType == 4"></view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="haveData == 0" class="no-data" style="padding-top: 600rpx">
      <image src="../static/imgs/common/no.png" mode="aspectFill"></image>
      <text style="font-size: 30rpx">暂无数据~</text>
    </view>
    <view v-else class="inventory-main">
      <view class="inventory-num">
        <view>共查询到{{ total }}件商品 </view>
      </view>
      <view class="plantList">
        <view v-for="(item, index) in list" :key="index" class="plant">
          <view @click="checkDetails(item)">
            <view class="item">
              <view class="row">
                <image
                  class="img"
                  v-if="item.img"
                  :src="imgUrl + item.img.split('|')[0]"
                  mode="aspectFill"
                >
                </image>
                <view>
                  <view class="bh" v-if="materialIdx == 0">{{
                    item.materialName
                  }}</view>
                  <view class="product-number"
                    >编号：{{ item.productNumber }}</view
                  >

                  <view
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <view>
                      <view
                        class="cs"
                        v-if="item.unitPrice"
                        :style="{
                          color: sortType == 2 ? '#000000' : '#999999',
                        }"
                      >
                        单价：{{
                          item.currency + " " + formatNumberRgx(item.unitPrice)
                        }}</view
                      >
                      <view
                        class="cs"
                        v-if="item.unitPrice"
                        :style="{
                          color: sortType == 3 ? '#000000' : '#999999',
                        }"
                      >
                        总价：{{
                          item.chargeUnit == "粒" || item.chargeUnit == "件"
                            ? item.currency +
                              " " +
                              formatNumberRgx(
                                parseInt(item.unitPrice * item.number)
                              )
                            : item.currency +
                              " " +
                              formatNumberRgx(
                                parseInt(item.unitPrice * item.weight)
                              )
                        }}
                      </view>
                      <view class="cs" v-if="item.color"
                        >颜色：{{ item.color }}</view
                      >
                      <view class="cs" v-if="item.quality"
                        >品质：{{ item.quality }}</view
                      >
                      <view class="cs" v-if="item.subsection"
                        >品质细分：{{ item.subsection }}</view
                      >
                      <view class="cs" v-if="item.shape"
                        >形状：{{ item.shape }}</view
                      >
                      <view class="cs" v-if="item.size"
                        >尺寸：{{ item.size }}</view
                      >
                      <view class="cs" v-if="stockIdx == 0"
                        >位置：{{ item.storageName }}</view
                      >
                      <view
                        class="cs"
                        v-if="item.weight > 0"
                        :style="{
                          color: sortType == 4 ? '#000000' : '#999999',
                        }"
                      >
                        重量：{{ item.weight + " " + item.chargeUnit }}</view
                      >
                      <view class="cs" v-if="item.weight == 0">
                        数量：{{ item.number + " " + item.chargeUnit }}</view
                      >
                      <view class="cs" v-else-if="item.number > 1"
                        >数量：{{ item.number + " 粒" }}
                      </view>
                    </view>
                    <view>
                      <view
                        v-if="stateIdx > 0"
                        :style="{
                          color: getSaleStateClr(item),
                          'font-size': '28rpx',
                          'margin-left': '15rpx',
                          'text-align': 'right',
                          flex: 1,
                        }"
                      >
                        {{ getSaleState(item) }}
                      </view>
                      <view class=""></view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import popwndSelect from "@/components/popwnd/popwnd_select_blue.vue";
export default {
  components: {
    popwndSelect,
  },
  data() {
    return {
      imgUrl: this.$baseUrl + "/jewellery/api",
      haveData: 1,
      height: null,
      keyWord: "",
      page: 1,

      sortType: null,
      isUp: null,
      img1: require("../static/imgs/search/up.png"),
      img2: require("../static/imgs/search/down.png"),
      img3: require("../static/imgs/search/normal.png"),

      bShowStock: false,
      stockIdx: 0,
      stocks: [],

      bShowState: false,
      stateIdx: 3,
      states: [
        {
          id: -1,
          name: "全部",
        },
        {
          id: 0,
          name: "存货",
        },
        {
          id: 1,
          name: "运输中",
        },
        {
          id: 5,
          name: "未加工",
        },
        {
          id: 2,
          name: "加工中",
        },
        {
          id: 3,
          name: "加工完成",
        },
        {
          id: 4,
          name: "已出售",
        },
      ],

      bShowMaterial: false,
      materialIdx: 0,
      materialModelList: [],

      list: [],
      total: 0,

      haveMore: 0,
    };
  },
  onLoad() {
    // 获取手机状态栏高度
    uni.getSystemInfo({
      success: (data) => {
        // 将其赋值给this
        this.height = data.statusBarHeight;
      },
    });

    this.stockIdx = 0;
    this.materialIdx = 0;
    this.stateIdx = 3;

    if (this.list.length == 0 && uni.getStorageSync("token").length > 0) {
      console.log("重新获取数据");
      this.getStockList();
      this.getMaterialModelList();
      this.search();
    }
  },
  onPullDownRefresh() {
    uni.showLoading({
      title: "正在刷新",
    });
    console.log("获取数据");
    this.page = 1;
    this.list = [];
    this.haveMore = 0;
    this.search();
    this.getStockList();
    uni.stopPullDownRefresh();
  },
  onReachBottom() {
    if (this.haveMore == 0) {
      this.page++;
      this.search();
    }
  },
  methods: {
    // 排序
    filterSel(e) {
      if (this.isUp == null) this.isUp = 1;
      else if (this.isUp == 1) this.isUp = 2;
      else if (this.isUp == 2) this.isUp = 1;
      if (this.sortType != e) {
        this.isUp = 1;
      }
      this.sortType = e;

      this.page = 1;
      this.list = [];
      this.haveMore = 0;

      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 查询商品
    search() {
      uni.showLoading({
        title: "加载中...",
      });
      this.soldNum = 0;
      this.reserveNum = 0;
      let data = {};
      data = {
        keyword: this.keyWord.trim(),
        sortType: this.sortType,
        sortFlag: this.isUp == 2 ? -1 : this.isUp,
      };

      if (this.stockIdx > 0) data.storageId = this.stocks[this.stockIdx].id;
      if (this.materialIdx > 0)
        data.materialModelId = this.materialModelList[this.materialIdx].id;
      if (this.stateIdx > 0) data.state = this.states[this.stateIdx].id;

      uni.request({
        url:
          this.$baseUrl +
          "/jewellery/api/materialStockSearch?page=" +
          this.page +
          "&pageNum=10",
        method: "POST",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        data: data,
        complete: (res) => {
          uni.hideLoading();
          console.log("珠宝原材料列表");
          console.log(res);
          if (this.checkBack(res) == false) return;

          this.total = res.data.total;

          if (res.data.list.length == 0) {
            this.haveMore = 1;
          } else {
            let data = this.list.concat(res.data.list);
            this.list = data;
          }

          if (this.list.length == 0) {
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
    // 获取库存地列表
    getStockList() {
      uni.request({
        url: this.$baseUrl + "/jewellery/api/storageList",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        complete: (ret) => {
          console.log(ret);
          uni.hideLoading();
          if (this.checkBack(ret, true) == false) return;
          if (ret.data.length > 0) {
            this.stocks = ret.data;
            if (this.stocks[0].name == "全部") this.stocks[0].name = "全部仓库";
          }
        },
      });
    },
    // 获取裸石类型
    getMaterialModelList() {
      uni.request({
        url: this.$baseUrl + "/jewellery/api/materialModelList",
        header: {
          "content-type": "application/json",
          token: uni.getStorageSync("token"),
        },
        complete: (ret) => {
          console.log(ret);
          uni.hideLoading();
          if (this.checkBack(ret, true) == false) return;
          if (ret.data.length > 0) this.materialModelList = ret.data;

          if (ret.data.length > 0) {
            this.materialModelList = ret.data;
            if (this.materialModelList[0].name == "全部")
              this.materialModelList[0].name = "全部裸石";
          }
        },
      });
    },
    // 模糊搜索
    inputChange() {
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.sortType = null;
      this.isUp = null;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 库存地变化
    stockChange(e) {
      this.stockIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.sortType = null;
      this.isUp = null;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 裸石类型
    materialChange(e) {
      this.materialIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.sortType = null;
      this.isUp = null;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 库存状态变化
    stateChange(e) {
      this.stateIdx = e.sel;
      this.page = 1;
      this.list = [];
      this.haveMore = 0;
      this.search();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    // 不同状态颜色
    getSaleStateClr(item) {
      if (item.state == 0) return "#54b7eb";
      else if (item.state == 1) return "#6bcda5";
      else if (item.sold == 2) return "#ff8b62";
      else if (item.sold == 3) return "#ef5b5b";
      else return "#ef5b5b";
    },
    // 商品状态
    getSaleState(item) {
      for (let i = 0; i < this.states.length; ++i) {
        if (item.state == this.states[i].id) return this.states[i].name;
        else if (item.state == 4) return "已售";
      }
      return "";
    },
    // 查看包包详情
    checkDetails(item) {
      uni.navigateTo({
        url: "./materialDetails?id=" + item.id,
      });
    },
    // 返回上一层
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background-color: #f9f9f9;

  .inventory-top {
    padding-bottom: 26rpx;
    position: sticky;
    top: var(--window-top);
    z-index: 99;
    background-color: #fff;

    .top-input,
    .item {
      padding: 0 30rpx;
    }

    .mine-title {
      height: 44px;
      padding: 0 40rpx;
      display: flex;
      align-items: center;

      .search-input {
        width: 400rpx;
        padding: 10rpx 20rpx;
        margin-left: 20rpx;
        background-color: #f6f6f6;
        border-radius: 30px;
        text-align: center;
        font-size: 24rpx;
      }
    }

    .inputs {
      margin-top: 40rpx;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-title {
          font-size: 28rpx;
          color: #565656;
          font-weight: bold;
        }

        .clrGray {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          text {
            font-size: 28rpx;
            color: #c8c8c8;
          }

          image {
            width: 44rpx;
            height: 44rpx;
            margin-left: 30rpx;
          }
        }
      }

      .line {
        width: 100%;
        height: 2rpx;
        margin-top: 26rpx;
        margin-bottom: 26rpx;
        background-color: #f9f9f9;
      }
    }
  }

  .material-filter {
    padding: 0rpx 80rpx 0rpx;
    display: flex;
    justify-content: space-between;

    .filter-every {
      .every-main {
        display: flex;
        align-items: center;
      }

      .every-font {
        font-size: 26rpx;
      }

      .every-img {
        image {
          width: 28rpx;
          height: 28rpx;
        }
      }

      .filter-line {
        width: 26rpx;
        height: 6rpx;
        margin: 0 auto;
        margin-top: 10rpx;
        background-color: #85dbd0;
        border-radius: 60px;
        text-align: center;
      }
    }
  }

  .inventory-main {
    margin-top: 30rpx;

    .inventory-num {
      margin-bottom: 20rpx;
      font-size: 22rpx;
      color: #aaa;
    }

    .plantList {
      .plant {
        margin-bottom: 30rpx;
        padding: 20rpx 20rpx 30rpx;
        border-radius: 30rpx;
        position: relative;
        background-color: #ffffff;
        font-size: 26rpx;

        .item {
          .bh {
            width: 350rpx;
            flex: 1;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 28rpx;
            //font-weight: bold;
            color: #000;
          }

          .row {
            display: flex;
            // justify-content: space-between;
            align-items: center;
            color: #999999;

            .img {
              width: 250rpx;
              height: 250rpx;
              margin-right: 20rpx;
              border-radius: 30rpx;
              flex-shrink: 0;
            }

            .product-number {
              color: #999999;
              overflow: hidden;
              word-break: keep-all;
              white-space: nowrap;
              text-overflow: ellipsis;

              width: 450rpx;
            }

            .cs {
              font-size: 22rpx;
            }
          }
        }

        .line {
          width: 100%;
          height: 2rpx;
          margin: 30rpx 0;
          background-color: #f9f9f9;
        }

        .price {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          font-size: 26rpx;

          .price-every {
            margin-top: 20rpx;
          }
        }
      }
    }
  }
}
</style>
