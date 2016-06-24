<!-- 服务器查询 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">SN：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.sn" @click="showBroad('param.sn')">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">设备编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.serverNum" @click="showBroad('param.serverNum')">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">所在机房：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.room" :options="rooms" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">入库时间：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control time-input fs12" onfocus="this.blur()" @click="showCalendar('show1', $event)" v-model="param.addTime" placeholder="选择范围">
                        <calendar :show.sync="show1" :value.sync="param.addTime" :x="x" :y="y" :range="range" :type="type"></calendar>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">所属产品：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.product" :options="products" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">运维负责人：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">资产编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.assetNum" @click="showBroad('param.assetNum')">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.serverType" :options="serverTypes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">所在机架：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.frame" :options="frames" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">出厂时间：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control time-input fs12" onfocus="this.blur()" @click="showCalendar('show3', $event)" v-model="param.factoryTime" placeholder="选择范围">
                        <calendar :show.sync="show3" :value.sync="param.factoryTime" :x="x" :y="y" :range="range" :type="type"></calendar>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">所属部门：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.department" :options="departments" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">IP：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.ip" @click="showBroad('param.ip')">
                    </div>
                </div>
            </div>
            <div class="col-sm-3 input-box">
                <div class="form-group">
                    <label class="control-label col-sm-4">财务编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.financeNum" @click="showBroad('param.financeNum')">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">操作系统：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.system" :options="systems" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">来源：</label>
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
                    <label class="control-label col-sm-4">采购时间：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control time-input fs12" onfocus="this.blur()" @click="showCalendar('show2', $event)" v-model="param.procureTime" placeholder="选择范围">
                        <calendar :show.sync="show2" :value.sync="param.procureTime" :x="x" :y="y" :range="range" :type="type"></calendar>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">Set：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">发票编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.invoiceNum" @click="showBroad('param.invoiceNum')">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">状态：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.status" :options="statusArr" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">型号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="模糊" v-model="">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">厂商：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.firm" :options="firms" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">Module：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default">
                查询
            </button>
            <button type="button" class="btn btn-default" @click="$broadcast('showCreateServer')">
                新增服务器
            </button>
            <button type="button" class="btn btn-default">
                分配到产品
            </button>
            <button type="button" class="btn btn-default"  @click="batchEdit">
                批量修改
            </button>
            <button type="button" class="btn btn-default">
                导出
            </button>
            <button type="button" class="btn btn-default">
                应用回收
            </button>
            <button type="button" class="btn btn-default">
                退换IDC
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
                        <td v-for="value in valueArr" v-if="value === 'serverNum'">
                            <a class="pointer" v-if="value === 'serverNum'" v-text="list[value]" @click="$broadcast('showEditServer', list.id)"></a>
                        </td>
                        <td v-for="value in valueArr" :title="list[value]" v-text="list[value]" v-if="value !== 'serverNum'">
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

        <create-server-modal></create-server-modal>
        <batch-edit-modal></batch-edit-modal>
        <edit-server-modal></edit-server-modal>
    </div>
</template>

<script>
import { dropdown } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import createServerModal from './createServer.vue'
import batchEditModal from './BatchEdit.vue'
import editServerModal from './EditServer.vue'
import vSelect from '../../global/Select.vue'
import calendar from '../../global/Calendar.vue'
import { getServerSearch, getFramesSeats, getOrigins } from '../../../vuex/action.js'
import { idcs, frames, products, serverTypes, departments, systems, serverStatus, firms, origins1, origins2 } from '../../../vuex/getters.js'

export default {
    data () {
        return {
            checkedAll: false,
            checkedIds: [],
            titles: [],
            tableList: [
                {id: 1, serverNum: 'SGSW00001', ip: '117.121.13.56', sn: 'BRCBRW1906K01R', serverType: '物理机', system: 'windows 2003x64', status: '待运营', room: '北京亦庄联通机房', frame: 'L4M1-IDC-C003', seat: '46U'}
            ],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '',
            param: {
                serverNum: '',
                sn: '',
                assetNum: '',
                financeNum: '',
                invoiceNum: '',
                room: '',
                frame: '',
                ip: '',
                firm: '',
                serverType: '',
                status: '',
                system: '',
                origin1: '',
                origin2: '',
                addTime: '',
                factoryTime: '',
                procureTime: '',
                department: '',
                product: ''
            },
            checkArr: [
                {label: 'IP', value: 'ip', checked: true},
                {label: 'SN', value: 'sn', checked: true},
                {label: '类型', value: 'serverType', checked: true},
                {label: '操作系统', value: 'system', checked: true},
                {label: '状态', value: 'status', checked: true},
                {label: '所在机房', value: 'room', checked: true},
                {label: '所在机架', value: 'frame', checked: true},
                {label: '所在机位', value: 'seat', checked: true}
            ],
            valueArr: [],
            show1: false,
            show2: false,
            show3: false,
            type: 'date', 
            x: 0,
            y: 0,
            range: true
        }
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

            this.titles.unshift('服务器编号')
            this.valueArr.unshift('serverNum')
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
        createServerModal,
        batchEditModal,
        editServerModal,
        vSelect,
        calendar,
        dropdown
    },
    vuex: {
        actions: {
            getServerSearch,
            getFramesSeats,
            getOrigins
        },
        getters: {
            rooms: idcs,
            frames,
            products,
            serverTypes,
            departments,
            systems,
            origins1,
            origins2,
            statusArr: serverStatus,
            firms
        }
    },
    ready () {
        this.getServerSearch()
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
        'param.room' (newVal) {
            this.param.frame = ''

            this.getFramesSeats(newVal, 'room')
        },
        'param.origin1' (newVal) {
            this.param.origin2 = ''

            this.getOrigins(newVal)
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
.dropdown-width {
    width: 500px;
}

.dropdown-li {
    width: 50%;
}
</style>
