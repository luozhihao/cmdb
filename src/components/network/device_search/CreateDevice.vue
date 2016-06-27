<template>
    <modal :show.sync="createModal" effect="fade" width="1200px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增交换机</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix form-input">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">SN：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="sn">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">机房：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="room" :options="rooms" placeholder="请选择" :search="true">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">机架：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="frame" :options="frames" placeholder="请选择" :search="true">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">机位：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="seat" :options="seats" placeholder="请选择" :search="true">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">来源：<span class="text-danger">*</span></label>
                        <div class="col-sm-4 input-box pr0">
                            <v-select :value.sync="origin1" :options="origins1" placeholder="请选择">
                            </v-select>
                        </div>
                        <div class="col-sm-4 input-box pl0">
                            <v-select :value.sync="origin2" :options="origins2" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">型号：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="model">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">厂商：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="firm" :options="firms" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">状态：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">资产编号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="assetNum">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">财务编号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="financeNum">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">发票编号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="invoiceNum">
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
                        <label class="control-label col-sm-4">采购时间：</label>
                        <div class="col-sm-8">
                            <datepicker
                              :value.sync="procureTime"
                              :format="'yyyy-MM-dd'"
                              :show-reset-button="true">
                            </datepicker>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">电压：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="voltage">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">电流：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="electric">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">功率：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="power">
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
                    <div class="form-group">
                        <label class="control-label col-sm-4">传输速率：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="speed">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">接口总数：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="interfaceTotal">
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
            <button type="button" class="btn btn-default" @click="saveFn"
                :disabled="sn.trim() && room && frame && seat && origin1 && origin2 && model && firm && status && interfaceTotal.trim() ? false : true"
            >保存</button>
            <button type="button" class="btn btn-default" @click='createModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import datepicker from '../../global/Datepicker.vue'
import vSelect from '../../global/Select.vue'
import { getFramesSeats, getOrigins } from '../../../vuex/action.js'
import { idcs, firms, origins1, deviceStatus, frames, seats, origins2 } from '../../../vuex/getters.js'

let origin = {
        createModal: false,
        sn: '',
        room: '',
        frame: '',
        seat :'',
        origin1: '',
        origin2: '',
        model: '',
        firm: '',
        status: '',
        assetNum: '',
        financeNum: '',
        invoiceNum: '',
        addTime: '',
        factoryTime: '',
        procureTime: '',
        voltage: '',
        electric: '',
        power: '',
        shelfLife: '',
        speed: '',
        interfaceTotal: '',
        remark: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 保存方法
        saveFn () {
            this.$http({
                url: '/device/switch/add/',
                method: 'POST',
                data: this.$data
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.createModal = false
                    this.$data = Object.assign({}, init)
                    
                    this.$dispatch('refresh')                  
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error')
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
            getFramesSeats,  // 获取机架机位
            getOrigins // 获取二级来源
        }, 
        getters: {
            rooms: idcs,
            firms,
            origins1,
            statusArr: deviceStatus,
            frames,
            seats,
            origins2
        }
    },
    events: {
        'showCreate' () {
            this.createModal = true
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
        'origin1' (newVal) {
            this.origin2 = ''

            this.getOrigins(newVal)
        }
    }
}
</script>

<style scoped>

</style>