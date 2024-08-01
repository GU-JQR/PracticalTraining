<template>
  <div id="body">

    <!--返回按钮-->
    <van-nav-bar
        title="订单确认"
        left-arrow
        @click-left="onClickLeft"
    />
    <!--    <div id="backtitle">-->
    <!--      <van-icon name="arrow-left" @click="back" id="backicon"/>-->
    <!--    </div>-->

    <!--餐品详情-->
    <div id="order-detail-payed-title" style="text-align: left">
      <p><strong>订单详情</strong></p>
      <van-divider/>
    </div>
    <div id="order-detail-payed" v-for="(dish, index) in orderDetailList">
      <van-card
          :num="`${dish.number}`"
          :price="`${dish.price}`"
          :desc="`${dish.description}`"
          :title="`${dish.dish}`"
          :thumb="`${dish.dishPhoto}`"
          style="background-color: #ffffff; text-align: left"
      />
      <!--      <van-divider dashed></van-divider>-->
    </div>


    <!--会员优惠-->
    <div>
      <!--      <van-divider dashed></van-divider>-->
      <div id="order-detail-payed-member" style="text-align: left" v-if="vipLevel!=0">

        <p><strong>会员优惠</strong></p>
        <van-divider/>
        <!--        <p>您是v{{vipLevel}}尊享会员,可享受{{vipList[vipLevel]}}折优惠</p>-->
        <!--优惠券列表-->

        <!-- 优惠券单元格 -->
        <div>
          <van-coupon-cell
              :coupons="coupons"
              :chosen-coupon="chosenCoupon"
              @click="showList = true"
          />
          <!-- 优惠券列表 -->
          <van-popup
              show-exchange-bar="false"
              v-model="showList"
              round
              position="bottom"
              style="height: 90%; padding-top: 4px;"
          >
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
                @exchange="onExchange"
            />
          </van-popup>
        </div>
      </div>
    </div>

    <!--总价格-->
    <div id="order-detail-payed-total" style="text-align: right">
      <van-divider dashed></van-divider>
      <p v-if="vipLevel!=0">已优惠 <strong style="color: red">￥ {{ vipAmount }}</strong>
        实付 ￥ <strong>{{ finalAmount }}</strong></p>

    </div>
    <van-divider dashed></van-divider>

    <!--footer-->
    <van-submit-bar :price="finalAmount*100" button-text="提交订单" @submit="onSubmit"/>

    <!--支付表单-->
    <div id="payform"></div>

  </div>
</template>

<script>
import {CouponCell, CouponList, Popup, SubmitBar} from 'vant';

const coupon1 = {
  available: 1,
  condition: '无使用门槛',
  reason: '', //不能使用的理由
  description: '您是v1尊享会员,可享受9.5折优惠',
  value: 0, // 优惠金额,单位分
  name: '会员专享折扣',
  startAt: 1672538963, // 2023-01-01
  endAt: 1893456000,//2023-12-31
  valueDesc: '9.8',
  unitDesc: '折',
};

const coupon2 = {
  available: 1,
  condition: '无使用门槛',
  reason: '', //不能使用的理由
  description: '您是v2尊享会员,可享受8.8折优惠',
  value: 0, // 优惠金额,单位分
  name: '会员专享折扣',
  startAt: 1672538963, // 2023-01-01
  endAt: 1893456000,//2023-12-31
  valueDesc: '8.8',
  unitDesc: '折',
};

export default {
  name: "Pay",
  components: {
    CouponCell,
    CouponList,
    Popup,
    SubmitBar
  },
  data() {
    return {

      //优惠券列表
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      //disabledCoupons: [coupon],
      vipAmount: 0,

      //会员等级
      vipLevel: 1,
      //会员优惠列表
      vipList: [0, 9, 8, 7, 6, 5],

      //订单总价
      totalAmount: 0.0,
      finalAmount: 0.0,
      orderList: [],//最后提交用的 订单数据  //[{dishID  , number, dishAmount}]
      //订单菜品列表
      orderDetailList: [
        // {
        //   dishName: "汉堡",
        //   description: "好吃的汉堡",
        //   number: 3,
        //   price: 15.0,
        //   dishAmount: 39.0,
        //   dishPhoto: "https://i.postimg.cc/NFpkQDCW/image.png"
        // },
        // {
        //   dishName: "汉堡",
        //   description: "好吃的汉堡",
        //   number: 1,
        //   price: 15.0,
        //   dishAmount: 15.0,
        //   dishPhoto: "https://i.postimg.cc/NFpkQDCW/image.png"
        // },
        // {
        //   dishName: "汉堡",
        //   description: "好吃的汉堡",
        //   number: 2,
        //   price: 15.0,
        //   dishAmount: 39.0,
        //   dishPhoto: "https://i.postimg.cc/NFpkQDCW/image.png"
        // },
        // {
        //   dishName: "汉堡",
        //   description: "好吃的汉堡",
        //   number: 3,
        //   price: 15.0,
        //   dishAmount: 39.0,
        //   dishPhoto: "https://i.postimg.cc/NFpkQDCW/image.png"
        // },
        // {
        //   dishName: "汉堡",
        //   description: "好吃的汉堡",
        //   number: 3,
        //   price: 15.0,
        //   dishAmount: 39.0,
        //   dishPhoto: "https://i.postimg.cc/NFpkQDCW/image.png"
        // }

      ],
      customerID: 0

    }
  },
  methods: {
    //加载订单信息
    loadOrderDetail() {
      console.log(sessionStorage.getItem('cart'))
      this.orderDetailList = JSON.parse(sessionStorage.getItem("cart"));//取数组的时候，也先再解析成json
      this.totalAmount = sessionStorage.getItem("totalprice");
      this.finalAmount = this.totalAmount; //默认没选优惠券，等选完之后，再更改最终金额

      // 将orderList部分属性进行存储，方便最后传递给前端
      // 遍历原先数组，以id的值作为数组的key，将部分数据存储
      for (let i = 0; i < this.orderDetailList.length; i++) {
        this.orderList.push({
          dishID: this.orderDetailList[i].dishID,
          number: this.orderDetailList[i].number,
          dishAmount: this.orderDetailList[i].price * this.orderDetailList[i].number
        })
        //[{dishID  , number, dishAmount}]
      }

    },

    //加载会员等级
    loadVipLevel() {
      //先从sessionStorage中获取用户id
      this.customerID = sessionStorage.getItem("customerID")
      //this.customerID = 2;
      console.log(this.customerID)
      //根据id 查询会员等级，发优惠券
      this.$api({
        url: '/customer/' + this.customerID,
        method: 'get',
        // params:{
        //   customerID:customerID
        // }
      }).then(res => {
        console.log(res)
        this.vipLevel = res.data.rank; //vip等级
        if (this.vipLevel === 1) {
          coupon1.value = this.totalAmount * 5 //设置优惠券金额
          //this.vipAmount = this.totalAmount*0.95
          this.coupons.push(coupon1)
        } else if (this.vipLevel === 2) {
          coupon2.value = this.totalAmount * 12 //设置优惠券金额
          //this.vipAmount = this.totalAmount*0.88
          this.coupons.push(coupon2)
        }


      })


    },

    //优惠券列表
    onChange(index) {
      console.log(index)
      this.showList = false;
      this.chosenCoupon = index;
      if (index === -1) {
        this.vipAmount = 0;
      } else {
        if (this.vipLevel === 1) {
          this.vipAmount = coupon1.value / 100

        } else if (this.vipLevel === 2) {
          this.vipAmount = coupon2.value / 100

        }
      }
      this.finalAmount = (this.totalAmount - this.vipAmount).toFixed(2)


    },
    //兑换优惠券回调，不使用
    onExchange(code) {
      this.coupons.push(coupon);
    },

    //返回按钮
    onClickLeft() {
      this.$router.go(-1);
    },


    //提交订单
    onSubmit() {

      this.$toast('提交成功');
      //this.$router.push({path: '/user/order'});
      //console.log(parseFloat(this.finalAmount.toFixed(2)))
      console.log(this.orderList)
      console.log(this.customerID)
      // 存订单对象
      this.$api({
        url: '/orderinfo/submit',
        method: 'post', //这个是method,用methods会默认post
        data: {
          customerID: parseInt(sessionStorage.getItem("customerID")), //session里取出来的是string,所以要转为int
          status: 0,
          orderDetailList: this.orderList,//[{dishID  , number, dishAmount}]
          totalAmount: this.finalAmount,
        }
      }).then(res => {
        console.log(res)
        console.log(res.data.uuid)
        sessionStorage.setItem('uuid', res.data.uuid)
        sessionStorage.setItem('orderID', res.data.orderID)

        //支付过程先隐去了
        //支付功能，这里是电脑接口，手机端不是很好看
        // this.$api({
        //   url: '/alipay/pay',
        //   method: 'get', //这个是method,用methods会默认post
        //   params: {
        //     subject: "order",
        //     traceNo: 1233121,
        //     totalAmount: this.finalAmount
        //   }
        // }).then(res => {
        //   //  this.htmls = res;
        //   //console.log(0000)
        //   console.log(11)
        //   console.log(res)
        //   console.log(res.data)
        //   document.querySelector("#payform").innerHTML = res.data;
        //
        //   const div = document.createElement('div') // 创建div
        //   div.innerHTML = res // 将返回的form 放入div
        //   document.body.appendChild(div)
        //   document.forms[0].submit()
        //   console.log(1111)
        //   // console.log(res)
        // }).catch(function (error) {
        //   console.log(2222)
        //   console.log(error)
        // })

        // 调转到订单页面//支付过程开的时候，这个跳转先注释掉
        this.$router.push( {path:'/user/order'})

      })
      //     .then({
      //
      //   //this.$router.push(path: '/user/order')
      // })


      // /alipay/pay?subject=order&traceNo=222321&totalAmount=100
      // this.orderDetailList = sessionStorage.getItem("cart");
    }

  },
  mounted() {
    // loadOrderDetail();
    this.loadOrderDetail();
    this.loadVipLevel();

  }
}
</script>

<style scoped>

/*.van-card__content{*/
/*  */
/*}*/

/*body*/
#body {
  background-color: #f5f5f5;
}

/*会员优惠*/
#order-detail-payed-member {
  width: 95%;
  position: static;
  margin-left: 10px;
  margin-right: 10px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 15px;
  background: #ffffff;
  border-radius: 10px;
}


#order-detail-payed-title {
  width: 95%;
  position: static;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 15px;
  background: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /*border-radius: 10px;*/
}

#order-detail-payed {
  width: 95%;
  position: static;
  margin-top: -20px;
  margin-left: 10px;
  margin-right: 10px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 15px;
  background: #ffffff;
  border-radius: 10px;
}

/*实付金额*/
#order-detail-payed-total {
  width: 95%;
  position: static;
  margin-top: -20px;
  margin-left: 10px;
  margin-right: 10px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 10px;
  background: #ffffff;
  border-radius: 10px;
}

/*//实付金额*/
#order-detail-payed-total {
  width: 95%;
  position: static;
  margin-top: -20px;
  margin-left: 10px;
  margin-right: 10px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 10px;
  background: #ffffff;
  border-radius: 10px;
}


</style>