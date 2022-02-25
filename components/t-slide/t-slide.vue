<template>
	<view>
	 <view class="t-slide-box" v-for="(item,index) in items" :key="index" > 
	 	<view class="t-slide-area" :style="{height:height+'rpx'}">
	 	　<view class="t-slide-view" >
	 	　　<view class="t-touch-item" :class=" item.isTouchMove?'touch-move-active':''" @touchstart="touchstart($event,item)" @touchmove="touchmove" :data-index="index">
	 		      <view class="t-slide-content" :style="{transform:item.isTouchMove?'translateX(0)':`translateX(${btnWidth*(btnArr.length)}rpx)`,
				                                marginLeft:`-${btnWidth*(btnArr.length)}rpx`}" @click="itemClick(item)">
				    <slot v-bind:item="item"> </slot>
	 		      </view>
				   <view  class="t-slide-btn" v-for="(btn,num) in btnArr" :key="num" @touchstart="btnClick(btn.events,item)" 
				    :style="{width:btnWidth+'rpx',transform:item.isTouchMove?'translateX(0)':`translateX(${btnWidth*(btnArr.length)}rpx)`,
					         backgroundColor:btn.background,}">
					    <text class="t-slide-btn-text" :style="{color:btn.color}">{{btn.name}}</text>
				  </view>
	 	    </view>
	 	　</view>
	 	</view> 
	 </view>
	</view>
</template>

<script>
	export default {
		props:{
			//单行高度
			height:{
				type : Number,
				default:120
			},
			//按钮宽度
			btnWidth: {
				type : Number,
				default:200
			},
			//按钮数组
			btnArr: {
				type : Array,
				default:function () {
				return [
					{
						name:'编辑',
						background:'#00aaff',
						color:'#fff',
						events:'edit'
					},
					{
						name:'删除',
						background:'#ff5500',
						color:'#fff',
						events:'del'
					}
				]
			  }
			},
		},
		data() {
			return {
				items:[],
				startX: 0, //开始坐标
				startY: 0,//开始Y坐标
				flag:false, 
			}
		},
		
		methods: {
			//点击单行
			itemClick(item){
				setTimeout(()=>{
					if(this.flag){this.$emit('itemClick',item)}
				},100)
			},
			//点击按钮
			btnClick(name,item,event){
				this.$emit(name,item)
			},
			//赋值
			assignment(data){
				data.forEach(val=>{this.$set(val,'isTouchMove',false)})
				this.items=data
			},
			touchstart: function (e,item) {
				this.flag=true
				//如果点击的行为滑开行   不执行点击事件
				if(item.isTouchMove){this.flag=false}
			    //开始触摸时 重置所有删除
				this.items.forEach((v, i)=>{
					//只操作为true的
					if (v.isTouchMove){v.isTouchMove = false}
			    })
				/*  #ifdef APP-PLUS||H5||MP  */
				this.startX=e.changedTouches[0].clientX
				this.startY=e.changedTouches[0].clientY,
				/*  #endif  */
				/*  #ifdef APP-NVUE */
				this.startX=e.changedTouches[0].screenX
				this.startY=e.changedTouches[0].screenY,
				/*  #endif  */
				this.items=this.items
			   
			  },
			  //滑动事件处理
			  touchmove: function (e) {
				  this.flag=false
				  let that=this
			      let index = e.currentTarget.dataset.index //当前索引
			      let startX = this.startX //开始X坐标
			      let startY = this.startY //开始Y坐标
				  /*  #ifdef APP-PLUS||H5||MP  */
				  var touchMoveX = e.changedTouches[0].clientX//滑动变化坐标
				  var touchMoveY = e.changedTouches[0].clientY//滑动变化坐标
				  /*  #endif  */
				  /*  #ifdef APP-NVUE */
				  var touchMoveX = e.changedTouches[0].screenX//滑动变化坐标
				  var touchMoveY = e.changedTouches[0].screenY//滑动变化坐标
				  /*  #endif  */
			      //获取滑动角度
			      let angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
			      this.items.forEach(function (v, i) {
			        v.isTouchMove = false
			        //滑动超过60度角 return
			        if (Math.abs(angle) > 60) return;
			        if (i == index) {
			          if (touchMoveX > startX) //右滑
						that.$set(that.items[i],'isTouchMove',false)
			          else //左滑
						that.$set(that.items[i],'isTouchMove',true)
			        }
			      })
			    },
				 angle: function (start, end) {
				    var X = end.X - start.X,
				        Y = end.Y - start.Y
				    //返回角度 /Math.atan()返回数字的反正切值
				    return 360 * Math.atan(Y / X) / (2 * Math.PI);
				 },
		}
	}
</script>

<style lang="scss" scoped>
.t-slide-box{
	border-bottom-width:1rpx;
	border-bottom-style:solid;
	border-bottom-color:#ececec;
}
.t-slide-area{
	flex:1;
}
.t-slide-view{
	flex:1;
	height: 120rpx;
}
.t-touch-item {
	font-size:24rpx;
	/*  #ifdef APP-PLUS||H5||MP  */
	display: flex;
	/*  #endif  */
	flex:1;
	flex-direction:row;
	justify-content: space-between;
	height: 120rpx;
	overflow: hidden;
}
.t-slide-content {
	flex:1;
	line-height:44rpx;
	transition-property: transform;
	transition-duration:0.3s;
} 
.t-slide-btn { 
	font-weight: bold;
	/*  #ifdef APP-PLUS||H5||MP  */
	display: flex;
	/*  #endif  */
	flex-direction:row;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: #fff;
	transition-property: transform;
	transition-duration:0.3s;
}
.t-slide-btn-text{
	font-size: 24rpx;
	color: #000;
} 
</style>
