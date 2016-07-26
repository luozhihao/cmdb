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
    cityArr1: [],
    departments: [],
    gameTypes: [],
    platformTypes: [],
    developModels: [],
    phases: [],
    productLevels: [],
    gameLists: [],
    firms: [],
    origins1: [],
    origins2: [],
    deviceStatus: [],
    frames: [],
    seats: [],
    netTypes: [],
    products: [],
    serverTypes: [],
    serverStatus: [],
    systems: [],
    connTypes: [],
    treeProducts: [],
    importTypes: []
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
    },

    // 设置业务管理下拉框内容
    GETBUSINESSSEARCH (state, data) {
        state.departments = data.departments
        state.productTypes = data.businessTypes
        state.gameTypes = data.gameTypes
        state.platformTypes = data.platformTypes
        state.developModels = data.developModels
        state.phases = data.phases
        state.productLevels = data.productLevels
        state.gameLists = data.gameLists
    },

    // 获取交换机查询下拉框内容
    GETDEVICESEARCH (state, data) {
        state.roomLocation = data.rooms
        state.firms = data.firms
        state.origins1 = data.origins1
        state.deviceStatus = data.statusArr
    },

    // 获取机架
    GETFRAMES (state, data) {
        state.frames = data.items
    },

    // 获取机位
    GETSEATS (state, data) {
        state.seats = data.items
    },

    // 获取二级来源
    GETORIGINS (state, data) {
        state.origins2 = data.items
    },

    // 获取网络类型、规划机房
    GETIPPLAN (state, data) {
        state.roomLocation = data.idcs
        state.netTypes = data.types
        state.operators = data.operators
    },

    // 获取服务器查询页下拉框
    GETSERVERSEARCH (state, data) {
        state.roomLocation = data.rooms
        state.products = data.products
        state.serverTypes = data.serverTypes
        state.departments = data.departments
        state.systems = data.systems
        state.origins1 = data.origins1
        state.serverStatus = data.statusArr
        state.firms = data.firms
    },

    // 获取IP查询页下拉框
    GETIPSEARCH (state, data) {
        state.roomLocation = data.rooms
        state.roomStatus = data.stautsArr
        state.operators = data.operators
        state.netTypes = data.types
        state.importTypes = data.importTypes
    },

    // 获取机房连通性数据
    GETROOMCONNECT (state, data) {
        state.roomLocation = data.rooms
        state.connTypes = data.connTypes
    },

    // 获取业务树产品数据
    GETTREESELECT (state, data) {
        state.treeProducts = data.products
    }
}

// 通过 new Vuex.Store 结合初始 state 和 mutations，创建 store
// 这个 store 将和我们的 vue 应用链接起来
export default new Vuex.Store({
    state,
    mutations
})