import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from '../router';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import { Button, Layout } from 'ant-design-vue';


import './assets/styles.js';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Button)
Vue.use(Layout)

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')