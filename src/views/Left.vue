<template>
    <div class="sidebar">
        <a class="logo" v-link="{ path: '/' }">
            <img src="../assets/images/logo2.png" height="35" width="134">
        </a>
        <aside class="menu">
            <div class="aside-header" @click="toggle('views')" v-if="perm.首页 || perm.all">
                <span class="icon glyphicon glyphicon-home"></span>
                <span>首页</span>
                <span class="icon-arrow glyphicon glyphicon-cog"></span>
            </div>
            <ul class="aside-lists" v-el:views>
                <li v-link="{ path: '/overview' }" v-if="perm.总览 || perm.all">
                    <span>总览</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('idc')" v-if="perm.IDC || perm.all">
                <span class="icon glyphicon glyphicon-map-marker"></span>
                <span>IDC</span>
                <span class="icon-arrow glyphicon glyphicon-cog"></span>
            </div>
            <ul class="aside-lists" v-el:idc>
                <li v-link="{ path: '/roomSearch' }" v-if="perm.机房查询 || perm.all">
                    <span>机房查询</span>
                </li>
                <li v-link="{ path: '/roomConnect' }" v-if="perm.机房连通性 || perm.all">
                    <span>机房连通性</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('network')" v-if="perm.网络设备 || perm.all">
                <span class="icon glyphicon glyphicon-inbox"></span>
                <span>网络设备</span>
                <span class="icon-arrow glyphicon glyphicon-cog"></span>
            </div>
            <ul class="aside-lists" v-el:network>
                <li v-link="{ path: '/deviceSearch' }" v-if="perm.交换机 || perm.all">
                    <span>交换机查询</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('ip')" v-if="perm.IP || perm.all">
                <span class="icon glyphicon glyphicon-asterisk"></span>
                <span>IP</span>
                <span class="icon-arrow glyphicon glyphicon-cog"></span>
            </div>
            <ul class="aside-lists" v-el:ip>
                <li v-link="{ path: '/ipSearch' }" v-if="perm.IP查询 || perm.all">
                    <span>IP查询</span>
                </li>
                <li v-link="{ path: '/ipPlan' }" v-if="perm.IP规划 || perm.all">
                    <span>IP规划</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('server')" v-if="perm.服务器 || perm.all">
                <span class="icon glyphicon glyphicon-hdd"></span>
                <span>服务器</span>
                <span class="icon-arrow glyphicon glyphicon-cog"></span>
            </div>
            <ul class="aside-lists" v-el:server>
                <li v-link="{ path: '/serverSearch' }" v-if="perm.服务器查询 || perm.all">
                    <span>服务器查询</span>
                </li>
                <li v-link="{ path: '/autoDiscovery' }" v-if="perm.自动发现 || perm.all">
                    <span>自动发现</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('business')" v-if="perm.业务 || perm.all">
                <span class="icon glyphicon glyphicon-th-large"></span>
                <span>业务</span>
                <span class="icon-arrow glyphicon glyphicon-cog"></span>
            </div>
            <ul class="aside-lists" v-el:business>
                <li v-link="{ path: '/businessSearch' }" v-if="perm.业务查询 || perm.all">
                    <span>业务查询</span>
                </li>
                <li v-link="{ path: '/businessTree' }" v-if="perm.业务树 || perm.all">
                    <span>业务树</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('other')" v-if="perm.其他 || perm.all">
                <span class="icon glyphicon glyphicon-th"></span>
                <span>其他</span>
                <span class="icon-arrow glyphicon glyphicon-cog"></span>
            </div>
            <ul class="aside-lists" v-el:other>
                <li v-link="{ path: '/import' }" v-if="perm.导入 || perm.all">
                    <span>导入</span>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
import { perm } from '../vuex/getters.js'

export default {
    methods: {

        // 导航栏收缩
        toggle (type) {
            this.$els[type].classList.toggle('open')
        }
    },
    vuex: {
        getters: {
            perm
        }
    }
}
</script>

<style scoped>
.sidebar {
    width: 200px;
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: #333;
    z-index: 102;
    overflow-x: hidden;
}

.logo img {
    display: block;
    margin: 20px auto;
}

.menu {
    margin-top: 20px;
}

.aside-header {
    position: relative;
    width: 100%;
    height: 42px;
    line-height: 42px;
    background: #404040;
    padding: 0 16px 0 28px;
    font-size: 12px;
    color: #999;
    cursor: pointer;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}

.aside-header:hover {
    color: #2db7f5;
}

.icon {
    width: 20px;
}

.icon-arrow {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 12px;
}

.aside-lists {
    padding: 0;
    margin: 0;
}

.aside-lists li {
    width: 100%;
    line-height: 35px;
    height: 35px;
    padding: 0 5px 0 50px;
    background: #333;
    color: #999;
    font-size: 12px;
    cursor: pointer;
    -webkit-transition: all .3s ease;
    -moaz-transition: all .3s ease;
    transition: all .3s ease;
}

.aside-lists li:hover {
    color: #fff;
}

.aside-lists li.active {
    background: #2db7f5;
    color: #fff;
}

.aside-lists.open {
    display: none;
}
</style>