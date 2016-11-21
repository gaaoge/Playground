/**
 * Created by GG on 2016/10/14.
 */

import Vue from 'vue';

import store from './store';
import router from './router';
import App from './component/App.vue';

//根Vue实例
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
