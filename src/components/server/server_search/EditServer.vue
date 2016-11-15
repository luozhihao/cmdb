<!-- 编辑服务器 -->
<template>
    <modal :show.sync="editServerModal" effect="fade" width="1200px">
        <div slot="modal-header" class="modal-header">
            <button type="button" class="close" @click="editServerModal = false">
                <span>×</span>
            </button>
            <h4 class="modal-title">编辑服务器</h4>
        </div>
        <div slot="modal-body" class="modal-body min-height">
            <tabs :active="0">
                <tab header="服务器">
                    <form class="form-horizontal clearfix form-input">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="control-label col-sm-4">SN：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="sn">
                                </div>
                            </div>
                            <div class="form-group input-box">
                                <label class="control-label col-sm-4">类型：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <v-select :value.sync="serverType" :options="serverTypes" placeholder="请选择">
                                    </v-select>
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
                            <div class="form-group input-box">
                                <label class="control-label col-sm-4">状态：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <v-select :value.sync="status" :options="editStatusArr" placeholder="请选择">
                                    </v-select>
                                </div>
                            </div>
                            <div class="form-group input-box min-dropdown">
                                <label class="control-label col-sm-4">厂商：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <v-select :value.sync="firm" :options="firms" placeholder="请选择">
                                    </v-select>
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
                                <label class="control-label col-sm-4">用途分类：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <v-select :value.sync="serverUseType" :options="serverUseTypes" placeholder="请选择">
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
                        <div class="col-sm-3">
                           <div class="form-group">
                                <label class="control-label col-sm-4">设备编号：</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="serverNum" :readonly="true">
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="control-label col-sm-4">物理主机编号：</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="hostNum">
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
                                <label class="control-label col-sm-4">型号：<span class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="model">
                                </div>
                            </div>
                            <div class="form-group input-box">
                                <label class="control-label col-sm-4">接收人：</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="catcher">
                                </div>
                            </div>  
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="control-label col-sm-4">来源：<span class="text-danger">*</span></label>
                                <div class="col-sm-4 input-box pr0">
                                    <v-select :value.sync="origin1" :options="origins1" placeholder="请选择" class="fs12">
                                    </v-select>
                                </div>
                                <div class="col-sm-4 input-box pl0">
                                    <v-select :value.sync="origin2" :options="origins2" placeholder="请选择" class="fs12">
                                    </v-select>
                                </div>
                            </div>
                            <div class="form-group input-box">
                                <label class="control-label col-sm-4">共用产品：</label>
                                <div class="col-sm-8">
                                    <v-select :value.sync="serverUseProduct" :options="products" placeholder="请选择" multiple search>
                                    </v-select>
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
                            <div class="form-group">
                                <label class="control-label col-sm-4">所属部门：</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" :readonly="true" v-model="department">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-4">所属产品：</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" :readonly="true" v-model="product">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-4">运维负责人：</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" :readonly="true" v-model="maintainManager">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-4">备注：</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="remark">
                                </div>
                            </div>
                            <div class="form-group input-box">
                                <label class="control-label col-sm-4">价格：</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="price">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="control-label col-sm-4">所属Set：</label>
                                <div class="col-sm-8">
                                    <textarea rows="4" class="form-control" :readonly="true" v-model="set"></textarea> 
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-4">所属Module：</label>
                                <div class="col-sm-8">
                                    <textarea rows="4" class="form-control" :readonly="true" v-model="module"></textarea> 
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-4">IP：</label>
                                <div class="col-sm-8">
                                    <textarea rows="8" class="form-control" :readonly="true" v-model="ips"></textarea> 
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="text-center mt30 mb20">
                        <button
                            v-if="canSave"
                            type="button" 
                            class="btn btn-default"
                            @click="saveFn"
                            :disabled="sn.trim() && origin1 && origin2 && room && frame && seat && model && status && serverType && firm && serverUseType ? false : true"
                        >
                            保存
                        </button>
                        <button type="button" class="btn btn-default" @click='editServerModal = false'>取消</button>
                    </div>
                </tab>
                <tab header="端口号">
                    <table class="table table-hover table-scroll">
                        <thead>
                            <tr>
                                <th>端口号</th>
                                <th>IP</th>
                                <th>MAC</th>
                                <th>速率</th>
                                <th>状态</th>
                                <th>用途</th>
                                <th>对端设备</th>
                                <th>对端设备VLAN</th>
                                <th>对端设备端口</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="port in ports" v-show="ports.length !== 0">
                                <td v-text="port.portNum" :title="port.portNum"></td>
                                <td v-text="port.ip" :title="port.ip"></td>
                                <td v-text="port.mac" :title="port.mac"></td>
                                <td v-text="port.speed" :title="port.speed"></td>
                                <td v-text="port.status" :title="port.status"></td>
                                <td v-text="port.use" :title="port.use"></td>
                                <td v-text="port.device" :title="port.device"></td>
                                <td v-text="port.deviceVlan" :title="port.deviceVlan"></td>
                                <td v-text="port.devicePort" :title="port.devicePort"></td>
                            </tr>
                            <tr v-show="ports.length === 0" class="text-center">
                                <td colspan="9">暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                </tab>
            </tabs>
        </div>
        <div slot="modal-footer" class="modal-footer">
        </div>
    </modal>
</template>

<script>
import { modal, tabset, tab } from 'vue-strap'
import datepicker from '../../global/Datepicker.vue'
import vSelect from '../../global/Select.vue'
import { getServerSearch, getFramesSeats, getOrigins } from '../../../vuex/action.js'
import { idcs, frames, seats, serverTypes, firms, origins1, origins2, serverUseTypes, products } from '../../../vuex/getters.js'

let origin = {
        editServerModal: false,
        canSave: true,
        ports: [],
        id: null,
        autoId: null,
        serverNum: '',
        sn: '',
        room: '',
        frame: '',
        seat: '',
        origin1: '',
        origin2: '',
        firm: '',
        editStatusArr: [],
        status: '',
        addTime: '',
        factoryTime: '',
        procureTime: '',
        model: '',
        shelfLife: '',
        serverType: '',
        hostNum: '',
        assetNum: '',
        financeNum: '',
        invoiceNum: '',
        voltage: '',
        electric: '',
        power: '',
        remark: '',
        department: '',
        product: '',
        maintainManager: '',
        set: '',
        module: '',
        ips: '',
        serverUseProduct: [],
        serverUseType: '',
        usage: '',
        catcher: '',
        price: ''
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
                url: '/device/server/edit/',
                method: 'POST',
                data: this.$data
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.editServerModal = false
                    this.$data = Object.assign({}, init)

                    this.$dispatch('refresh')       
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error')
                }
            })
        },

        // 加载数据
        loadData (idNum, canSave = false, autoId = null) {
            this.$http({
                url: '/device/server/get/?id=' + idNum,
                method: 'GET'
            })
            .then(repsonse => {
                if (repsonse.data.code === 200) {
                    this.$data = Object.assign({}, origin, repsonse.data)

                    this.canSave = canSave
                    this.id = idNum
                    this.autoId = autoId
                    this.editServerModal = true
                } else {
                    this.$dispatch('show-error')
                }
            })
        }
    },
    components: {
        modal,
        vSelect,
        datepicker,
        tabs: tabset,
        tab
    },
    vuex: {
        actions: {
            getFramesSeats,
            getOrigins,
            getServerSearch
        },
        getters: {
            rooms: idcs,
            frames,
            seats,
            origins1,
            origins2,
            serverTypes,
            firms,
            serverUseTypes,
            products
        }
    },
    ready () {
        this.getServerSearch()
    },
    events: {
        'showEditServer' (param) {
            this.loadData(param, true)
        },
        'viewEditServer' (param) {
            this.loadData(param, false)
        },
        'showEditAuto' (param) {
            this.loadData(param.serverId, true, param.autoId)
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
                this.getFramesSeats(newVal, 'room')
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
                this.getFramesSeats(newVal, 'shelf')
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
                this.getOrigins(newVal)
            }
        },
        'editServerModal' (newVal) {
            if (!newVal) {
                this.origin1 = ''
                this.room = ''
            }
        }
    }
}
</script>

<style scoped>
label.col-sm-4 {
    padding-right: 5px;
    padding-left: 5px;
}

.min-height {
    min-height: 500px;
}
</style>