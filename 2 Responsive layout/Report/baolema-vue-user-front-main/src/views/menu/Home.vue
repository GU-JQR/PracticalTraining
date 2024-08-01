<template>
  <div class="background">
    <div class="homelogo">BaoLeMa</div>
    <div style="height: 500px">
      <el-carousel :interval="4000" arrow="always">
        <el-carousel-item v-for="item in images" :key="item">
          <img :src="item.url" alt="无图片" class="lunbo"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="toorder">
      <img src="../../assets/picture/toorderl.png" class="toorderl"/>
      <img src="../../assets/picture/toorderr.png" class="toorderr" @click="toorder"/>
    </div>
    <MenuFooter></MenuFooter>
  </div>
</template>



<script>
import MenuFooter from "@/components/MenuFooter.vue";
export default {
  name: "Home",
  components: {
    MenuFooter,
  },
  data(){
    return {
      images: [
        { url: require("@/assets/picture/lunbo1.jpg")},
        { url: require("@/assets/picture/lunbo2.jpg")}
      ],
    };
  },
  methods:{
    toorder(){
      this.$router.push({path: '/user/menu'})
    }
  }
}
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.lunbo{
  object-fit: cover;
}
.background{
  background: linear-gradient(357deg, rgb(250 233 220) 0%, rgba(250, 125, 52, 0.01) 60%);
  height: 834px;
}
.homelogo{
  margin-top: 20px;
  margin-left: 10px;
  width: 146px;
  height: 27px;
  opacity: 1;
  font-size: 27px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(0, 0, 0, 1);
  text-align: left;
  vertical-align: top;
  font-family: "Adobe 黑体 Std R";
}
.toorder {
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top:-180px;
  height: 170px;
  /*background: #fff;*/
}
.toorderl{
  width: 90px;
  height: 90px;
  margin-left: 50px;
}
.toorderr{
  width: 120px;
  height: 50px;
  position: relative;
  left: -50px;
}
</style>