<template>
    <modal :show.sync="editSeatsModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title" v-text="creatId ? '新增机位' : '修改机位'"></h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">机位编号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">开始位置：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">备注：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">状态：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">结束位置：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default" @click='editSeatsModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        editSeatsModal: false,
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

    },
    components: {
        modal,
        vSelect
    },
    events: {
        'showEditSeats' (param) {
            this.$data = Object.assign({}, origin, init)

            this.editId = param
            this.editSeatsModal = true
        },
        'showCreateSeats' (param) {
            this.$data = Object.assign({}, origin, init)

            this.creatId = param
            this.editSeatsModal = true
        }
    }
}
</script>

<style scoped>
</style>