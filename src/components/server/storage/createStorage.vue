<!-- 新增存储 -->
<template>
    <modal :show.sync="creatServerModal" effect="fade" width="1200px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增存储</h4>
        </div>
        <div slot="modal-body" class="modal-body" style="min-height: 450px;">
            <form class="form-horizontal clearfix form-input">
                <form class="form-horizontal clearfix form-input">
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="control-label col-sm-4">存储编号：</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="hostNum">
                            </div>
                        </div>
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">厂商：<span class="text-danger">*</span></label>
                            <div class="col-sm-8">
                                <v-select :value.sync="firm" :options="firms" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>   
                        <div class="form-group">
                            <label class="control-label col-sm-4">型号：<span class="text-danger">*</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="model">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4">SN：<span class="text-danger">*</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="sn">
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
                            <label class="control-label col-sm-4">状态：<span class="text-danger">*</span></label>
                            <div class="col-sm-8">
                                <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                         <div class="form-group input-box">
                            <label class="control-label col-sm-4">机房：<span class="text-danger">*</span></label>
                            <div class="col-sm-8">
                                <v-select :value.sync="room" :options="rooms" placeholder="请选择" :search="true">
                                </v-select>
                            </div>
                        </div>
                        <div class="form-group input-box min-dropdown">
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
                            <label class="control-label col-sm-4">备注：</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="remark">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
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
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">价格：</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="price">
                            </div>
                        </div>  
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">接收人：</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="catcher">
                            </div>
                        </div>
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">成本中心：<span class="text-danger">*</span></label>
                            <div class="col-sm-8">
                                <v-select :value.sync="costCenter" :options="costCenters" placeholder="请选择" :search="true">
                                </v-select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4">公司内网：<span class="text-danger">(选一)</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="companyIntnet" onfocus="this.blur()" @click="showBroad('companyIntnet')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4">机房内网：<span class="text-danger">(选一)</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="roomIntnet" onfocus="this.blur()" @click="showBroad('roomIntnet')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4">机房外网：</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="roomOutnet" onfocus="this.blur()" @click="showBroad('roomOutnet')">
                            </div>
                        </div>
                    </div>
                </form>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button 
                type="button" 
                class="btn btn-default" 
                @click="saveFn"
                :disabled="sn.trim() && origin1 && origin2 && room && frame && seat && model && status && firm && costCenter && (companyIntnet.trim() || roomIntnet.trim()) ? false : true"
            >
                保存
            </button>
            <button type="button" class="btn btn-default" @click='creatServerModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import datepicker from '../../global/Datepicker.vue'
import vSelect from '../../global/Select.vue'
import { getFramesSeats, getOrigins } from '../../../vuex/action.js'
import { idcs, frames, seats, addStatusArr, firms, origins1, origins2, products, costCenters } from '../../../vuex/getters.js'

let origin = {
        creatServerModal: false,
        autoId: null,
        sn: '',
        room: '',
        frame: '',
        seat: '',
        origin1: '',
        origin2: '',
        firm: '',
        status: '',
        addTime: '',
        factoryTime: '',
        procureTime: '',
        model: '',
        shelfLife: '',
        hostNum: '',
        assetNum: '',
        financeNum: '',
        invoiceNum: '',
        companyIntnet: '',
        roomIntnet: '',
        roomOutnet: '',
        remark: '',
        catcher: '',
        price: '',
        costCenter: 'y3cAAAAABrHM567U',
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 创建服务器
        saveFn () {
            this.$http({
                url: '/device/storage/add/',
                method: 'POST',
                data: this.$data
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.creatServerModal = false
                    this.$data = Object.assign({}, init)

                    this.$dispatch('refresh')
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error', response.data.msg)
                }
            })
        },

        // 输入面板
        showBroad (target) {
            let param = {
                value: this[target],
                name: target,
                types: 1
            }

            this.$dispatch('showBroad', param)
        } 
    },
    components: {
        modal,
        vSelect,
        datepicker
    },
    vuex: {
        actions: {
            getFramesSeats,
            getOrigins
        },
        getters: {
            rooms: idcs,
            frames,
            seats,
            origins1,
            origins2,
            statusArr: addStatusArr,
            firms,
            products,
            costCenters
        }
    },
    ready () {

    },
    events: {
        'showCreateServer' (param) {
            if (param.length === 1) {
                this.$http({
                    url: '/device/storage/get/?id=' + param[0],
                    method: 'GET'
                })
                .then(repsonse => {
                    if (repsonse.data.code === 200) {
                        const {sn, origin1, origin2, room, frame, seat, model, firm, shelfLife, hostNum, assetNum, financeNum, invoiceNum, catcher, companyIntnet, roomIntnet, roomOutnet, costCenter} = repsonse.data

                        this.sn = sn
                        this.origin1 = origin1
                        this.origin2 = origin2
                        this.room = room
                        this.frame = frame
                        this.seat = seat
                        this.model = model
                        this.firm = firm
                        this.shelfLife = shelfLife
                        this.hostNum = hostNum
                        this.assetNum = assetNum
                        this.financeNum = financeNum
                        this.invoiceNum = invoiceNum
                        this.catcher = catcher
                        this.companyIntnet = companyIntnet
                        this.roomIntnet = roomIntnet
                        this.roomOutnet = roomOutnet
                        this.costCenter = costCenter
                        this.status = '1'
                    } else {
                        this.$dispatch('show-error')
                    }
                })
            } else if (param.length > 1) {
                this.$dispatch('show-notify', '无法复制, 请选择一个操作对象')
            }

            this.creatServerModal = true
        },
        'getTxt2' (param) {
            let obj = param.name.split('.')

            this[obj[0]] = param.val
        },
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
        'creatServerModal' (newVal) {
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
    min-height: 550px;
}
</style>