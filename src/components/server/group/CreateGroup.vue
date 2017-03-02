<!-- 新增群组 -->
<template>
    <modal :show.sync="creatGroupModal" effect="fade" width="600px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增群组</h4>
        </div>
        <div slot="modal-body" class="modal-body" style="min-height: 50px;">
            <form class="form-horizontal text-center">
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">群组名称：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="name">
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="name ? false : true">保存</button>
            <button type="button" class="btn btn-default" @click='creatGroupModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

export default {
    data() {
        return {
            creatGroupModal: false,
            name: '',
        }
    },
    methods: {

        // 保存
        saveFn () {
            this.$http({
                url: '/group/add/',
                method: 'POST',
                data: {
                    name: this.name,
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.creatGroupModal = false
                    this.name = ''

                    this.$dispatch('refresh')
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error', response.data.msg)
                }
            })
        }
    },
    components: {
        modal
    },
    events: {
        'showCreateModal' () {
            this.creatGroupModal = true
        }
    }
}
</script>

<style scoped>
    
</style>

