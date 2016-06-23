<template>
    <div class="sidebar">
        <a class="logo" v-link="{ path: '/' }">
            <img src="../assets/images/logo2.png" height="35" width="134">
        </a>
        <aside class="menu">
            <div class="aside-header" @click="toggle('idc')">
                <span class="icon glyphicon glyphicon-map-marker"></span>
                <span>IDC</span>
                <span class="icon-arrow glyphicon glyphicon-menu-down"></span>
            </div>
            <ul class="aside-lists" v-el:idc>
                <li v-link="{ path: '/roomSearch' }">
                    <span>机房查询</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('network')">
                <span class="icon glyphicon glyphicon-inbox"></span>
                <span>网络设备</span>
                <span class="icon-arrow glyphicon glyphicon-menu-down"></span>
            </div>
            <ul class="aside-lists" v-el:network>
                <li v-link="{ path: '/deviceSearch' }">
                    <span>交换机查询</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('ip')">
                <span class="icon glyphicon glyphicon-asterisk"></span>
                <span>IP</span>
                <span class="icon-arrow glyphicon glyphicon-menu-down"></span>
            </div>
            <ul class="aside-lists" v-el:ip>
                <li v-link="{ path: '/ipSearch' }">
                    <span>IP查询</span>
                </li>
                <li v-link="{ path: '/ipPlan' }">
                    <span>IP规划</span>
                </li>
                <li v-link="{ path: '/ipDelete' }">
                    <span>IP回收</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('server')">
                <span class="icon glyphicon glyphicon-hdd"></span>
                <span>服务器</span>
                <span class="icon-arrow glyphicon glyphicon-menu-down"></span>
            </div>
            <ul class="aside-lists" v-el:server>
                <li v-link="{ path: '/serverSearch' }">
                    <span>服务器查询</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('business')">
                <span class="icon glyphicon glyphicon-th-large"></span>
                <span>业务</span>
                <span class="icon-arrow glyphicon glyphicon-menu-down"></span>
            </div>
            <ul class="aside-lists" v-el:business>
                <li v-link="{ path: '/businessSearch' }">
                    <span>业务管理</span>
                </li>
                <li>
                    <span>业务树</span>
                </li>
            </ul>
            <div class="aside-header" @click="toggle('other')">
                <span class="icon glyphicon glyphicon-th"></span>
                <span>其他</span>
                <span class="icon-arrow glyphicon glyphicon-menu-down"></span>
            </div>
            <ul class="aside-lists" v-el:other>
                <li v-link="{ path: '/import' }">
                    <span>导入</span>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
export default {
    methods: {

        // 导航栏收缩
        toggle (type) {
            this.$els[type].classList.toggle('open')
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
    line-height: 42px;
    height: 42px;
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