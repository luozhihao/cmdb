/**
 * 
 * @authors luozh@snail.com
 * @date    2016-03-21 17:04:26
 * @description 路由配置
 */

'use strict'

export default function (router) {
    router.map({
        '/': {
            component: function (resolve) {
                require(['./components/overview/Overview.vue'], resolve)
            }
        },
        '/overview': {
            component: function (resolve) {
                require(['./components/overview/Overview.vue'], resolve)
            }
        },
        '/roomSearch': {
            component: function (resolve) {
                require(['./components/idc/room_search/RoomSearch.vue'], resolve)
            }
        },
        '/roomConnect': {
            component: function (resolve) {
                require(['./components/idc/room_connect/RoomConnect.vue'], resolve)
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
                require(['./components/ip/ip_plan/IpPlan.vue'], resolve)
            }
        },
        '/netSearch': {
            component: function (resolve) {
                require(['./components/ip/net_search/NetSearch.vue'], resolve)
            }
        },
        '/serverSearch': {
            component: function (resolve) {
                require(['./components/server/server_search/ServerSearch.vue'], resolve)
            }
        },
        '/storageSearch': {
            component: function (resolve) {
                require(['./components/server/storage/StorageSearch.vue'], resolve)
            }
        },
        '/autoDiscovery': {
            component: function (resolve) {
                require(['./components/server/auto_discovery/AutoDiscovery.vue'], resolve)
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
        },
        '/businessTree': {
            component: function (resolve) {
                require(['./components/business/business_tree/BusinessTree.vue'], resolve)
            }
        }
    })
}
