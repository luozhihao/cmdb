/**
 * 
 * @authors luozh@snail.com
 * @date    2016-05-12 10:35:58
 * @version v1.0
 */

 // action 会收到 store 作为它的第一个参数
 // 在 store 里只需要 dispatch （在有些情况下需要 state）
 // 可以利用 ES6 的解构语法来简化参数的使用

// 获取用户信息
export function getUserInfo({ dispatch, state }) {
    this.$http({
        url: '/userinfo/',
        method: 'POST'
    })
    .then(response => {
        if (response.data.result === 1) {
            dispatch('GETUSER', response.data)  // 登陆用户名
        }
    })
}

// 获取机房、状态
export function getRoomSearch({ dispatch, state }) {
    this.$http({
        url: '/idc/home/',
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
            dispatch('GETROOMSEARCH', response.data) 
        } 
    })
}

// 获取运营商、业务类型、一级城市
export function getRoomCreate({ dispatch, state }) {
    this.$http({
        url: '/idc/room_page_data/',
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
            dispatch('GETROOMCREATE', response.data) 
        } 
    })
}

// 获取业务管理下拉框内容
export function getBusinessSearch({ dispatch, state }) {
    this.$http({
        url: '/product/condition/',
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
            dispatch('GETBUSINESSSEARCH', response.data) 
        } 
    })
}

// 获取交换机查询下拉框内容
export function getDeviceSearch({ dispatch, state }) {
    this.$http({
        url: '/device/home/',
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
            dispatch('GETDEVICESEARCH', response.data) 
        } 
    })
}

// 获取机架、机位
export function getFramesSeats({ dispatch, state }, newVal, name) {
    this.$http({
        url: '/device/idc_query/?id=' + newVal + '&type=' + name,
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
            name === 'room' ? dispatch('GETFRAMES', response.data) : dispatch('GETSEATS', response.data)
        } 
    })
}

// 获取二级来源
export function getOrigins({ dispatch, state }, newVal) {
    this.$http({
        url: '/device/source_query/?id=' + newVal,
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
           dispatch('GETORIGINS', response.data)
        } 
    })
}

// 获取网络类型、规划机房、运营商
export function getIpPlan({ dispatch, state }) {
    this.$http({
        url: '/ip/ip_add/',
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
           dispatch('GETIPPLAN', response.data)
        } 
    })
}

// 获取服务器查询页下拉框数据
export function getServerSearch({ dispatch, state }) {
    this.$http({
        url: '/device/server/home/',
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
           dispatch('GETSERVERSEARCH', response.data)
        } 
    })
}

// 获取IP查询页下拉框
export function getIpSearch({ dispatch, state }) {
    this.$http({
        url: '/ip/ip_list/',
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
           dispatch('GETIPSEARCH', response.data)
        } 
    })
}

// 获取机房连通性
export function getRoomConnect({ dispatch, state }) {
    this.$http({
        url: '/idc/room_connect/',
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
           dispatch('GETROOMCONNECT', response.data)
        } 
    })
}

// 获取业务树产品列表
export function getTreeSelect({ dispatch, state }) {
    this.$http({
        url: '/node/getProduct/',
        method: 'GET'
    })
    .then(response => {
        if (response.data.code === 200) {
           dispatch('GETTREESELECT', response.data)
        } 
    })
}


