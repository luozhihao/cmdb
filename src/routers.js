/**
 * 
 * @authors luozh@snail.com
 * @date    2016-03-21 17:04:26
 * @description 路由配置
 */

'use strict'

export default function (router) {
    router.map({
        '/roomSearch': {
            component: function (resolve) {
                require(['./components/idc/room_search/RoomSearch.vue'], resolve)
            }
        },
        '/deviceSearch': {
            component: function (resolve) {
                require(['./components/network/device_search/DeviceSearch.vue'], resolve)
            }
        },
        '/ipSearch': {
            component: function (resolve) {
                require(['./components/ip/ip_search/IpSearch.vue'], resolve)
            }
        },
        '/ipPlan': {
            component: function (resolve) {
                require(['./components/ip/ip_plan/ipPlan.vue'], resolve)
            }
        },
        '/ipDelete': {
            component: function (resolve) {
                require(['./components/ip/ip_delete/ipDelete.vue'], resolve)
            }
        },
        '/serverSearch': {
            component: function (resolve) {
                require(['./components/server/server_search/ServerSearch.vue'], resolve)
            }
        },
        '/businessSearch': {
            component: function (resolve) {
                require(['./components/business/business_search/BusinessSearch.vue'], resolve)
            }
        },
        '/import': {
            component: function (resolve) {
                require(['./components/other/import/import.vue'], resolve)
            }
        }
    })
}
