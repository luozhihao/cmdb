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
                        <v-select :value.sync="param.room" :options="rooms" placeholder="请选择">
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
            <button type="button" class="btn btn-default">
                批量退库
            </button>
            <button type="button" class="btn btn-default">
                导出
            </button>
        </div>
        <div class="text-center table-title">
            查询结果
            <div class="pull-right">
                <button type="button" class="btn btn-default set-btn">
                    <span class="glyphicon glyphicon-cog"></span>
                </button>
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
                        <td v-show="list.deviceNum"><a class="pointer" v-text="list.deviceNum" @click="$broadcast('showEditDevice', list.id)"></a></td>
                        <td :title="list.deviceName" v-text="list.deviceName" v-show="list.deviceName"></td>
                        <td :title="list.machineName" v-text="list.machineName" v-show="list.machineName"></td>
                        <td :title="list.SN" v-text="list.SN" v-show="list.SN"></td>
                        <td :title="list.model" v-text="list.model" v-show="list.model"></td>
                        <td :title="list.deviceType" v-text="list.deviceType" v-show="list.deviceType"></td>
                        <td :title="list.firm" v-text="list.firm" v-show="list.firm"></td>
                        <td :title="list.deviceStatus" v-text="list.deviceStatus" v-show="list.deviceStatus"></td>
                        <td :title="list.room" v-text="list.room" v-show="list.room"></td>
                        <td :title="list.frame" v-text="list.frame" v-show="list.frame"></td>
                        <td :title="list.seats" v-text="list.seats" v-show="list.seats"></td>
                        <td :title="list.origin" v-text="list.origin" v-show="list.origin"></td>
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
import bootPage from '../../global/BootPage.vue'
import createModal from './CreateDevice.vue'
import batchEditModal from './BatchEdit.vue'
import editDeviceModal from './EditDevice.vue'
import vSelect from '../../global/Select.vue'
import calendar from '../../global/Calendar.vue'

let origin = {
        checkedAll: false,
        checkedIds: [],
        titles: ['设备编号', '设备名称', '机器名', 'SN', '型号', '设备类型', '厂商', '设备状态', '所在机房', '所在机架', '所在机位', '来源'],
        tableList: [
            {id: 1, deviceNum: 'SGSW00001', deviceName: '华为 DS-6510B', machineName: 'none', SN: 'BRCBRW1906K01R', model: 'DS-6510B', deviceType: '交换机', firm: '华为', deviceStatus: '已启用', room: '北京亦庄联通机房', frame: 'L4M1-IDC-C003', seats: '46U', origin: '蜗牛公司'}
        ],
        lenArr: [10, 50, 100],
        pageLen: 5,
        url: '',
        rooms: [],
        firms: [],
        origins1: [],
        origins2: [],
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
            this.$broadcast('refresh')
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
        }
    },
    components: {
        bootPage,
        createModal,
        batchEditModal,
        editDeviceModal,
        vSelect,
        calendar
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
        }
    },
    events: {
        'getTxt' (param) {
            let obj = param.name.split('.')

            this[obj[0]][obj[1]] = param.val
        }
    }
}
</script>

<style scoped>

</style>
