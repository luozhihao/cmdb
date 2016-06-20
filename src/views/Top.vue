<template>
    <div class="main-header">
        <!-- <div class="hide-menu">  
        </div> -->
        <dropdown class="pull-right"> 
            <div data-toggle="dropdown" class="username">
                <span class="glyphicon glyphicon-user"></span>
                {{ username }}
                <span class="caret"></span>
            </div>
            <ul slot="dropdown-menu" class="dropdown-menu">
                <li><a @click="exitFn">退出</a></li>
            </ul>
        </dropdown>
    </div>
</template>

<script>
import { dropdown } from 'vue-strap'
import { username } from '../vuex/getters.js'

export default {
    methods: {

        // 退出
        exitFn () {
            this.$http({
                url: '/logout/',
                method: 'POST',
            })
            .then(function (response) {
                location.href="/"
            })
        }
    },
    components: {
        dropdown
    },
    vuex: {
        getters: {
            username
        }
    }
}
</script>

<style scoped>
.main-header {
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: white;
    color: #A3A3A3;
    box-shadow: 0 0 2px #ccc;
    z-index: 2;
}

.username {
    height: 50px;
    padding: 0 75px 0 20px;
    cursor: pointer;
    border-radius: 0 !important;
}

.username:hover {
    background: #F5F5F5;
    color: #919292;
}

.glyphicon-user {
    color: #56c0e0;
}

.hide-menu {
    float: left;
    width: 50px;
    height: 50px;
    color: #676A6F;
    font-size: 16px;
    margin-left: 10px;
    background: url('../assets/images/nav-min.png') center center no-repeat;
    cursor: pointer;
}
</style>