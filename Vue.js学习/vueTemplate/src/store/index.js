/**
 * Created by GG on 2016/10/27.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import Logger from 'vuex/dist/logger';

Vue.use(Vuex);

//模拟异步函数
const sleep = (seconds)=> {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds || 1000);
    });
};

//vuex状态管理
const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        count: 0
    },
    mutations: {
        increment (state, payload) {
            state.count += (payload && payload.amount || 1);
        },
        decrement (state, payload) {
            state.count -= (payload && payload.amount || 1);
        }
    },
    actions: {
        asyncIncrement0 ({commit}) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('increment');
                    resolve()
                }, 1000);
            });
        },
        async asyncIncrement ({commit}) {
            commit('increment', await sleep());
        },
        async asyncDecrement ({dispatch, commit}) {
            await dispatch('asyncIncrement');
            await sleep();
            commit('decrement', {amount: 2});
        }
    },
    plugins: [Logger()]
});

export default store;