<!-- 新增CPU -->
<template>
    <modal :show.sync="creatCpuModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增CPU</h4>
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
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">数量：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" v-model="num" min="1">
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
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="model && frequency && num ? false : true">保存</button>
            <button type="button" class="btn btn-default" @click='creatCpuModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

export default {
    data() {
        return {
            creatCpuModal: false,
            model: '',
            frequency: '',
            num: 1
        }
    },
    methods: {

        // 保存
        saveFn () {
            this.$http({
                url: '/equipment/cpu_add/',
                method: 'POST',
                data: {
                    model: this.model,
                    frequency: this.frequency,
                    num: this.num,
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.creatCpuModal = false
                    this.model = ''
                    this.frequency = ''
                    this.num = 1

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
        'showCpuModal' () {
            this.creatCpuModal = true
        }
    }
}
</script>

<style scoped>
    
</style>

