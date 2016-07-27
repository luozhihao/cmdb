<!-- 新建修改机位 -->
<template>
    <modal :show.sync="editSeatsModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title" v-text="frameId !== null ? '新增机位' : '修改机位'"></h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">机位编号：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="seatsNum">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">开始位置：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="startLocation">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">备注：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="remark">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">状态：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">结束位置：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="endLocation">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button
                v-if="canSave && (perm.编辑机房 || perm.all)" 
                type="button" 
                class="btn btn-default" 
                @click="saveFn" 
                :disabled="seatsNum.trim() && startLocation.trim() && endLocation.trim() && status ? false : true"
            >
                保存
            </button>
            <button type="button" class="btn btn-default" @click='editSeatsModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { statusArr, perm } from '../../../vuex/getters.js'

let origin = {
        editSeatsModal: false,
        canSave: true,
        frameId: null,
        seatsId: null,
        seatsNum: '',
        startLocation: '',
        endLocation: '',
        status: '',
        remark: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 保存机位
        saveFn () {
            if (this.seatsId === null) {
                this.$http({
                    url: '/idc/position/add/',
                    method: 'POST',
                    data: this.$data
                })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.$data = Object.assign({}, origin, init)

                        this.editSeatsModal = false

                        this.$dispatch('refresh')
                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error')
                    }
                })
            }

            if (this.frameId === null) {
                this.$http({
                    url: '/idc/position/edit/',
                    method: 'POST',
                    data: this.$data
                })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.$data = Object.assign({}, origin, init)
                        this.editSeatsModal = false

                        this.$dispatch('refresh')
                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error')
                    }
                })
            }
        }
    },
    components: {
        modal,
        vSelect
    },
    vuex: {
        getters: {
            perm,
            statusArr
        }
    },
    events: {
        'showEditSeats' (param) {
            this.$data = Object.assign({}, origin, init)

            this.$http({
                url: '/idc/position/get/?id=' + param,
                method: 'GET',
            })
            .then((response) => {
                if (response.data.code === 200) {
                    this.$data = Object.assign({}, origin, response.data)

                    this.seatsId = param
                    this.editSeatsModal = true
                    
                    response.data.seatsNum === '未知' ? this.canSave = false : this.canSave = true
                } else {
                    this.$dispatch('show-error')
                }
            })
        },
        'showCreateSeats' (param) {
            this.$data = Object.assign({}, origin, init)

            this.frameId = param
            this.editSeatsModal = true
        }
    }
}
</script>

<style scoped>
</style>