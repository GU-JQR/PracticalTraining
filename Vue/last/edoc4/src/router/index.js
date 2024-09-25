import VueRouter from "vue-router";
import Vue from 'vue'
import Add from '../pages/Add.vue'
import List from '../pages/List.vue'
import Update from "../pages/Update.vue";
import { component } from "vue/types/umd";


Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            paht: '/',
            redirect: '/list'
        },
        {
            path: '/add',
            component: Add
        },
        {
            path: '/list',
            component: List
        },
        {
            path: '/update',
            component: Update
        }
    ]
})