<template>
    <modal :show.sync="broadModal" effect="fade" width="600px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">输入框</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <textarea id="txt" rows="8" class="form-control" v-model="txt" placeholder="输入多个请以回车换行"></textarea>
            </form> 
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="transformFn">确认</button>
            <button type="button" class="btn btn-default" @click='broadModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

export default {
    data () {
        return {
            broadModal: false,
            txt: '',
            name: '',
            types: 0
        }
    },
    methods: {

        // 多行内容转换
        transformFn () {
            if (this.txt.trim()) {
                let arr = this.txt.split('\n'),
                    newArr = []

                arr.forEach((e) => {
                    e.trim() ? newArr.push(e.trim()) : ''
                })

                let param = {
                    val: newArr.join(','),
                    name: this.name
                }

                this.types === 0 ? this.$dispatch('getTxt', param) : this.$dispatch('getTxt2', param)
            } else {
                let param = {
                    val: '',
                    name: this.name
                }

                this.types === 0 ? this.$dispatch('getTxt', param) : this.$dispatch('getTxt2', param)
            }

            this.broadModal = false
        }
    },
    components: {
        modal
    },
    events: {
        'showBroad' (param) {
            if (param.value) {
                this.txt = param.value.replace(/,/g, '\n')
            } else {
                this.txt = ''
            }

            this.name = param.name

            param.types ? this.types = 1 : this.types = 0
            
            this.broadModal = true

            // 自动聚焦文本框
            this.$nextTick(function () {
                let txt = document.getElementById('txt')

                txt.focus()
            })
        }
    }
}
</script>

<style scoped>
</style>