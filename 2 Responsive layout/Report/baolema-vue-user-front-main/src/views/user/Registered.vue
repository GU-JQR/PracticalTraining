<template>
  <div class="background">
    <div class="upground">
      <img class="logo" src="../assets/logo.png">
    </div>
    <div  class="headText">
      <p>创建您的账户</p>
    </div>
    <div class="textTip" @click="jumpLogin">
      <p>已有账号？在此登录></p>
    </div>
    <div class="inputBarBackground">
      <div class="inputBar">
        <input type="text" id="emailText" class="emailText" @blur="emailLeave" placeholder=" name@example.com">
      </div>
      <div id="textTip2" class="textTip2">
        <p>您自己的学校Email</p>
      </div>
      <div class="inputBar2">
        <input type="password" id="passwordText" class="emailText" @blur="passwordLeave" placeholder=" 密码">
      </div>
      <div class="inputBar2">
        <input type="password" id="confirmText" class="emailText" @blur="confirmLeave" placeholder=" 确认密码">
      </div>
      <div id="wrongConfirm"></div>
    </div>
    <div class="line"></div>
    <div class="inputBarBackground2">
      <button class="verifyCode" @click="verify">点击获取验证码</button>
      <div class="inputBar2">
        <input id="test2" v-model="verfy" class="verifyText" placeholder=" 请输入图中字符">
      </div>
    </div>
    <button id="test3" class="button" @click="regist">注册</button>
    <div class="downGround"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      email: '',
      password: '',
      confirm: '',
      verfy: '',
      verifyCode: '',
      verifyTruth: true
    }
  },
  methods: {
    verify () {
      console.log(this.email)
      this.$axios({
        method: 'post',
        url: '/sendVcode',
        data: this.qs.stringify({
          email: this.email
        })
      })
        .then(({ data }) => {
          if (data.success) {
            window.alert('邮件发送成功')
            this.verifyCode = data.msg
            this.verifyTruth = true
          } else {
            window.alert(data.msg)
          }
        })
    },
    jumpLogin () {
      this.$router.push('/')
    },

    emailLeave () {
      this.email = document.getElementById('emailText').value
      document.getElementById('textTip2').style.marginTop = '10px'
      document.getElementById('textTip2').style.height = '19px'
      if (this.email === '') {
        document.getElementById('textTip2').innerText = '未输入邮箱'
        document.getElementById('textTip2').style.color = '#e30000'
        document.getElementById('emailText').setAttribute('class', 'emailText change')
      } else {
        document.getElementById('textTip2').innerText = '您自己的学校Email'
        document.getElementById('textTip2').style.color = '#3F85ED'
        document.getElementById('emailText').setAttribute('class', 'emailText')
      }
    },

    passwordLeave () {
      this.password = document.getElementById('passwordText').value
      if (this.password === '') {
        document.getElementById('passwordText').setAttribute('class', 'emailText change')
      } else {
        document.getElementById('passwordText').setAttribute('class', 'emailText')
      }
    },
    confirmLeave () {
      this.confirm = document.getElementById('confirmText').value
      if (this.password === '') {
        document.getElementById('confirmText').setAttribute('class', 'emailText change')
      } else {
        document.getElementById('confirmText').setAttribute('class', 'emailText')
        if (this.password !== this.confirm) {
          document.getElementById('confirmText').setAttribute('class', 'emailText change')
          document.getElementById('wrongConfirm').innerText = '两次输入的密码不匹配'
        } else {
          document.getElementById('confirmText').setAttribute('class', 'emailText')
          document.getElementById('wrongConfirm').innerText = ''
        }
      }
    },
    regist () {
      if (this.verifyCode === this.verfy) {
        this.verifyTruth = true
      }
      if (this.verifyTruth) {
        this.email = document.getElementById('emailText').value
        this.password = document.getElementById('passwordText').value
        this.confirm = document.getElementById('confirmText').value
        if (this.email === '' || this.password === '' || this.confirm === '' || this.password !== this.confirm) {
          window.confirm('输入的信息有误')
        } else if (this.verfy !== this.verifyCode) {
          window.confirm('验证码有误')
        } else {
          this.$axios({
            method: 'post',
            url: '/register',
            data: this.qs.stringify({
              email: this.email,
              password: this.password
            })
          })
            .then(({ data }) => {
              if (data.success) {
                window.confirm('注册成功')
                this.$router.push('/')
              } else {
                window.confirm('该邮箱已注册')
              }
            })
        }
      } else {
        window.alert('验证码错误')
      }
    }
  }
}
</script>

<style scoped>
.background{
  width:100%;
  height:100%;
  background:inherit;
  background-color:rgba(231, 241, 254, 1);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
}
.upground{
  width:100%;
  height:80px;
  background:inherit;
  background-color:rgba(63, 133, 237, 1);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
}
.logo{
  width:160px;
  height:80px;
}
.headText{
  margin-left: auto;
  margin-right: auto;
  width:517px;
  height:55px;
  font-family:'华文细黑';
  font-weight:400;
  font-style:normal;
  font-size:48px;
  color:#000000;
  text-align:center;
  word-wrap:break-word;
}
.textTip{
  margin-left: auto;
  margin-right: auto;
  width:165px;
  height:18px;
  background:inherit;
  background-color:rgba(255, 255, 255, 0);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  font-size:16px;
  color:#3F85ED;
}
.textTip:hover{
  text-decoration: underline;
}
.inputBarBackground{
  width: 425px;
  margin-right: auto;
  margin-left: auto;
}
.inputBarBackground2{
  width: 425px;
  display: flex;
  justify-content: space-between;
  margin-right: auto;
  margin-left: auto;
}
.inputBar{
  margin-left: auto;
  margin-right: auto;
}
.inputBar2{
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}
.emailText{
  display: block;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width:425px;
  height:80px;
  background:inherit;
  background-color:rgba(255, 255, 255, 1);
  box-sizing:border-box;
  border-width:1px;
  border-style:solid;
  border-color:rgba(121, 121, 121, 1);
  border-radius:15px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  color:#6B6B6B;
  text-align:left;
  font-size: 18px;
  outline: none;
}
.textTip2{
  margin-left: 5px;
  margin-top: -5px;
  width:165px;
  height:18px;
  background:inherit;
  background-color:rgba(255, 255, 255, 0);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  font-size:16px;
  color:#3F85ED;
}
.line{
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  width:1200px;
  height:1px;
  background:inherit;
  background-color:rgba(63, 133, 237, 1);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
}
.verifyCode{
  margin-top: 40px;
  width: 144px;
  height: 63px;
  background:inherit;
  background-color:#4A79DB;
  border:none;
  border-radius:5px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  font-size:14px;
  color:#FFFFFF;
  text-align: center;
  line-height: 50px;
  outline: none;
}
.verifyCode:hover{
  margin-top: 40px;
  width: 144px;
  height: 63px;
  background:inherit;
  background-color:#3F85ED;
  border:none;
  border-radius:5px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  font-size:14px;
  color:#FFFFFF;
  text-align: center;
  line-height: 50px;
  outline: none;
}
.verifyText{
  width:250px;
  height:63px;
  background:inherit;
  background-color:rgba(255, 255, 255, 1);
  box-sizing:border-box;
  border-width:1px;
  border-style:solid;
  border-color:rgba(121, 121, 121, 1);
  border-radius:15px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  font-size:18px;
  color:#6B6B6B;
  outline: none;
}
.button{
  outline: none;
  margin-top: 60px;
  display: block;
  margin-right: auto;
  margin-left: auto;
  width:425px;
  height:80px;
  background:inherit;
  background-color:rgba(63, 133, 237, 1);
  border:none;
  border-radius:15px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  font-size:18px;
  color:#FFFFFF;
}
.button:hover{
  outline: none;
  margin-top: 60px;
  display: block;
  margin-right: auto;
  margin-left: auto;
  width:425px;
  height:80px;
  background:inherit;
  background-color:rgb(96, 155, 243);
  border:none;
  border-radius:15px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  font-size:18px;
  color:#FFFFFF;
}
.downGround{
  height: 40px;
}
.emailText:focus{
  border-style: solid;
  border-width: 5px;
  border-color: rgba(63, 133, 237, 1);
}
.emailText.change::-webkit-input-placeholder
{
  color: #e30000;
}
.emailText.change::-moz-placeholder {
  color: #e30000;
}
.emailText.change::-ms-input-placeholder {
  color: #e30000;
}
.emailText.change{
  border-color: #e30000;
  background-color: #fff2f4;
}
#wrongConfirm{
  margin-left: 5px;
  background:inherit;
  background-color:rgba(255, 255, 255, 0);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  font-size:16px;
  color:#e30000;
}
</style>
