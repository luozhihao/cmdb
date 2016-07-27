<!-- 新建修改机架 -->
<template>
    <modal :show.sync="editFrameModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title" v-text="roomId !== null ? '新增机架' : '修改机架'"></h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">机架编号：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="frameNum">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">容量：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="capacity">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">电流总量：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="electricTotal">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">内网总量：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="intranetTotal">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">备注：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="remark">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 input-box">
                    <div class="form-group">
                        <label class="control-label col-sm-4">状态：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">位置：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="location">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">管理网总量：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="managementNetworkTotal">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">外网总量：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="extranetTotal">
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
                :disabled="frameNum.trim() && status && capacity.trim() && location.trim() ? false : true"
            >
                保存
            </button>
            <button
                type="button" 
                class="btn btn-default" 
                v-if="canSave && frameId && (perm.编辑机房 || perm.all)" 
                @click="createSeats"
            >
                新增机位
            </button>
            <button type="button" class="btn btn-default" @click='editFrameModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { statusArr, perm } from '../../../vuex/getters.js'

let origin = {
        editFrameModal: false,
        canSave: true,
        roomId: null,
        frameId: null,
        frameNum: '',
        capacity: '',
        electricTotal: '',
        intranetTotal: '',
        remark: '',
        status: '',
        location: '',
        managementNetworkTotal: '',
        extranetTotal: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 保存机架
        saveFn () {
            if (this.frameId === null) {
                this.$http({
                    url: '/idc/shelf/add/',
                    method: 'POST',
                    data: this.$data
                })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.$data = Object.assign({}, origin, init)

                        this.editFrameModal = false

                        this.$dispatch('refresh')
                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error')
                    }
                })
            }

            if (this.roomId === null) {
                this.$http({
                    url: '/idc/shelf/edit/',
                    method: 'POST',
                    data: this.$data
                })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.$data = Object.assign({}, origin, init)
                        this.editFrameModal = false

                        this.$dispatch('refresh')
                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error')
                    }
                })
            }
        },

        // 新增机位
        createSeats () {
            let _this = this

            this.$dispatch('showCreateSeats', _this.frameId)
        }
    },
    components: {
        modal,
        vSelect
    },
    vuex: {
        getters: {
            statusArr,
            perm
        }
    },
    events: {
        'showEditFrame' (param) {
            this.$data = Object.assign({}, origin, init)

            this.$http({
                url: '/idc/shelf/get/?id=' + param,
                method: 'GET',
            })
            .then((response) => {
                if (response.data.code === 200) {
                    this.$data = Object.assign({}, origin, response.data)

                    this.frameId = param
                    this.editFrameModal = true

                    response.data.frameNum === '未知' ? this.canSave = false : this.canSave = true
                } else {
                    this.$dispatch('show-error')
                }
            })
        },
        'showCreateFrame' (param) {
            this.$data = Object.assign({}, origin, init)
            this.roomId = param
            this.editFrameModal = true
        }
    }
}
</script>

<style scoped>
</style>