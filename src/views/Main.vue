<template>
    <div class="right-view">
        <Top></Top>
        <div class="right-main">
            <router-view transition="fade" transition-mode="out-in"></router-view>
        </div>

        <alert
          :show.sync="showSuccess"
          :duration="3000"
          type="success"
          width="250px"
          placement="top-right"
          dismissable
        >
          <span class="icon-ok-circled alert-icon-float-left"></span>
          <strong>操作成功 :)</strong>
          <p>{{ success }}</p>
        </alert>

        <alert
          :show.sync="showNotify"
          :duration="3000"
          type="info"
          width="250px"
          placement="top-right"
          dismissable
        >
          <span class="icon-info-circled alert-icon-float-left"></span>
          <strong>提示信息:</strong>
          <p>{{ notify }}</p>
        </alert>

        <alert
          :show.sync="showError"
          :duration="3000"
          type="danger"
          width="250px"
          placement="top-right"
          dismissable>
          <span class="icon-info-circled alert-icon-float-left"></span>
          <strong>操作失败 :(</strong>
          <p>{{ danger }}</p>
        </alert>

        <broad-modal></broad-modal>
    </div>
</template>

<script>
import Top from './Top.vue'
import { alert } from 'vue-strap'
import broadModal from './Broad.vue'

export default {
    data () {
        return {
            showSuccess: false,
            showNotify: false,
            showError: false,
            success: '',
            notify: '',
            danger: ''
        }
    },
    components: {
        Top,
        alert,
        broadModal
    },
    events: {
        'show-success' (msg) {
            this.showSuccess = true
            this.showNotify = false
            this.showError = false

            msg === undefined ? this.success = '你的操作已经成功执行~' : this.success = msg
        },
        'show-notify' (msg) {
            this.showNotify = true
            this.showSuccess = false
            this.showError = false

            msg === undefined ? this.notify = '你的操作已经成功执行~' : this.notify = msg
        },
        'show-error' (msg) {
            this.showError = true
            this.showSuccess = false
            this.showNotify = false

            msg === undefined ? this.danger = '你的操作执行失败了~' : this.danger = msg
        },
        'showBroad' (param) {
            this.$broadcast('showBroad', param)
        },
        'getTxt' (param) {
            this.$broadcast('getTxt', param)
        },
        'getTxt2' (param) {
            this.$broadcast('getTxt2', param)
        }
    }
}
</script>

<style scoped>
.right-view {
    width: auto;
    position: absolute;
    top: 0;
    left: 11%;
    bottom: 0;
    right: 0;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f5f5f5;
}

.right-main {
    width: auto;
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 20px;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f5f5f5;
}

.fade-transition {
    transition: opacity 0.1s ease;
}

.fade-enter, .fade-leave {
    opacity: 0;
}
</style>