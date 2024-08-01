import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ElementUI from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式

Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'

import 'bootstrap-vue/dist/bootstrap-vue.css'


import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引入axios
import "/src/axios/request.js";
import request from "/src/axios/request.js";
//request.defaults.withCredentials=true;//让ajax携带cookie
//Vue.prototype.$axios = axios;
Vue.prototype.$api = request

//引入jquery
import jquery from "jquery";
Vue.prototype.$ = jquery;

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)