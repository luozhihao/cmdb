<!-- 编辑CPU -->
<template>
    <modal :show.sync="editCpuModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">编辑CPU</h4>
        </div>
        <div slot="modal-body" class="modal-body" style="min-height: 50px;">
            <form class="form-horizontal text-center clearfix">
                <div class="col-sm-6">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">型号：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="model">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">主频：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="frequency">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="model && frequency ? false : true">保存</button>
            <button type="button" class="btn btn-default" @click='editCpuModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

export default {
    data() {
        return {
            id: null,
            editCpuModal: false,
            model: '',
            frequency: ''
        }
    },
    methods: {

        // 保存
        saveFn () {
            this.$http({
                url: '/equipment/cpu_edit/',
                method: 'POST',
                data: {
                    id: this.id,
                    model: this.model,
                    frequency: this.frequency,
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.editCpuModal = false
                    this.model = ''
                    this.frequency = ''

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
        'showEditCpuModal' (param) {
            this.editCpuModal = true
            this.id = param.id
            this.model = param.model
            this.frequency = param.frequency
        }
    }
}
</script>

<style scoped>
    
</style>

