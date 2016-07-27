<!-- 服务器查询 -->
<template>
    <div class="clearfix">
        <form :class="['form-horizontal', 'clearfix', 'form-search', {'form-min': isModal}]" name="serverForm" method="POST">
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">SN：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.sn" @click="showBroad('param.sn')">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">服务器编号：</label>
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
                        <v-select :value.sync="param.product" :options="products" placeholder="请选择" :search="true" :disabled="isModal">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">运维负责人：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.maintainManager">
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
                        <input type="text" class="form-control" v-model="param.set">
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
                        <input type="text" class="form-control" placeholder="模糊" v-model="param.model">
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
                        <input type="text" class="form-control" v-model="param.module">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default" @click="refresh">
                查询
            </button>
            <span v-if="!isModal">
                <button v-if="perm.新增服务器 || perm.all" type="button" class="btn btn-default" @click="$broadcast('showCreateServer')">
                    新增服务器
                </button>
                <button v-if="perm.分配到产品 || perm.all" type="button" class="btn btn-default" @click="dispatchFn">
                    分配到产品
                </button>
                <button v-if="perm.批量修改服务器 || perm.all" type="button" class="btn btn-default" @click="batchEdit">
                    批量修改
                </button>
                <button v-if="perm.导出服务器 || perm.all" type="button" class="btn btn-default" @click="exportFn">
                    导出
                </button>
                <dropdown v-el:recoverconfirm v-if="perm.应用回收 || perm.all">
                    <button type="button" class="btn btn-default" data-toggle="dropdown">
                        应用回收
                        <span class="caret"></span>
                    </button>
                    <div slot="dropdown-menu" class="dropdown-menu pd20">
                        <button type="button" class="btn btn-danger btn-block" @click="checkedFn('/node/recover/', 'recoverconfirm')">确定</button>
                        <button type="button" class="btn btn-default btn-block" @click="cancelFn('recoverconfirm')">取消</button>
                    </div>
                </dropdown>
                <dropdown v-el:backconfirm v-if="perm['退还IDC'] || perm.all">
                    <button type="button" class="btn btn-default" data-toggle="dropdown">
                        退还IDC
                        <span class="caret"></span>
                    </button>
                    <div slot="dropdown-menu" class="dropdown-menu pd20">
                        <button type="button" class="btn btn-danger btn-block" @click="checkedFn('/node/backIDC/', 'backconfirm')">确定</button>
                        <button type="button" class="btn btn-default btn-block" @click="cancelFn('backconfirm')">取消</button>
                    </div>
                </dropdown>
            </span>
            <span v-if="isModal">
                <button type="button" class="btn btn-default" @click="getChecked">
                    批量添加
                </button>
            </span>
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
            <div class="table-wrapper">
                <table :class="['table', 'table-hover', 'table-bordered', {'table-small': isModal}]">
                    <thead>
                        <tr>
                            <th width="2%"><input type="checkbox" v-model="checkedAll"></th>
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
                            <td :colspan="titles.length + 1">暂无数据</td>
                        </tr>
                    </tbody>
                </table>
                <spinner id="spinner-box" :size="md" :fixed="false" 
                     text="数据加载中，请稍后..." v-ref:spinner>
                </spinner>
            </div>
        </div>
        <div class="pull-right mt30">
            <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
        </div>

        <create-server-modal></create-server-modal>
        <batch-edit-modal></batch-edit-modal>
        <edit-server-modal></edit-server-modal>
        <dispatch-modal></dispatch-modal>
    </div>
</template>

<script>
import { dropdown, spinner } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import createServerModal from './createServer.vue'
import batchEditModal from './BatchEdit.vue'
import editServerModal from './EditServer.vue'
import dispatchModal from './Dispatch.vue'
import vSelect from '../../global/Select.vue'
import calendar from '../../global/Calendar.vue'
import { getServerSearch, getFramesSeats, getOrigins } from '../../../vuex/action.js'
import { idcs, frames, products, serverTypes, departments, systems, serverStatus, firms, origins1, origins2, perm } from '../../../vuex/getters.js'

export default {
    data () {
        return {
            isModal: false,
            checkedAll: false,
            checkedIds: [],
            titles: [],
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/device/server/query/',
            param: {
                sn: '',
                serverNum: '',
                assetNum: '',
                financeNum: '',
                invoiceNum: '',
                room: '',
                frame: '',
                ip: '',
                firm: '',
                serverType: '',
                status: '',
                model: '',
                system: '',
                origin1: '',
                origin2: '',
                addTime: '',
                factoryTime: '',
                procureTime: '',
                department: '',
                product: '',
                maintainManager: '',
                module: '',
                set: ''
            },
            checkArr: [
                {label: 'SN', value: 'sn', checked: true},
                {label: '来源', value: 'origin', checked: true},
                {label: 'IP', value: 'ip', checked: true},
                {label: '类型', value: 'serverType', checked: true},
                {label: '操作系统', value: 'system', checked: true},
                {label: '状态', value: 'status', checked: true},
                {label: '所在机房', value: 'room', checked: true},
                {label: '所在机架', value: 'frame', checked: true},
                {label: '所在机位', value: 'seat', checked: true},
                {label: '产品', value: 'product', checked: true},
                {label: 'set', value: 'set', checked: true},
                {label: 'module', value: 'module', checked: true},
                {label: '运维负责人', value: 'maintainManager', checked: true},
                {label: '入库时间', value: 'addTime', checked: false},
                {label: '出厂时间', value: 'factoryTime', checked: false},
                {label: '采购时间', value: 'procureTime', checked: false},
                {label: '型号', value: 'model', checked: true},
                {label: '厂商', value: 'firm', checked: true},
                {label: '物理主机编号', value: 'hostNum', checked: false},
                {label: '资产编号', value: 'assetNum', checked: false},
                {label: '财务编号', value: 'financeNum', checked: false},
                {label: '发票编号', value: 'invoiceNum', checked: false},
                {label: '质保期限', value: 'shelfLife', checked: false},
                {label: '公司内网', value: 'companyIntnet', checked: true},
                {label: '机房内网', value: 'roomIntnet', checked: true},
                {label: '机房外网', value: 'roomOutnet', checked: true},
                {label: 'CPU', value: 'cpu', checked: true},
                {label: '内存', value: 'mem', checked: true},
                {label: '备注', value: 'remark', checked: true}
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
            this.$refs.spinner.show()
            this.checkedIds = []
            this.$refs.page.refresh()
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
            } else {
                this.$dispatch('show-notify', '请选择修改项')
            }
        },

        // 分配到产品
        dispatchFn () {
            let _this = this

            if (this.checkedIds.length) {
                this.$broadcast('showDispatchModal', _this.checkedIds)
            } else {
                this.$dispatch('show-notify', '请选择分配项')
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

        // 导出
        exportFn () {
            let form = document.serverForm,
                arr = []

            for (let key in this.$data.param) {
                let obj = key + '=' + this.$data.param[key]

                arr.push(obj)
            }

            form.action='/device/server/export/?' + arr.join('&')

            form.submit()
        },

        // 发送选中列表至业务树
        getChecked () {
            let _this = this

            if (this.checkedIds.length) {
                this.$dispatch('getServerData', _this.checkedIds)
            } else {
                this.$dispatch('show-notify', '请选择分配项')
            }
        },

        // 应用回收、退还IDC
        checkedFn (url, name) {
            if (this.checkedIds.length) {
                this.$http({
                    url: url,
                    method: 'POST',
                    data: {
                        checkedIds: this.checkedIds
                    }
                })
                .then(response => {
                    if (response.data.code === 200) {
                        this.checkedIds = []
                        this.refresh()

                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error')
                    }
                })
            } else {
                this.$dispatch('show-notify', '请选择操作项')
            }

            this.$els[name].classList.toggle('open')
        },

        // 取消confirm
        cancelFn (name) {
            this.$els[name].classList.toggle('open')
        }
    },
    components: {
        bootPage,
        createServerModal,
        batchEditModal,
        editServerModal,
        vSelect,
        calendar,
        dropdown,
        spinner,
        dispatchModal
    },
    vuex: {
        actions: {
            getServerSearch,
            getFramesSeats,
            getOrigins
        },
        getters: {
            perm,
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
        this.$refs.spinner.show()
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

        // 获取表格数据
        'data' (param) {
            this.tableList = param.data
            this.checkedIds = []
            this.$refs.spinner.hide()
        },

        // 刷新表格
        'refresh' () {
            this.refresh()
        },

        // 获取输入框内容
        'getTxt' (param) {
            let obj = param.name.split('.')

            this[obj[0]][obj[1]] = param.val
        },

        // 接收业务树数据
        'showServerModal' (param) {
            this.isModal = true
            this.param.product = param
            this.refresh()
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
</style>
