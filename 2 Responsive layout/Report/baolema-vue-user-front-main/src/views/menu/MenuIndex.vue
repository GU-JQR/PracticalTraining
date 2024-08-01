<template>
  <div>
    <!--  引入顶部导航栏  -->
    <Upbar></Upbar>
    <!-- 菜品主页  -->
    <b-container fluid id="menu">
      <b-row>
        <b-col cols="3" style="background-color: #FFFFFF; padding-right: 0">
          <div id="list-nav" style="width: 100%; height: 780px">
            <b-list-group v-b-scrollspy:listgroup-ex>
              <b-list-group-item class="list-nav-item" v-for="(category, index) in categories" :key="index"
                                 :href="`#p${category.categoryID}`">
                <img :src="imageList[index]" alt="" style="width: 40px; ">
                <span style="font-size: 13px;font-weight: 500; text-align: center">{{ category.categoryName }}</span>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col cols="9">
          <div class="menu-content" id="listgroup-ex" style="position:relative; overflow-y:auto; height:800px">
            <div v-for="(category, index) in categories" :key="index" class="menu-section">
              <h6 :id="'p'+category.categoryID" style="margin-top: 5px">{{ category.categoryName }}</h6>
              <b-row>
                <div class="card" v-for="(dish,index2) in category.dishList" :key="index2">
                  <b-row>
                    <b-col cols="5">
                      <img class="card-img-top" :src="dish.dishPhoto"> <!--:alt="dish.dish"-->
                    </b-col>
                    <b-col cols="7" class="card-message">
                      <div class="card-body">
                        <p class="card-title" style="font-size: 15px">{{ dish.dish }}</p>
                        <p class="card-text" style="font-size: 12px">{{ dish.description }}</p>
                        <div class="card-text"><strong style="color:orange; font-size: 15px">￥{{ dish.price }}</strong>
                          <!--加入购购物车动画效果-->
                          <!--                          <transition appear v-on:enter="itemEnter" v-on:leave="itemLeave">-->
                          <!--                            <div id="item"></div>-->

                          <van-button icon="plus" type="warning" color="#ee0a24" round :ref="'item'+dish.dishID"
                                      @click="addToCart1(dish,$event)"
                                      size="mini" id="addtocartmenu"></van-button>

                          <!-- 4. 使用Vue的<transition>元素来创建动画效果。可以为<transition>元素添加CSS样式来定义动画效果。 -->
                          <transition appear v-on:enter="itemEnter" v-on:leave="itemLeave">
                            <img class="add_img_js" :id="'item'+dish.dishID" v-if="addShow1 === dish.dishID"
                                 :src="dish.dishPhoto" alt="" style="width: 20px">
                          </transition>
                          <!--                          <span class="countProductEach" v-if="this.cart">{{}}</span>-->
                          <!--                          </transition>-->
                          <!--                          {{ dish.number }}-->

                          <!--                          <van-button icon="minus" color="#fab9c0" plain round @click="removeFromCart(dish)"-->
                          <!--                                               size="mini" id="minustocartmenu" ></van-button>-->
                          <!--                          <van-badge :content="5" active="">-->
                          <!--                            <van-button icon="plus" type="warning" round @click="addToCart(dish)" size="mini" id="addtocartmenu"></van-button>-->
                          <!--                          </van-badge>-->

                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>


    <!--  菜品主页结束  -->
    <!--   底部购物车 -->
    <div>
      <!--    购物车-->
      <div id="shoppingcartfooter">
        <!--购物车按钮-->
        <b-button v-b-toggle.sidebar-right id="cartbutton">
          <b-icon icon="cart3" animation="cylon" font-scale="2"></b-icon>
          <span id="countProductOuter" v-if="this.cartnum>0">{{ cartnum }}</span>
        </b-button>
      </div>
      <!-- 弹出购物车框   -->
      <b-sidebar id="sidebar-right" title="购物车" backdrop-variant='dark' right shadow>
        <div class="px-3 py-2">
          <!--  推荐商品-->
          <div id="recommend">
            <div class="gif">
              <b-img
                  src="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20190504/fafc2b313c5d4c58addfa6938d12c5ac.gif"
                  fluid thumbnail/>
            </div>
          </div>
          <!--已选商品-->
          <div id="selected">
            <div class="card-title" style="margin-bottom: 5px">
              <span class="yuanLine">.</span>
              <div class="yuantitle">已选商品</div>
            </div>
            <!--已选商品列表-->
            <div class="list-group2">
              <div class="list-group-item1" v-for="item in cart">
                <van-card
                    :price="item.price"
                    :desc="item.description"
                    :title="item.dish"
                    :thumb="item.dishPhoto"
                    style="text-align: left; background-color: #FFFFFF"
                >
                  <template #footer style="font-size: 10px">
                    <van-button icon="minus" color="#fab9c0" plain round @click="removeFromCart(item)"
                                size="mini" style=""></van-button>
                    <span style="bottom: -5px;left: 3px;position: relative;font-size: 14px">{{ item.number }}</span>
                    <van-button icon="plus" type="warning" round @click="addToCart(item)" size="mini"></van-button>
                  </template>
                </van-card>
              </div>
            </div>
          </div>
          <!--          <div class="gif">-->
          <!--            <b-img-->
          <!--                src="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20190504/fafc2b313c5d4c58addfa6938d12c5ac.gif"-->
          <!--                fluid thumbnail/>-->
          <!--          </div>-->
          <!--          <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>-->
          <!--底部结算-->
          <b-container fluid id="carttotle">
            <b-row>
              <b-col cols="8">
                <div class="shopcartIcon">
                  <b-row>
                    <b-col col="2">
                      <div class="shopNum">
                        <b-icon icon="cart3" animation="pulse" font-scale="2" id="carticonin"></b-icon>
                        <!--                      <div >-->
                        <!--购物车数量显示-->
                        <span class="countProduct">{{ cartnum }}</span>
                        <!--                      </div>-->
                      </div>
                    </b-col>
                    <b-col col="6">
                      <div>共计</div>
                      <div class="aggPrice"> ￥{{ totalprice }}</div>
                    </b-col>
                  </b-row>

                </div>
              </b-col>
              <b-col cols="4" id="gotopaycols">
                <div class="descbox">
                  <div class="gotext">
                    <b-button variant="warning" id="gotopay" @click="gotoPayPage(cart,cartnum)">去结算</b-button>
                  </div>
                </div>

              </b-col>
            </b-row>
          </b-container>
          <!--        </div>-->

        </div>
      </b-sidebar>

    </div>
    <!--footer-->
    <MenuFooter></MenuFooter>
  </div>
</template>

<script>
import {BListGroup, BListGroupItem, BSidebar, BButton, BImg, VBScrollspy, VBScrollspyPlugin,} from 'bootstrap-vue'
import Upbar from "@/components/Upbar.vue";
import MenuFooter from "@/components/MenuFooter.vue";

// import Shoppingcartfooter from "@/views/shopingcart/Footer.vue";

export default {
  name: "MenuIndex",
  components: {
    MenuFooter,
    Upbar,
    BButton,
    BSidebar,
    BImg,
    BListGroup,
    BListGroupItem,
    VBScrollspy,
    VBScrollspyPlugin
  },
  data() {
    return {
      // 动画
      addShow1: null,

      //菜品目录图片
      imageList: [
        'http://rr707y5yy.hd-bkt.clouddn.com/%E6%B1%89%E5%A0%A1.png',
        'http://rr707y5yy.hd-bkt.clouddn.com/%E9%B8%A1%E8%85%BF.png',
        'http://rr707y5yy.hd-bkt.clouddn.com/%E7%85%8E%E8%9B%8B.png',
        'http://rr707y5yy.hd-bkt.clouddn.com/%E6%8F%90%E6%8B%89%E7%B1%B3%E8%8B%8F.png',
        'http://rr707y5yy.hd-bkt.clouddn.com/%E9%A5%AE%E6%96%99.png',
      ],

      //加购物车动画效果
      cartPosition: { //购物车位置
        x: 100,
        y: 100
      },
      itemPosition: { //商品位置
        x: 0,
        y: 0
      },

      activeSection: null, //不知道干嘛的在目录那边有用到
      currentCategory: '', // 当前分类
      cart: [], //购物车数据
      cartnum: 0, //购物车数量
      totalprice: 0, //总价
      categories: [
        // {
        //   categoryID: 1,
        //   categoryName: "汉堡",
        //   dishList: [
        //     {
        //       dishID: 1,
        //       dish: "汉堡11",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //     {
        //       dishID: 2,
        //       dish: "汉堡",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //     {
        //       dishID: 3,
        //       dish: "汉堡",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //     {
        //       dishID: 4,
        //       dish: "汉堡",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //
        //   ]
        // },
        // {
        //   categoryID: 2,
        //   categoryName: "汉堡",
        //   dishList: [
        //     {
        //       dishID: 1,
        //       dish: "汉堡11",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //     {
        //       dishID: 2,
        //       dish: "汉堡",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //     {
        //       dishID: 3,
        //       dish: "汉堡",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //     {
        //       dishID: 4,
        //       dish: "汉堡",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //   ]
        // },
        // {
        //   categoryID: 3,
        //   categoryName: "汉堡",
        //   dishList: [
        //     {
        //       dishID: 1,
        //       dish: "汉堡11",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //     {
        //       dishID: 2,
        //       dish: "汉堡",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //     {
        //       dishID: 3,
        //       dish: "汉堡",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //     {
        //       dishID: 4,
        //       dish: "汉堡",
        //       description: "汉堡",
        //       dishPhoto: "https://img.yzcdn.cn/vant/cat.jpeg",
        //       price: 10,
        //       stock: 100
        //     },
        //   ]
        // },

      ]

    }
  },
  mounted() {
    this.getDishes();
  },

  methods: {

    //加入购物车动画
    // 5. 在Vue实例中定义动画方法。
    itemEnter: function (el, done) {
      // this.addShow1 = dish.dishID;
      // 计算元素的初始位置和结束位置
      console.log(this.addShow1)
      console.log(el);
      console.log("动画")
      var startPosition = {
        x: 0,
        y: 0
      };

      var endPosition = {
        x: this.cartPosition.x - this.itemPosition.x,
        y: this.cartPosition.y - this.itemPosition.y
      };
      console.log(startPosition)
      console.log(endPosition)

      var animation = null;

      // 创建动画
      function animate() {
        //创建动画
        animation = el.animate([
          {transform: `translate(${startPosition.x}px, ${startPosition.y}px)`},
          {transform: `translate(${endPosition.x}px, ${endPosition.y}px)`}
        ], {
          duration: 1000,
          easing: 'ease-in-out'
        });
        console.log(animation)

        //等待动画效果完成
        setTimeout(function () {
          i++;
          if (i < 5) { // 这里可以根据需要设置动画的次数
            animate(); // 继续执行动画
          } else {
            // 动画完成后删除元素
            el.parentNode.removeChild(el);
            done();
            this.addShow1 = null;
          }
        }, 1000); // 这里可以根据需要设置动画的间隔时间


      }

      animate(); // 开始执行动画
      // var animation = el.animate([
      //   {transform: `translate(${startPosition.x}px, ${startPosition.y}px)`},
      //   {transform: `translate(${endPosition.x}px, ${endPosition.y}px)`}
      // ], {
      //   duration: 1000,
      //   easing: 'ease-in-out'
      // });
      // console.log(animation)
      //
      // // 执行动画
      // done();
      //
      // // 动画完成后删除元素
      // animation.onfinish = function () {
      //   //el.parentNode.removeChild(el);
      //   done();
      //   this.addShow1 = null;
      // };
    },
    itemLeave: function (el, done) {
      done();
    },


    //跳转支付页面
    gotoPayPage() {
      sessionStorage.setItem("cart", JSON.stringify(this.cart)); //sessionStorage不能直接存储数组对象，要先转为json
      console.log(this.cart)
      console.log(JSON.parse(sessionStorage.getItem('cart'))) //打印比对一下
      sessionStorage.setItem("totalprice", this.totalprice);
      console.log(this.totalprice)
      this.$router.push({path: '/user/pay'}); //跳转到支付

    },

    //获取菜品信息
    getDishes() {
      // 通过后端API获取菜品列表（包括分类信息）
      this.$api({
        url: '/categories/alldishes',
        method: 'get'
      }).then(res => {
        console.log(res)
        this.categories = res.data;
      }).catch(function (error) {
        console.log(error);
      });
      // this.$api({
      //   url: '/login/customer',
      //   method: 'post', //这个是method,用methods会默认post
      //   params: {
      //     phoneNumber: this.phoneNumber1,
      //     password: this.password1
      //   }
      // }).then(res => {
      //   console.log(res.code)
      //   if(res.code === 20051){
      //     // 登录成功
      //     this.$router.push({path: '/user/menu'})
      //   }else {
      //     // 登录失败,用bootstrap警告提醒框提醒
      //     console.log(res.msg+'1')
      //     this.isError = true;
      //     this.msg = res.msg;
      //
      //
      //   }
      // }).catch(function (error){
      //   console.log(error);
      // });

    },


    //购物车数量减一
    removeFromCart(item) {
      /* 将商品从购物车中移除 */
      this.cartnum -= 1;
      this.totalprice -= item.price;
      var index = this.cart.indexOf(item);
      console.log(item)
      if (item.number === 1) {
        this.cart.splice(index, 1);
        return;
      } else {
        item.number -= 1;
      }

    },

    //外部增加购物车，并且加入动画
    addToCart1(dish, event) {
      this.addShow1 = null;
      // 1.加入购物车动画
      // const div = document.createElement('div');
      // div.className = "circle";
      // div.innerHTML = `<img class="circle-icon"  :src="dish.dishPhoto" alt="" style="width: 24px">`;
      // // 点击按键并获取按钮的初始化位置
      // //const target = event.target as HTMLInputElement;
      // console.log(event); //event本身就有x,y信息
      // // var bntRect = event.getBoundingClientRect();
      // const ICON_SIZE = 24;
      // // // console.log(bntRect);
      // const left= event.x + 10 - ICON_SIZE / 2;
      // const top= event.y - ICON_SIZE;
      // div.style.setProperty('--left', `${left}px`);
      // div.style.setProperty('--top', `${top}px`);
      // // 获取icon的结束位置,就是购物车的位置
      // var cartElement = document.getElementById('cartbutton');
      // const cartRect = cartElement.getBoundingClientRect();
      // const x = cartRect.left + cartRect.width / 2 - ICON_SIZE / 2 - left;
      // const y = cartRect.top - ICON_SIZE - top;
      // div.style.setProperty('--x', `${x}px`);
      // div.style.setProperty('--y', `${y}px`);
      // // 动画结束时移除
      // div.addEventListener('animationend', () => {
      //   div.remove();
      // })
      // // 添加icon到界面
      // document.body.appendChild(div);


      // 获取购物车和商品的DOM元素

      var id1 = 'item' + dish.dishID;//动态生成的id
      var itemElement = this.$refs['item' + dish.dishID][0];//动态生成的id
      console.log(id1);
      var cartElement = document.getElementById('cartbutton');
      //var button = event; //获取点击元素
      //获取点击的元素位置
      //console.log(`Button position: top=${button.clientX}, left=${buttonLeft}`);

      //var itemElement = document.getElementById(id1);

      // // 根据传入的event，获取该按钮所在位置,用ref传入的值,不用getBoundingClientRect
      //const buttonEl = this.$refs['item'+dish.dishID];
      const buttonTop = itemElement.offsetTop;
      const buttonLeft = itemElement.offsetLeft;
      console.log(`Button position: top=${buttonTop}, left=${buttonLeft}`);

      // this.itemPosition = {
      //   x: buttonLeft,
      //   y: buttonTop
      // }

      // 计算元素的位置
      var cartPosition = cartElement.getBoundingClientRect();
      console.log(cartPosition)
      console.log(cartElement)
      console.log(itemElement)

      var itemPosition = itemElement.getBoundingClientRect();
      //console.log(itemPosition)

      // console.log(event.x)
      // console.log(event.y)

      // 更新状态变量
      this.cartPosition = {
        x: cartPosition.left + cartPosition.width / 2,
        y: cartPosition.top + cartPosition.height / 2
      };
      this.itemPosition = {
        x: itemPosition.left + itemPosition.width / 2,
        y: itemPosition.top + itemPosition.height / 2
      };
      // this.itemPosition = {
      //   x: event.x,
      //   y: event.y
      // };
      console.log(this.itemPosition)
      console.log('cartPosition' + this.cartPosition)

      this.addShow1 = dish.dishID;


      // 2.改变购物车数量
      console.log(dish)
      console.log(this.cartnum)
      this.cartnum += 1; //购物车总数
      this.totalprice += dish.price; //总价
      /* 检查购物车中是否已经有该商品 */
      var index = this.cart.findIndex(function (i) {
        console.log(i)
        return i.dishID === dish.dishID;
      });
      // var index = this.cart.findIndex(function (i) {
      //   console.log(i)
      //   return i.id === dish.dishID;
      // });
      if (index === -1) {
        /* 如果购物车中没有该商品，则将商品添加到购物车 */
        this.cart.push({
          dishID: dish.dishID,
          dish: dish.dish,
          price: dish.price,
          number: 1,
          description: dish.description,
          dishPhoto: dish.dishPhoto
        });
      } else {
        /* 如果购物车中已经有该商品，则将商品数量加1 */
        this.cart[index].number += 1;


      }
    },

    //增加购物车
    addToCart(dish) {


      console.log(dish)
      console.log(this.cartnum)
      this.cartnum += 1; //购物车总数
      this.totalprice += dish.price; //总价
      /* 检查购物车中是否已经有该商品 */
      var index = this.cart.findIndex(function (i) {
        console.log(i)
        return i.dishID === dish.dishID;
      });
      // var index = this.cart.findIndex(function (i) {
      //   console.log(i)
      //   return i.id === dish.dishID;
      // });
      if (index === -1) {
        /* 如果购物车中没有该商品，则将商品添加到购物车 */
        this.cart.push({
          dishID: dish.dishID,
          dish: dish.dish,
          price: dish.price,
          number: 1,
          description: dish.description,
          dishPhoto: dish.dishPhoto
        });
      } else {
        /* 如果购物车中已经有该商品，则将商品数量加1 */
        this.cart[index].number += 1;

      }
    }
  }
}


</script>

<style scoped>
/*与动画相关*/
/*.circle {*/
/*  position: fixed;*/
/*  width: 20px;*/
/*  height: 20px;*/
/*  line-height: 20px;*/
/*  border-radius: 20px;*/
/*  left: var(--left);*/
/*  top: var(--top);*/
/*  !* border: 2px solid #454545; *!*/
/*}*/
/*与动画相关*/

/*与动画相关*/
@keyframes moveY {
  to {
    transform: translateY(var(--y));
  }
}

/*.circle {*/
/*  --duration: 0.8s;*/
/*  animation: moveY var(--duration) cubic-bezier(0.5, -0.5, 1, 1);*/
/*}*/

@keyframes moveX {
  to {
    transform: translateX(var(--x));
  }
}

/*.circle-icon {*/
/*  animation: moveX var(--duration) linear;*/
/*}*/


/*每个菜品列表，加入购物车*/


#menu {
  background: url("~@/assets/homebg.jpg") no-repeat;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  box-sizing: border-box;
  padding-top: 0;
  padding-bottom: 50px;
  padding-left: 0px;
  padding-right: 0px;
  margin-right: 0px;
  margin-left: 0px;
  height: calc(100% - 10rem);
  width: 100%;
  overflow-y: auto;
  display: block !important;
}

/deep/ .van-badge--fixed {
  top: 6px;
}

.list-nav-item {
  --bs-list-group-color: #212529;
  --bs-list-group-bg: null;
  --bs-list-group-border-color: null; /*rgba(0, 0, 0, 0.125) */
  --bs-list-group-border-width: 1px;
  --bs-list-group-border-radius: 0.375rem;
  --bs-list-group-item-padding-x: 1rem;
  --bs-list-group-item-padding-y: 0.5rem;
  --bs-list-group-action-color: #495057;
  --bs-list-group-action-hover-color: #495057;
  --bs-list-group-action-hover-bg: #f8f9fa;
  --bs-list-group-action-active-color: #212529;
  --bs-list-group-action-active-bg: #e9ecef;
  --bs-list-group-disabled-color: #6c757d;
  --bs-list-group-disabled-bg: #fff;
  --bs-list-group-active-color: #fff;
  --bs-list-group-active-bg: #ffcd56;
  --bs-list-group-active-border-color: #ffcd56;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  margin-bottom: 0;
  border-radius: var(--bs-list-group-border-radius);

}

#shoppingcartfooter {
  position: absolute;
  left: 5px;
  bottom: 100px;
  width: 60px;
  height: 50px;
  /*background-color: #f5f5f5;*/
  /*border-top: 1px solid #e5e5e5;*/
}

/*商品列表*/
.card {
  background: none;
}

/*侧边购物车按钮*/
#cartbutton {
  /*background-color: #ffcd56;*/
  background-color: #ed662cd4;
  /* 形状圆形 */
  /*border-bottom-left-radius: 30px;*/
  /*border-top-left-radius: 30px*/
  border-radius: 50%;

  height: 57px;
}

#sidebar-right {
  background: darkgrey;


}

/*购物车侧边栏打开后小图标*/
#carticonin {
  color: #212529;
  margin-top: 7px;
}

/*购物车计数*/
.countProduct {
  background: #ffcd56;
  border-radius: 10px;
  position: absolute;
  margin-top: 3px;
}

/*外部购物车计数*/
#countProductOuter {
  background: #f10b0b;
  border-radius: 10px;
  position: absolute;
  margin-top: -17px;
  width: 20px;
  margin-left: -6px
}

#recommend {
  background: white;
  height: 100px;
  border-radius: 10px;
}

#selected {
  margin-top: 10px;
  background: white;
  border-radius: 10px;
}

#cartbutton {
  /*background: #ffcd56;*/
  background-color: #ed662cd4;
}

#addtocartmenu {
  margin-left: 43px
}

#minustocartmenu {
  margin-left: 40px
}

.card-body {
  padding-left: 0;
  padding-right: 0;
}

.card-message {
  padding-left: 0;
  padding-right: 0;
}

.card-img-top {
  object-fit: cover;
}

.card-title {
  width: auto;
  height: 20px;
  margin-top: 2px;
}

.yuanLine {
  float: left;
  left: 0px;
  height: 20px;
  color: #d30008;
  box-sizing: border-box;
  background: #d30008;
  width: 6px;
  border-radius: 6px;
}

.yuantitle {
  position: relative;
  float: left;
  left: 3px;
}

.gif {
  width: 100px;
  position: absolute;
  margin-bottom: 100px;
  margin-right: 0px;
}


#carttotle {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-left: -16px;
  height: 50px;
  background-color: #f5f5f5;
  border-top: 1px solid #e5e5e5;
}

#gotopay {
  width: 100%;
  height: 50px;
  background-color: #ffcd56;

}

#gotopaycols {
  padding: 0;
}

.list-group-item1 {
  /* 不显示原点 */
  list-style: none;
  /* 去掉左边距 */
  margin-left: 0;
  /*  去边框*/
  border: none;
}

</style>