<template>
  <div >
    <!-- 设置footer固定在底部-->
    <div id="orderfooter">
      <van-button plain hairline round color="#000000" class="footer-button" size="small" @click="finish">我已取餐</van-button>
      <van-button round color="#fdcc56" class="footer-button" size="small" @click="gotoRate">点我评价</van-button>
    </div>

    <van-dialog v-model="show" title="对堡了嘛还满意吗？" show-cancel-button :beforeClose="beforeClose">
      <van-rate v-model="value" allow-half void-icon="star" void-color="##ffd21e" style="margin: 20px" />
    </van-dialog>
  </div>
</template>

<script>

export default {
  name: "Orderfooter",
  data() {
    return {
      show: false,
      value: 2.5,
    };
  },
  methods: {
    // 点击 去评价，弹出评价框
    gotoRate() {
      //弹出评价框
      this.show = true;

    },
    // 监听评论框的内容
    beforeClose(action, done) {
      if (action === 'confirm') {
        //获取评价信息，返回给后端数据
        console.log(this.value)
        this.$toast.success('谢谢惠顾！\n去评价一下');
        done();
      } else {
        done();
      }
    },

    // 点击 已取餐
    finish() {
      this.$toast.success('谢谢惠顾！\n去评价一下');
      this.currentSwipeItem = 3;
    }
  }
}
</script>

<style scoped>
.footer-button{
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 8px;
}

#orderfooter{
  text-align: right;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  border-top: 1px solid #e5e5e5;
  padding-bottom: 15px;

}
</style>