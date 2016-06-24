<!-- 编辑设备 -->
<template>
    <modal :show.sync="editDeviceModal" effect="fade" width="1300px">
        <div slot="modal-header" class="modal-header">
            <button type="button" class="close" @click="editDeviceModal = false">
                <span>×</span>
            </button>
            <h4 class="modal-title">编辑设备</h4>
        </div>
        <div slot="modal-body" class="modal-body min-height">
            <tabs :active="0">
                <tab header="设备">
                    <form class="form-horizontal clearfix form-input">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="control-label col-sm-4">SN：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="sn">
                                </div>
                            </div>
                            <div class="form-group input-box">
                                <label class="control-label col-sm-4">机房：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <v-select :value.sync="room" :options="rooms" placeholder="请选择">
                                    </v-select>
                                </div>
                            </div>
                            <div class="form-group input-box">
                                <label class="control-label col-sm-4">机架：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <v-select :value.sync="frame" :options="frames" placeholder="请选择">
                                    </v-select>
                                </div>
                            </div>
                            <div class="form-group input-box">
                                <label class="control-label col-sm-4">机位：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <v-select :value.sync="seat" :options="seats" placeholder="请选择">
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
                        </div>
                        <div class="col-sm-3">
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
                            <div class="form-group">
                                <label class="control-label col-sm-4">资产编号：</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="assetNum">
                                </div>
                            </div>
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
                            <div class="form-group input-box">
                                <label class="control-label col-sm-4">状态：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                                    </v-select>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
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
                        <div class="col-sm-3">
                            <label class="control-label col-sm-4">IP：</label>
                            <div class="col-sm-8">
                                <textarea rows="12" class="form-control" v-model="ips" :readonly="true"></textarea>
                            </div>
                        </div>
                    </form>
                    <div class="text-center mt30 mb20">
                        <button type="button" class="btn btn-default" @click="saveFn"
                            :disabled="sn.trim() && room && frame && seat && origin1 && origin2 && model && firm && status && interfaceTotal.trim() ? false : true"
                        >保存</button>
                        <!-- <button type="button" class="btn btn-default" @click="$broadcast('showCreatVlan')">新增VLAN</button>
                        <button type="button" class="btn btn-default" @click="$broadcast('showCreatPort')">新增端口</button> -->
                        <button type="button" class="btn btn-default" @click='editDeviceModal = false'>取消</button>
                    </div>
                </tab>
                <tab header="VLAN">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>VLAN</th>
                                <th>速率</th>
                                <th>端口</th>
                                <th>IP</th>
                                <th>用途</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="vlan in vlans">
                                <td v-text="vlan.name"></td>
                                <td v-text="vlan.speed"></td>
                                <td v-text="vlan.port" :title="vlan.port"></td>
                                <td v-text="vlan.ip"></td>
                                <td v-text="vlan.use"></td>
                                <td>
                                    <button class="btn btn-default btn-small">
                                        <span class="table-icon glyphicon glyphicon-trash"></span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </tab>
                <tab header="端口号">
                    <table class="table table-hover table-scroll">
                        <thead>
                            <tr>
                                <th>端口号</th>
                                <th>所属VLAN</th>
                                <th>速率</th>
                                <th>状态</th>
                                <th>对端设备编号</th>
                                <th>对端设备端口</th>
                                <th>对端设备VLAN或MAC</th>
                                <th>用途</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="port in ports">
                                <td v-text="port.name"></td>
                                <td v-text="port.vlan"></td>
                                <td v-text="port.speed"></td>
                                <td v-text="port.status"></td>
                                <td v-text="port.device"></td>
                                <td v-text="port.devicePort"></td>
                                <td v-text="port.deviceVlan"></td>
                                <td v-text="port.use"></td>
                                <td class="pl20">
                                    <button class="btn btn-default btn-small">
                                        <span class="table-icon glyphicon glyphicon-trash"></span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </tab>
            </tabs>
        </div>
        <div slot="modal-footer" class="modal-footer">
        </div>
    </modal>

    <create-vlan-modal></create-vlan-modal>
    <create-port-modal></create-port-modal>
</template>

<script>
import { modal, datepicker, tabset, tab } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import createVlanModal from './CreateVlan.vue'
import createPortModal from './CreatePort.vue'
import { getFramesSeats, getOrigins } from '../../../vuex/action.js'
import { idcs, firms, origins1, deviceStatus, frames, seats, origins2 } from '../../../vuex/getters.js'

let origin = {
        editDeviceModal: false,
        vlans: [{name: 'vlan1', speed: '1Gbps', port: 'G23,G07,G15,G18,G02,G10,G2', ip: '', use: ''}],
        ports: [
            {name: 'G01', vlan: 'vlan1', speed: '1Gbps', status: '', device: '', devicePort: '', deviceVlan: '', use: ''},
            {name: 'G01', vlan: 'vlan1', speed: '1Gbps', status: '', device: '', devicePort: '', deviceVlan: '', use: ''},
            {name: 'G01', vlan: 'vlan1', speed: '1Gbps', status: '', device: '', devicePort: '', deviceVlan: '', use: ''},
            {name: 'G01', vlan: 'vlan1', speed: '1Gbps', status: '', device: '', devicePort: '', deviceVlan: '', use: ''},
            {name: 'G01', vlan: 'vlan1', speed: '1Gbps', status: '', device: '', devicePort: '', deviceVlan: '', use: ''},
            {name: 'G01', vlan: 'vlan1', speed: '1Gbps', status: '', device: '', devicePort: '', deviceVlan: '', use: ''}
        ],
        id: null,
        sn: '',
        firm: '',
        status: '',
        addTime: '',
        factoryTime: '',
        procureTime: '',
        model: '',
        origin1: '',
        origin2: '',
        room: '',
        frame: '',
        seat :'',
        financeNum: '',
        assetNum: '',
        invoiceNum: '',
        voltage: '',
        electric: '',
        power: '',
        shelfLife: '',
        speed: '',
        interfaceTotal: '',
        remark: '',
        ips: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 保存编辑
        saveFn () {
            this.$http({
                url: '/device/switch/edit/',
                method: 'POST',
                data: this.$data
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.editDeviceModal = false
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
        createVlanModal,
        createPortModal,
        datepicker,
        tabs: tabset,
        tab
    },
    vuex: {
        actions: {
            getFramesSeats,
            getOrigins
        },
        getters: {
            rooms: idcs,
            firms,
            origins1,
            origins2,
            statusArr: deviceStatus,
            frames,
            seats
        }
    },
    events: {
        'showEditDevice' (param) {
            this.$http({
                url: '/device/switch/get/?id=' + param,
                method: 'GET'
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.$data = Object.assign({}, origin, response.data)

                    this.id = param
                    this.editDeviceModal = true
                } else {
                    this.$dispatch('show-error')
                }
            })
        }
    },
    watch: {
        'room' (newVal, oldVal) {
            if (newVal) {
                if (oldVal) {
                    this.frame = ''
                    this.seat = ''
                }

                this.getFramesSeats(newVal, 'room')
            } else {
                this.frame = ''
                this.seat = ''
            }
        },
        'frame' (newVal, oldVal) {
            if (newVal) {
                if (oldVal) {
                    this.seat = ''
                }

                this.getFramesSeats(newVal, 'shelf')
            } else {
                this.seat = ''
            }
        },
        'origin1' (newVal, oldVal) {
            if (newVal) {
                if (oldVal) {
                    this.origin2 = ''
                }

                this.getOrigins(newVal)
            } else {
                this.origin2 = ''
            }
        },
        'editDeviceModal' (newVal) {
            if (!newVal) {
                this.origin1 = ''
                this.room = ''
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