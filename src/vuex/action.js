/**
 * 
 * @authors luozh@snail.com
 * @date    2016-05-12 10:35:58
 * @version v1.0
 */

 // action 会收到 store 作为它的第一个参数
 // 在 store 里我们只需要 dispatch （在有些情况下需要 state）
 // 我们可以利用 ES6 的解构（destructuring）语法来简化参数的使用


// 获取用户信息
export function getUserInfo({ dispatch, state }) {
    this.$http({
        url: '/userinfo/',
        method: 'POST'
    })
    .then(response => {
        if (response.data.result === 1) {
            dispatch('GETUSER', response.data.username)  // 登陆用户名
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

