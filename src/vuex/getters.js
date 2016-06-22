/**
 * 
 * @authors luozh@snail.com
 * @date    2016-05-12 10:42:13
 * @version $Id$
 */

// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

// 获取用户名
export function username (state) {
    return state.username
}

// 获取机房位置
export function idcs (state) {
    return state.roomLocation
}

// 获取机房状态
export function statusArr (state) {
    return state.roomStatus
}

// 获取运营商
export function operators (state) {
    return state.operators
}

// 获取业务类型
export function productTypes (state) {
    return state.productTypes
}

// 获取一级城市
export function cityArr1 (state) {
    return state.cityArr1
}