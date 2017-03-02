<!-- 修改群组 -->
<template>
    <modal :show.sync="editGroupModal" effect="fade" width="600px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">修改群组</h4>
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
            <button type="button" class="btn btn-default" @click='editGroupModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

export default {
    data() {
        return {
            editGroupModal: false,
            id: null,
            name: '',
        }
    },
    methods: {

        // 保存
        saveFn () {
            this.$http({
                url: '/group/edit/',
                method: 'POST',
                data: {
                    id: this.id,
                    name: this.name,
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.editGroupModal = false
                    this.name = ''
                    this.id = null

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
        'showEditModal' (param) {
            this.editGroupModal = true
            this.id = param.id
            this.name = param.name
        }
    }
}
</script>

<style scoped>
    
</style>

