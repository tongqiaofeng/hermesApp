<template>
  <view class="zwz-comment">
    <view class="comment-num">
      <view class="font">共 {{ comments.length }} 条评论</view>
      <view class="add-btn">
        <view class="img">
          <image
            v-if="headPic"
            :src="url + '/file/' + headPic"
            mode="aspectFill"
            class="mine-img"
          ></image>
        </view>
        <input @click="commentInput" placeholder="发表评论" type="text" />
      </view>
    </view>
    <!--  style="height: 840rpx;" -->
    <scroll-view scroll-y="true" @scrolltolower="lower" class="commentbox">
      <view
        class="comment-item-main"
        v-for="(item, index) in comments"
        :key="item.id"
        :id="index"
      >
        <view class="comment-item">
          <view class="left">
            <image :src="item.avatar" class="img"></image>
          </view>
          <view class="content">
            <view class="title-name">{{ item.nickname }}</view>
            <view class="content-text">
              <text>{{ item.content }}</text>
            </view>
            <view class="content-btm">
              <text class="btm-time">{{ item.addTime }}</text>
              <view class="btm-right">
                <view
                  class="btm-back"
                  @click="replyComment(item.nickname, item.id, 2, index, item)"
                >
                  <image src="../../static/imgs/comment/huifu.png"></image>
                </view>
                <view class="img-like" @click="commentLike(item)">
                  <image
                    src="../../static/imgs/comment/dz1.png"
                    v-if="item.isLike == 0 || item.isLike == null"
                  >
                  </image>
                  <image src="../../static/imgs/comment/dz.png" v-else></image>
                  <text class="comment-like-num">{{
                    item.likeNums == 0 || item.likeNums == null
                      ? ""
                      : item.likeNums
                  }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-if="showReplyList.indexOf(item.id) !== -1" class="childclass">
          <view
            class="childcomment-item items"
            v-for="reply in item.children"
            :key="reply.id"
          >
            <view class="childcomment-item">
              <view class="left">
                <image :src="reply.avatar" class="img"></image>
              </view>
              <view class="content">
                <view class="title-name">{{ reply.nickname }}</view>
                <view class="content-text">
                  <text>{{ reply.content }}</text>
                </view>
                <view class="content-btm">
                  <text class="btm-time">{{ reply.addTime }}</text>
                  <view class="btm-right">
                    <view
                      class="btm-back"
                      @click="
                        replyComment(reply.nickname, reply.id, 2, index, reply)
                      "
                    >
                      <image src="../../static/imgs/comment/huifu.png"></image>
                    </view>
                    <view class="img-like" @click="commentLike(reply)">
                      <image
                        src="../../static/imgs/comment/dz1.png"
                        v-if="reply.isLike == 0 || reply.isLike == null"
                      >
                      </image>
                      <image
                        src="../../static/imgs/comment/dz.png"
                        v-else
                      ></image>
                      <text class="comment-like-num">{{
                        reply.likeNums == 0 || reply.likeNums == null
                          ? ""
                          : reply.likeNums
                      }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view
          class="spread"
          v-if="item.children.length > 0"
          @click="isShowReply(item.id, index)"
        >
          <view style="padding-bottom: 36rpx">
            {{
              showReplyList.indexOf(item.id) !== -1
                ? "收起"
                : "展开" + item.children.length + "条回复"
            }}
          </view>
        </view>
      </view>
      <view class="Nomore">没有更多了</view>
    </scroll-view>
    <!--  -->
    <view class="comment-btm" v-if="submit == true">
      <input
        type="text"
        :placeholder="placeholderComment"
        :focus="iptFocus"
        :value="commentText"
        @input="input"
        @blur="blur"
      />
      <button @click="sendCourseComment(superCommentId, superUsername, layer)">
        发送
      </button>
    </view>
  </view>
</template>

<script>
export default {
  name: "zwz-comment",
  props: {
    comments: {
      type: Array,
      default: () => {
        return [];
      },
    },
    commentText: "",
  },
  data() {
    return {
      url: this.$baseFileUrl,
      headPic: uni.getStorageSync("headPic"),
      showReplyList: [],
      placeholderComment: "发条评论吧 ~",
      iptFocus: false,
      layer: 1,
      superCommentId: null,
      superUsername: null,
      CommentIndex: 0,
      focus: false, // 输入框自动聚焦
      submit: false, // 弹出评论
    };
  },
  created() {},
  methods: {
    // 展开、收起
    isShowReply(id, index) {
      if (this.showReplyList.indexOf(id) == -1) {
        this.showReplyList.push(id);
        this.$emit("reply-click", this.book);
      } else {
        let index = this.showReplyList.indexOf(id);
        this.showReplyList.splice(index, 1);
      }
    },
    // 点赞
    commentLike(item) {
      this.$emit("comment-like", item);
    },
    commentInput() {
      this.submit = true;
      console.log(this.submit);
      this.iptFocus = true;
      this.placeholderComment = "发条评论吧 ~";
      // setTimeout(() => {
      // 	this.focus = true;
      // }, 50)
    },
    // 回复评论
    replyComment(userNickName, id, tier, index, reply) {
      console.log("index", index);
      this.submit = true;
      // this.focus = true;
      this.iptFocus = true;
      this.placeholderComment = "回复@" + userNickName;
      this.superCommentId = id;
      this.superUsername = userNickName;
      this.layer = tier;
      this.CommentIndex = index;
      this.$emit("reply", index, id, userNickName, tier, reply);
    },
    // 发送评论
    sendCourseComment() {
      // this.submit = false;
      // this.iptFocus = false;
      // this.placeholderComment='发条评论吧 ~';
      console.log(this.layer, this.superCommentId);
      this.$emit("send-comment", this.layer, this.superCommentId);
    },
    input(event) {
      console.log("event", event);
      this.$emit("input", event.target.value);
    },
    blur() {
      this.submit = false;
      this.iptFocus = false;
      // this.focus = false;
    },
    lower() {
      console.log("222222");
      this.$emit("lower");
    },
  },
};
</script>

<style lang="scss" scoped>
.zwz-comment {
  width: 100vw;
  overflow: scroll;

  .comment-num {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30rpx;

    .font {
      font-size: 26rpx;
      color: #4f4f4f;
    }

    .add-btn {
      display: flex;
      margin-top: 30rpx;

      .img {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        overflow: hidden;
        background-color: #f6f6f6;

        image {
          width: 64rpx;
          height: 64rpx;
        }
      }

      input {
        height: 64rpx;
        width: 596rpx;
        border-radius: 30rpx;
        background-color: #f6f6f6;
        margin-left: 20rpx;
        padding-left: 20rpx;
        font-size: 26rpx;
      }
    }
  }

  .Nomore {
    font-size: 20rpx;
    text-align: center;
    color: #919191;
  }

  .comment-btm {
    width: 100%;
    height: 130rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fcfcfc;

    input {
      height: 64rpx;
      width: 570rpx;
      border-radius: 20rpx;
      background-color: #f6f6f6;
      margin-left: 20rpx;
      padding-left: 20rpx;
      font-size: 26rpx;
      margin: 20rpx 0 20rpx 20rpx;
    }

    button {
      height: 64rpx;
      width: 100rpx;
      font-size: 24rpx;
      border: 1px solid #f6f6f6;
      padding: 0;
      margin: 20rpx 20rpx 20rpx 0;
    }
  }
}

.commentbox {
  padding: 10px 30rpx;
  width: 690rpx;

  .comment-item-main {
    margin-bottom: 40rpx;

    .comment-item {
      display: flex;
      width: 690rpx;

      .left {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        overflow: hidden;

        .img {
          width: 64rpx;
          height: 64rpx;
        }
      }

      .content {
        flex: 1;
        margin: 0 20rpx;
        width: 636rpx;

        .title-name {
          color: #919191;
          font-size: 26rpx;
          text-overflow: ellipsis;
          width: 270rpx;
          overflow: hidden;
          white-space: nowrap;

          view {
            max-width: 150rpx;
            display: inline-block;
            margin-right: 20rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .content-text {
          font-size: 28rpx;
          margin: 16rpx 0 20rpx;
        }

        .content-btm {
          font-size: 22rpx;
          display: flex;
          justify-content: space-between;

          .btm-time {
            font-size: 22rpx;
          }

          .btm-right {
            display: flex;
            align-items: center;

            .btm-back {
              width: 60rpx;
              height: 36rpx;
              align-items: center;
              display: flex;

              image {
                display: block;
                width: 24rpx;
                height: 24rpx;
              }
            }

            .img-like {
              display: flex;
              align-items: center;

              image {
                display: block;
                width: 24rpx;
                height: 24rpx;
                margin: 0 10rpx 0 20rpx;
              }

              .comment-like-num {
                // display: inline-block;
                // width: 50rpx;
                text-align: center;
                font-size: 20rpx;
              }
            }
          }
        }
      }
    }

    .childclass {
      width: 690rpx;

      .items {
        margin-left: 84rpx;
        margin-top: 36rpx;
      }

      .childcomment-item {
        display: flex;
        width: 606rpx;

        .left {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          overflow: hidden;

          .img {
            width: 40rpx;
            height: 40rpx;
          }
        }

        .content {
          flex: 1;
          margin: 0 20rpx;
          width: 586rpx;

          .title-name {
            color: #919191;
            font-size: 26rpx;
            text-overflow: ellipsis;
            width: 270rpx;
            overflow: hidden;
            white-space: nowrap;

            view {
              max-width: 150rpx;
              display: inline-block;
              margin-right: 20rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .content-text {
            font-size: 28rpx;
            margin: 16rpx 0 20rpx;
          }

          .content-btm {
            font-size: 22rpx;
            display: flex;
            justify-content: space-between;

            .btm-time {
              font-size: 22rpx;
            }

            .btm-right {
              display: flex;
              align-items: center;

              .btm-back {
                width: 60rpx;
                height: 36rpx;
                align-items: center;
                display: flex;

                image {
                  display: block;
                  width: 24rpx;
                  height: 24rpx;
                }
              }

              .img-like {
                display: flex;
                align-items: center;

                image {
                  display: block;
                  width: 24rpx;
                  height: 24rpx;
                  margin: 0 10rpx 0 20rpx;
                }

                .comment-like-num {
                  text-align: center;
                  font-size: 20rpx;
                }
              }
            }
          }
        }
      }
    }

    .spread {
      color: #2f8deb;
      position: relative;
      font-size: 28rpx;
      margin: 30rpx 0 30rpx 84rpx;
      border-bottom: 1px solid #f0f0f0;

      .down {
        width: 0;
        height: 0;
        position: absolute;
        margin-left: 5px;
        top: 7px;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-top: 8px solid #bbbbbb;
      }

      .up {
        width: 0;
        height: 0;
        position: absolute;
        margin-left: 5px;
        bottom: 4px;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-bottom: 8px solid #bbbbbb;
        border-top: 8px solid transparent;
      }
    }
  }
}
</style>
