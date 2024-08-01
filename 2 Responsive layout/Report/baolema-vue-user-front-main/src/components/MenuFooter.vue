<template>
  <div>
    <van-tabbar v-model="active"  @change="onChange">
      <van-tabbar-item name="/user/home" icon="home-o" to="/user/home">首页</van-tabbar-item>
      <van-tabbar-item name="/user/menu" icon="search" to="/user/menu">菜单</van-tabbar-item>
      <van-tabbar-item name="/user/orderhistory" icon="todo-list-o" to="/user/orderhistory">订单</van-tabbar-item>
      <van-tabbar-item name="/user/user" icon="user-o" to="/user/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "MenuFooter",
  data() {
    return {
      active: '/user/menu'
    };
  },
  methods: {
    onChange(active) {
      this.active = active;
    }
  },
  mounted() {
    this.active = this.$route.path;
  }

}
</script>

<style scoped>

</style>