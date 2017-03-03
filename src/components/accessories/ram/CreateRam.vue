<!-- 新增内存 -->
<template>
    <modal :show.sync="creatRamModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增内存</h4>
        </div>
        <div slot="modal-body" class="modal-body" style="min-height: 50px;">
            <form class="form-horizontal text-center clearfix">
                <div class="col-sm-6">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">类型：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="type">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">容量：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="size">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">品牌：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="brand">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">数量：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" v-model="num" min="1">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="type && size && brand && num ? false : true">保存</button>
            <button type="button" class="btn btn-default" @click='creatRamModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

export default {
    data() {
        return {
            creatRamModal: false,
            type: '',
            brand: '',
            size: '',
            num: 1
        }
    },
    methods: {

        // 保存
        saveFn () {
            this.$http({
                url: '/equipment/mem_add/',
                method: 'POST',
                data: {
                    type: this.type,
                    brand: this.brand,
                    size: this.size,
                    num: this.num,
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.creatRamModal = false
                    this.type = ''
                    this.brand = ''
                    this.size = ''
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
        'showRamModal' () {
            this.creatRamModal = true
        }
    }
}
</script>

<style scoped>
    
</style>

