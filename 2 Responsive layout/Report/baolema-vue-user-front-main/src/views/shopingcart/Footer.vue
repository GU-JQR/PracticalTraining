<template>
  <div>
<!--    购物车-->
    <div id="shoppingcartfooter">
      <!--购物车按钮-->
      <b-button v-b-toggle.sidebar-right id="cartbutton">
        <b-icon icon="cart3" animation="cylon" font-scale="2"></b-icon>
      </b-button>
    </div>
    <!-- 弹出购物车框   -->
    <b-sidebar id="sidebar-right" title="购物车" backdrop-variant='dark' right shadow>
      <div class="px-3 py-2">
        <!--  推荐商品-->
        <div id="recommend">

        </div>
        <!--已选商品-->
        <div id="selected">
          <div class="card-title">
            <span class="yuanLine">.</span>
            <div class="yuantitle">已选商品</div>
          </div>
          <!--已选商品列表-->
          <div>
            <ul>
              <li>11</li>
            </ul>
          </div>
        </div>
        <div class="gif">
          <b-img
              src="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20190504/fafc2b313c5d4c58addfa6938d12c5ac.gif"
              fluid thumbnail/>
        </div>
        <!--          <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>-->
        <!--底部结算-->
        <b-container fluid id="carttotle">
          <b-row>
            <b-col cols="8">
              <div class="shopcartIcon">
                <b-row>
                  <b-col col="2">
                    <div class="shopNum">
                      <b-icon icon="cart3" animation="pulse" font-scale="2" id = "carticonin"></b-icon>
<!--                      <div >-->
                        <span class="countProduct">10</span>
<!--                      </div>-->
                    </div>
                  </b-col>
                  <b-col col="6">
                    <div>共计</div>
                    <div class="aggPrice"> ￥16.00</div>
                  </b-col>
                </b-row>

              </div>
            </b-col>
            <b-col cols="4" id="gotopaycols">
              <div class="descbox">
                <div class="gotext">
                  <b-button variant="warning" id="gotopay">去结算</b-button>
                </div>
              </div>

            </b-col>
          </b-row>
        </b-container>
        <!--        </div>-->

      </div>
    </b-sidebar>

  </div>
</template>

<script>
import {BButton, BSidebar, BImg} from 'bootstrap-vue'

export default {
  name: "shoppingcartfooter",
  components: {
    BButton,
    BSidebar,
    BImg
  }
}
</script>

<style scoped>
#shoppingcartfooter {
  position: absolute;
  right: 0;
  top: 300px;
  width: 60px;
  height: 50px;
  /*background-color: #f5f5f5;*/
  border-top: 1px solid #e5e5e5;
}

/*侧边购物车按钮*/
#cartbutton {
  /*background-color: #ffcd56;*/
  /* 形状圆形 */
  background-color: #ed662cd4;
  border-bottom-left-radius: 30px;
  border-top-left-radius: 30px

}

#sidebar-right {
  background: darkgrey;


}

/*购物车侧边栏打开后小图标*/
#carticonin{
  color: #212529;
  margin-top:7px;
}

/*购物车计数*/
.countProduct{
  background: #ffcd56;
  border-radius: 10px;
  position: absolute;
  margin-top: 3px;
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
  background: #ffcd56;
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
</style>