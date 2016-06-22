/**
 * 
 * @authors luozh@snail.com
 * @date    2016-05-12 10:29:11
 * @version $Id$
 */

import Vue from 'vue'
import Vuex from 'vuex'
import Vue_Resource from 'vue-resource'

// 告诉 vue “使用” vuex
Vue.use(Vuex)
Vue.use(Vue_Resource)

// 创建一个 object 存储应用启动时的状态
const state = {
    username: '',
    roomLocation: [],
    roomStatus: [],
    operators: [],
    productTypes: [],
    cityArr1: []
}   

// 创建一个 object 存储 mutation 函数
const mutations = {

    // 设置用户名
    GETUSER (state, data) {
        state.username = data
    },

    // 设置机房、状态
    GETROOMSEARCH (state, data) {
        state.roomLocation = data.idc
        state.roomStatus = data.status
    },

    // 设置运营商、业务类型、一级城市
    GETROOMCREATE (state, data) {
        state.operators = data.operators
        state.productTypes = data.productTypes
        state.cityArr1 = data.cityArr1
    }
}

// 通过 new Vuex.Store 结合初始 state 和 mutations，创建 store
// 这个 store 将和我们的 vue 应用链接起来
export default new Vuex.Store({
    state,
    mutations
})