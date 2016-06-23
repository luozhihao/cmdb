<!-- 机房查询 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">SN：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.sn" @click="showBroad('param.sn')">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">设备编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.deviceNum" @click="showBroad('param.deviceNum')">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">采购时间：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control time-input fs12" onfocus="this.blur()" @click="showCalendar('show2', $event)" v-model="param.procureTime" placeholder="选择范围">
                        <calendar :show.sync="show2" :value.sync="param.procureTime" :x="x" :y="y" :range="range" :type="type"></calendar>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">资产编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.assetNum" @click="showBroad('param.assetNum')">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">机房：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.room" :options="rooms" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">入库时间：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control time-input fs12" onfocus="this.blur()" @click="showCalendar('show1', $event)" v-model="param.addTime" placeholder="选择范围">
                        <calendar :show.sync="show1" :value.sync="param.addTime" :x="x" :y="y" :range="range" :type="type"></calendar>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">发票编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.invoiceNum" @click="showBroad('param.invoiceNum')">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">厂商：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.firm" :options="firms" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">出厂时间：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control time-input fs12" onfocus="this.blur()" @click="showCalendar('show3', $event)" v-model="param.factoryTime" placeholder="选择范围">
                        <calendar :show.sync="show3" :value.sync="param.factoryTime" :x="x" :y="y" :range="range" :type="type"></calendar>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">财务编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.financeNum" @click="showBroad('param.financeNum')">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">来源：</label>
                    <div class="col-sm-4 input-box pr0">
                        <v-select :value.sync="param.origin1" :options="origins1" placeholder="请选择">
                        </v-select>
                    </div>
                    <div class="col-sm-4 input-box pl0">
                        <v-select :value.sync="param.origin2" :options="origins2" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">型号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.model" placeholder="模糊">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default">
                查询
            </button>
            <button type="button" class="btn btn-default" @click="$broadcast('showCreate')">
                新增交换机
            </button>
            <button type="button" class="btn btn-default" @click="batchEdit">
                批量修改
            </button>
            <dropdown v-el:confirm>
                <button type="button" class="btn btn-default" data-toggle="dropdown">
                    批量退库
                    <span class="caret"></span>
                </button>
                <div slot="dropdown-menu" class="dropdown-menu pd20">
                    <button type="button" class="btn btn-danger btn-block mt20" @click="deleteFn">确定</button>
                    <button type="button" class="btn btn-default btn-block" @click="cancelFn">取消</button>
                </div>
            </dropdown>
            <button type="button" class="btn btn-default">
                导出
            </button>
        </div>
        <div class="text-center table-title">
            查询结果
            <div class="pull-left">
                <dropdown>
                    <button type="button" class="btn btn-default set-btn" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-cog"></span>
                    </button>
                    <div slot="dropdown-menu" class="dropdown-menu dropdown-width">
                        <ul class="pull-left dropdown-width">
                            <li v-for="check in checkArr" class="pull-left dropdown-li" track-by="$index">
                                <input :id="'fliter' + $index" type="checkbox" :checked="check.checked" @click="fliter($index)"> 
                                <label :for="'fliter' + $index" v-text="check.label"></label>
                            </li>
                        </ul>
                    </div>
                </dropdown>
            </div>
        </div>
        <div class="table-box">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th width="3%"><input type="checkbox" v-model="checkedAll"></th>
                        <th v-for="title in titles" v-text="title"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                        <td><input type="checkbox" :id="list.id" :value="list.id" v-model="checkedIds"></td>
                        <td v-for="value in valueArr" v-if="value === 'deviceNum'">
                            <a class="pointer" v-if="value === 'deviceNum'" v-text="list[value]" @click="$broadcast('showEditDevice', list.id)"></a>
                        </td>
                        <td v-for="value in valueArr" :title="list[value]" v-text="list[value]" v-if="value !== 'deviceNum'">
                        </td>
                    </tr>
                    <tr class="text-center" v-show="tableList.length === 0">
                        <td :colspan="titles.length">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="clearfix mt30">
            <boot-page :async="false" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
        </div>

        <create-modal></create-modal>
        <batch-edit-modal></batch-edit-modal>
        <edit-device-modal></edit-device-modal>
    </div>
</template>

<script>
import { dropdown } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import createModal from './CreateDevice.vue'
import batchEditModal from './BatchEdit.vue'
import editDeviceModal from './EditDevice.vue'
import vSelect from '../../global/Select.vue'
import calendar from '../../global/Calendar.vue'
import { getDeviceSearch, getOrigins } from '../../../vuex/action.js'
import { idcs, firms, origins1, origins2 } from '../../../vuex/getters.js'

let origin = {
        checkedAll: false,
        checkedIds: [],
        titles: [],
        tableList: [
            {id: 1, deviceNum: 'SGSW00001', deviceName: '华为 DS-6510B', machineName: 'none', SN: 'BRCBRW1906K01R', model: 'DS-6510B', deviceType: '交换机', firm: '华为', deviceStatus: '已启用', room: '北京亦庄联通机房', frame: 'L4M1-IDC-C003', seats: '46U', origin: '蜗牛公司'}
        ],
        lenArr: [10, 50, 100],
        pageLen: 5,
        url: '',
        param: {
            sn: '',
            deviceNum: '',
            assetNum: '',
            financeNum: '',
            invoiceNum:'',
            room: '',
            firm: '',
            origin1: '',
            origin2: '',
            addTime: '',
            procureTime: '',
            factoryTime: '',
            model: ''
        },
        checkArr: [
            {label: '设备名称', value: 'deviceName', checked: true},
            {label: '机器名', value: 'machineName', checked: true},
            {label: 'SN', value: 'sn', checked: true},
            {label: '型号', value: 'model', checked: true},
            {label: '设备类型', value: 'deviceType', checked: true},
            {label: '厂商', value: 'firm', checked: true},
            {label: '设备状态', value: 'deviceStatus', checked: true},
            {label: '所在机房', value: 'room', checked: true},
            {label: '所在机架', value: 'frame', checked: true},
            {label: '所在机位', value: 'seats', checked: true},
            {label: '来源', value: 'origin', checked: true}
        ],
        valueArr: [],
        show1: false,
        show2: false,
        show3: false,
        type: 'date', 
        x: 0,
        y: 0,
        range: true
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 刷新数据
        refresh () {
            this.checkedIds = []
            this.$broadcast('refresh')
        },

        // 筛选
        fliter (index) {
            this.checkArr[index].checked ? this.checkArr[index].checked = false : this.checkArr[index].checked = true

            this.originFilter()
        },

        // 初始化筛选
        originFilter () {
            let _this = this

            this.titles = []
            this.valueArr = []

            this.checkArr.forEach((e) => {
                if (e.checked) {
                    _this.titles.push(e.label)
                    _this.valueArr.push(e.value)
                }
            })

            this.titles.unshift('设备编号')
            this.valueArr.unshift('deviceNum')
        },

        // 批量修改
        batchEdit () {
            let _this = this

            if (this.checkedIds.length) {
                this.$broadcast('batchEdit', _this.checkedIds)
            }
        },

        // 输入面板
        showBroad (target) {
            let obj = target.split('.')

            let param = {
                value: this[obj[0]][obj[1]],
                name: target
            }

            this.$dispatch('showBroad', param)
        },

        // 显示日期控件
        showCalendar (name, e) {
            e.stopPropagation();

            var that = this;
            that[name] = true;
            that.x = e.target.offsetLeft;
            that.y = e.target.offsetTop + e.target.offsetHeight + 8;

            var bindHide = function(e) {
                e.stopPropagation();
                that[name] = false;
                document.removeEventListener('click', bindHide, false);
            };

            setTimeout(function() {
                document.addEventListener('click', bindHide, false);
            }, 500);
        },

        // 批量退库
        deleteFn () {
            if (this.checkedIds.length) {
                this.$http({
                    url: '/idc/delete/',
                    method: 'POST',
                    data: {
                        checkedIds: this.checkedIds
                    }
                })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.checkedIds = []
                        this.refresh()

                        this.$dispatch('show-success', '退库成功')
                    } else {
                        this.$dispatch('show-success', '退库失败了')
                    }
                })
            } else {
                this.$dispatch('show-notify', '请选择退库项')
            }

            this.$els.confirm.classList.toggle('open')
        },

        // 取消删除
        cancelFn () {
            this.$els.confirm.classList.toggle('open')
        }
    },
    components: {
        bootPage,
        createModal,
        batchEditModal,
        editDeviceModal,
        vSelect,
        calendar,
        dropdown
    },
    vuex: {
        actions: {
            getDeviceSearch,
            getOrigins
        },
        getters: {
            rooms: idcs,
            firms,
            origins1,
            origins2
        }
    },
    ready () {
        this.getDeviceSearch()
        this.originFilter()
    },
    watch: {
        'checkedAll' (newVal) {
            if (newVal) {
                if (this.checkedIds.length !== this.tableList.length) {
                    let _this = this

                    _this.checkedIds = []
                    _this.tableList.forEach(function(e) {
                        _this.checkedIds.push(e.id)
                    })
                }
            } else {
                if (this.checkedIds.length === this.tableList.length) {
                    this.checkedIds = []
                }
            }
        },
        'checkedIds' (newVal) {
            if (newVal.length === this.tableList.length && this.tableList.length !== 0) {
                this.checkedAll = true
            } else {
                this.checkedAll = false
            }
        },
        'param.origin1' (newVal) {
            this.param.origin2 = ''

            this.getOrigins(newVal)
        }
    },
    events: {
        /*// 获取表格数据
        'data' (param) {
            this.tableList = param.data
            this.checkedIds = []
        },

        // 刷新表格
        'refresh' () {
            this.refresh()
        },*/

        // 获取输入框内容
        'getTxt' (param) {
            let obj = param.name.split('.')

            this[obj[0]][obj[1]] = param.val
        }
    }
}
</script>

<style scoped>
.dropdown-width {
    width: 500px;
}

.dropdown-li {
    width: 50%;
}

.pd20 {
    padding: 20px;
}

.mt20 {
    margin-top: 20px;
}
</style>
