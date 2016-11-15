<template>
    <div class="main">
        <Left v-if="showLeft"></Left>
        <Main></Main>
    </div>
</template>

<script>
import Left from './views/Left.vue'
import Main from './views/Main.vue'
import store from './vuex/store.js'
import { getUserInfo } from './vuex/action.js'

export default {
    data () {
        return {
            showLeft: true
        }
    },
    components: {
        Left,
        Main
    },
    vuex: {
        actions: {
            getUserInfo
        }
    },
    created () {

        // 性能优化
        setTimeout(() => {
            this.showLeft = true
        }, 0)
    },
    ready () {
        this.getUserInfo()
    },
    store
}
</script>

<style scoped>

</style>