<template lang='jade'>
div.main
    Left
    Main
</template>

<script>
import Left from './views/Left.vue'
import Main from './views/Main.vue'
import store from './vuex/store.js'
import { getUserInfo } from './vuex/action.js'

export default {
    components: {
        Left,
        Main
    },
    vuex: {
        actions: {
            getUserInfo
        }
    },
    ready () {
        this.getUserInfo()
    },
    store
}
</script>

<style lang="stylus">
@import '../src/assets/css/bootstrap.min.css'
@import '../src/assets/css/common.css'
</style>