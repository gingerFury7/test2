import Vue from 'vue'
import Main_page from './Main_page.vue'
import VueRouter from 'vue-router'
import router from '@/router'
import axios from 'axios'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false;


Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(BootstrapVue)

Vue.config.productionTip = false;


new Vue({
    router,
    axios,
    render: h => h(Main_page)
}).$mount('#app')