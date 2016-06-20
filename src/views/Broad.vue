<template>
    <modal :show.sync="broadModal" effect="fade" width="600px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">输入框</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <textarea rows="8" class="form-control" v-model="txt" placeholder="输入多个请以回车换行"></textarea>
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
            name: ''
        }
    },
    methods: {
        transformFn () {
            if (this.txt.trim()) {
                let param = {
                    val: this.txt.replace(/\n/g, ','),
                    name: this.name
                }

                this.$dispatch('getTxt', param)
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
            
            this.broadModal = true
        }
    }
}
</script>

<style scoped>
</style>