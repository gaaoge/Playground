/**
 * Created by GG on 2016/10/27.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import Sign from '../component/Sign.vue';
import Test from '../component/Test.vue';
import Vuex from '../component/Vuex.vue';

Vue.use(VueRouter);

//router路由
const router = new VueRouter({
    // mode: 'history',
    routes: [
        {path: '/', component: Vuex},
        {path: '/sign', component: Sign},
        {path: '/test', component: Test},
        {path: '/vuex/(\\d*)', component: Vuex},
    ]
});

export default router;