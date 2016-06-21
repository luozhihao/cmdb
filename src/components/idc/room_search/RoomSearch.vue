<!-- 机房查询 -->
<template>
    <div>  
        <div class="text-center mb20">
            <v-select :value.sync="dimension" :options="dimensions" placeholder="请选择视角">
            </v-select>
        </div>
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">机房：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.idc" :options="idcs" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">状态：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.status" :options="statusArr" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default">
                查询
            </button>
            <button type="button" class="btn btn-default" @click="$broadcast('showCreate')">
                新增机房
            </button>
            <button type="button" class="btn btn-default">
                批量删除
            </button>
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

                        <td v-for="value in valueArr" v-if="value === 'idcName' || value === 'frameName' || value === 'seatsName'">
                            <a class="pointer" v-if="value === 'idcName'" v-text="list[value]" @click="$broadcast('showEditRoom', list.id)"></a>
                            <a class="pointer" v-if="value === 'frameName'" v-text="list[value]" @click="$broadcast('showEditRoom', list.id)"></a>
                            <a class="pointer" v-if="value === 'seatsName'" v-text="list[value]" @click="$broadcast('showEditRoom', list.id)"></a>
                        </td>

                        <td v-for="value in valueArr" :title="list[value]" v-text="list[value]" v-if="value !== 'idcName' && value !== 'frameName' && value !== 'seatsName'">
                        </td>
                    </tr>
                    <tr class="text-center" v-show="tableList.length === 0">
                        <td :colspan="titles.length + 1">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="clearfix mt30">
            <boot-page :async="false" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
        </div>

        <create-modal></create-modal> 
        <edit-room-modal></edit-room-modal> 
        <edit-frame-modal></edit-frame-modal> 
        <edit-seats-modal></edit-seats-modal> 
    </div>
</template>

<script>
import { dropdown } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import createModal from './CreateRoom.vue'
import editRoomModal from './EditRoom.vue'
import editFrameModal from './EditFrame.vue'
import editSeatsModal from './EditSeats.vue'
import vSelect from '../../global/Select.vue'
import { getRoomSearch } from '../../../vuex/action.js'
import { idcs, statusArr } from '../../../vuex/getters.js'

let origin = {
        dimensions: [
            {value: '机房', label: '机房视角'},
            {value: '机架', label: '机架视角'},
            {value: '机位', label: '机位视角'}
        ],
        dimension: '',
        checkedAll: false,
        checkedIds: [],
        titles: ['机房名称', '机架编号', '机位编号', '机房地址', '网络类型', '业务类型', '所在城市', '机房状态', '客服电话', '业务经理名称'],
        tableList: [
            {id: 1, idcName: '台湾机房', frameName: 'Z14', seatsName: '10U', idcAddress: 'awdawd', network: '电信', productType: '租用盛大', city: 'awd', status: 'dawd', phone: '1212', bossName: 'ddd'},
        ],
        lenArr: [10, 50, 100],
        pageLen: 5,
        url: '',
        param: {
            idc: '',
            status: ''
        },
        checkArr: [
            {label: '机房名称', value: 'idcName', checked: true},
            {label: '机架编号', value: 'frameName', checked: true},
            {label: '机位编号', value: 'seatsName', checked: true},
            {label: '机房地址', value: 'idcAddress', checked: true},
            {label: '网络类型', value: 'network', checked: true},
            {label: '业务类型', value: 'productType', checked: true},
            {label: '所在城市', value: 'city', checked: true},
            {label: '机房状态', value: 'status', checked: true},
            {label: '客服电话', value: 'phone', checked: true},
            {label: '业务经理名称', value: 'bossName', checked: true}
        ],
        valueArr: ['idcName', 'frameName', 'seatsName', 'idcAddress', 'network', 'productType', 'city', 'status', 'phone', 'bossName']
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

        // 筛选
        fliter (index) {
            this.checkArr[index].checked ? this.checkArr[index].checked = false : this.checkArr[index].checked = true

            this.titles = []
            this.valueArr = []

            this.checkArr.forEach((e) => {
                if (e.checked) {
                    this.titles.push(e.label)
                    this.valueArr.push(e.value)
                }
            })
        }
    },
    components: {
        bootPage,
        vSelect,
        createModal,
        editRoomModal,
        editFrameModal,
        editSeatsModal,
        dropdown
    },
    vuex: {
        actions: {
            getRoomSearch
        },
        getters: {
            idcs,   // 获取机房位置
            statusArr  // 获取机房状态
        }
    },
    ready () {
        this.getRoomSearch()
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
        
        // 新增机架
        'showCreateFrame' (param) {
            this.$broadcast('showCreateFrame', param)
        },

        // 新增机位
        'showCreateSeats' (param) {
            this.$broadcast('showCreateSeats', param)
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
