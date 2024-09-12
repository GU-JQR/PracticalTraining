/* eslint-disable */
<template>
    <div>
        <h2>这是我的第一个组件</h2>
        <img src="assets/food.jpg" alt="">
        账号: <input type="text" v-model="number"><br>
        密码: <input type="text" v-model="pwd"><br>
        <button @click="login()">登录</button>
        <br>
        <button @click="sendPost()">发送ajax请求</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            number: '',
            pwd: '',
            result: '',
            user: {
                name: '小美',
                age: 18,
                address: '南京小行路16路',
                phone: '110-119'
            }
        }
    },
    methods: {
        login() {
            axios.get('http://localhost:9090/atm/login.do', { params: { number: this.number, pwd: this.pwd } })
                .then((response) => {
                    this.result = response.data;
                })
                .catch((response) => {
                    console.log(response)
                })
        },
        sendPost() {
            axios.post('http://localhost:9090/atm/login.do', this.user)
                .then((response) => {
                    this.result = response.data;
                })
        }


    },
    mounted: {

    },
}
</script>

<style lang="scss" scoped></style>