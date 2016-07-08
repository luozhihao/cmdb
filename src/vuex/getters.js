/**
 * 
 * @authors luozh@snail.com
 * @date    2016-05-12 10:42:13
 * @version $Id$
 */

// 这个 getter 函数会返回 count 的值
// 在 ES6 里可以写成：
// export const getCount = state => state.count

// 获取用户名
export const username = state => state.username

// 获取机房位置
export const idcs = state => state.roomLocation

// 获取机房状态
export const statusArr = state => state.roomStatus

// 获取运营商
export const operators = state => state.operators

// 获取业务类型
export const productTypes = state => state.productTypes

// 获取一级城市
export const cityArr1 = state => state.cityArr1

// 获取部门
export const departments = state => state.departments

// 获取运营阶段
export const phases = state => state.phases

// 获取游戏类型
export const gameTypes = state => state.gameTypes

// 获取平台类型
export const platformTypes = state => state.platformTypes

// 获取研发模式
export const developModels = state => state.developModels

// 获取游戏列表
export const gameLists = state => state.gameLists

// 获取产品级别
export const productLevels = state => state.productLevels

// 获取厂商
export const firms = state => state.firms

// 获取一级来源
export const origins1 = state => state.origins1

// 获取交换机状态
export const deviceStatus = state => state.deviceStatus

// 获取机架
export const frames = state => state.frames

// 获取机位
export const seats = state => state.seats

// 获取二级来源
export const origins2 = state => state.origins2

// 获取网络类型
export const netTypes = state => state.netTypes

// 获取产品类型
export const products = state => state.products

// 获取服务器类型
export const serverTypes = state => state.serverTypes

// 获取服务器状态
export const serverStatus = state => state.serverStatus

// 获取操作系统
export const systems = state => state.systems

// 获取机房连通类型
export const connTypes = state => state.connTypes