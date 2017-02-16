<!-- 批量修改 -->
<template>
    <modal :show.sync="batchEditModal" effect="fade" width="850px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">批量修改服务器</h4>
        </div>
        <div slot="modal-body" class="modal-body min-height">
            <form class="form-horizontal clearfix">
                <div class="col-sm-6">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">类型：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="serverType" :options="serverTypes" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">状态：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">厂商：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="firm" :options="firms" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">所在机房：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="room" :options="rooms" placeholder="请选择" :search="true">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">所在机架：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="frame" :options="frames" placeholder="请选择" :search="true">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">所在机位：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="seat" :options="seats" placeholder="请选择" :search="true">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">用途描述：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="usage">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">入库时间：</label>
                        <div class="col-sm-8">
                            <datepicker
                              :value.sync="addTime"
                              :format="'yyyy-MM-dd'"
                              :show-reset-button="true">
                            </datepicker>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">出厂时间：</label>
                        <div class="col-sm-8">
                            <datepicker
                              :value.sync="factoryTime"
                              :format="'yyyy-MM-dd'"
                              :show-reset-button="true">
                            </datepicker>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">购买时间：</label>
                        <div class="col-sm-8">
                            <datepicker
                              :value.sync="procureTime"
                              :format="'yyyy-MM-dd'"
                              :show-reset-button="true">
                            </datepicker>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">质保期限：</label>
                        <div class="col-sm-8">
                            <datepicker
                              :value.sync="shelfLife"
                              :format="'yyyy-MM-dd'"
                              :show-reset-button="true">
                            </datepicker>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">接收人：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="catcher">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">备注：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="remark">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveFn">保存</button>
            <button type="button" class="btn btn-default" @click='batchEditModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import datepicker from '../../global/Datepicker.vue'
import { getFramesSeats } from '../../../vuex/action.js'
import { idcs, frames, seats, serverStatus, serverTypes, firms } from '../../../vuex/getters.js'

let origin = {
        batchEditModal: false,
        checkedIds: [],
        serverType: '',
        status: '',
        firm: '',
        room: '',
        frame: '',
        seat: '',
        addTime: '',
        factoryTime: '',
        procureTime: '',
        shelfLife: '',
        usage: '',
        catcher: '',
        remark: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 保存
        saveFn () {
            this.$http({
                url: '/device/server/edit/batch/',
                method: 'POST',
                data: this.$data
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.batchEditModal = false
                    this.$data = Object.assign({}, init)

                    this.$dispatch('refresh')
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error', response.data.msg)
                }
            })
        }
    },
    components: {
        modal,
        vSelect,
        datepicker
    },
    vuex: {
        actions: {
            getFramesSeats
        },
        getters: {
            rooms: idcs,
            frames,
            seats,
            statusArr: serverStatus,
            firms,
            serverTypes
        }
    },
    events: {
        'batchEdit' (param) {
            this.batchEditModal = true
            this.checkedIds = param
        }
    },
    watch: {
        'room' (newVal) {
            this.frame = ''
            this.seat = ''

            this.getFramesSeats(newVal, 'room')
        },
        'frame' (newVal) {
            this.seat = ''

            this.getFramesSeats(newVal, 'shelf')
        },
        'batchEditModal' (newVal) {
            if (!newVal) {
                this.$data = Object.assign({}, init)
            }
        }
    }
}
</script>

<style scoped>
.min-height {
    min-height: 500px;
}
</style>