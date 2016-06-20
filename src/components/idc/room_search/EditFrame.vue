<template>
    <modal :show.sync="editFrameModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title" v-text="creatId ? '新增机架' : '修改机架'"></h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">机架编号：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">容量：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">电流总量：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">内网总量：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">备注：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 input-box">
                    <div class="form-group">
                        <label class="control-label col-sm-4">状态：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">位置：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">管理网总量：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">外网总量：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default" v-if="editId" @click="createSeats">新增机位</button>
            <button type="button" class="btn btn-default" @click='editFrameModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        editFrameModal: false,
        creatId: null,
        editId: null,
        statusArr: [],
        status: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 新增机位
        createSeats () {
            let _this = this

            this.$dispatch('showCreateSeats', _this.creatId)
        }
    },
    components: {
        modal,
        vSelect
    },
    events: {
        'showEditFrame' (param) {
            this.$data = Object.assign({}, origin, init)

            this.editId = param
            this.editFrameModal = true
        },
        'showCreateFrame' (param) {
            this.$data = Object.assign({}, origin, init)

            this.creatId = param
            this.editFrameModal = true
        }
    }
}
</script>

<style scoped>
</style>