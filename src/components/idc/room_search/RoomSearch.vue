<!-- 机房查询 -->
<template>
    <div>  
        <div class="text-center mb20">
            <v-select :value.sync="param.dimension" :options="dimensions" placeholder="请选择视角">
            </v-select>
        </div>
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">机房：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.idc" :options="idcs" placeholder="请选择" :search="true">
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
                        <input type="text" class="form-control" v-model="param.number">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default" @click="searchFn">
                查询
            </button>
            <button type="button" class="btn btn-default" @click="$broadcast('showCreate')" v-if="perm.新增机房 || perm.all">
                新增机房
            </button>
            <dropdown v-el:confirm v-if="perm.删除机房 || perm.all">
                <button type="button" class="btn btn-default" data-toggle="dropdown">
                    批量删除
                    <span class="caret"></span>
                </button>
                <div slot="dropdown-menu" class="dropdown-menu pd20">
                    <span class="text-danger fs12">注：删除机房将删除其下所有机架和机位</span>
                    <button type="button" class="btn btn-danger btn-block mt20" @click="deleteFn">确定</button>
                    <button type="button" class="btn btn-default btn-block" @click="cancelFn">取消</button>
                </div>
            </dropdown>
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
                            <a class="pointer" v-if="value === 'idcName'" v-text="list[value]" @click="$broadcast('showEditRoom', list.roomId)"></a>
                            <a class="pointer" v-if="value === 'frameName'" v-text="list[value]" @click="$broadcast('showEditFrame', list.frameId)"></a>
                            <a class="pointer" v-if="value === 'seatsName'" v-text="list[value]" @click="$broadcast('showEditSeats', list.seatId)"></a>
                        </td>

                        <td v-for="value in valueArr" :title="list[value]" v-text="list[value]" v-if="value !== 'idcName' && value !== 'frameName' && value !== 'seatsName'">
                        </td>
                    </tr>
                    <tr class="text-center" v-show="tableList.length === 0">
                        <td :colspan="titles.length + 1">暂无数据</td>
                    </tr>
                </tbody>
                <tfoot> 
                    <tr>
                        <td :colspan="titles.length + 1">
                            <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <spinner id="spinner-box" :size="md" :fixed="false" 
                 text="数据加载中，请稍后..." v-ref:spinner>
            </spinner>
        </div>

        <create-modal></create-modal> 
        <edit-room-modal></edit-room-modal> 
        <edit-frame-modal></edit-frame-modal> 
        <edit-seats-modal></edit-seats-modal> 
    </div>
</template>

<script>
import { dropdown, spinner } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import createModal from './CreateRoom.vue'
import editRoomModal from './EditRoom.vue'
import editFrameModal from './EditFrame.vue'
import editSeatsModal from './EditSeats.vue'
import vSelect from '../../global/Select.vue'
import { getRoomSearch } from '../../../vuex/action.js'
import { idcs, statusArr, perm } from '../../../vuex/getters.js'

export default {
    data () {
        return {
            dimensions: [
                {value: '1', label: '机房视角'},
                {value: '2', label: '机架视角'},
                {value: '3', label: '机位视角'}
            ],
            checkedAll: false,
            checkedIds: [],
            titles: [],
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/idc/query/',
            param: {
                dimension: '1',
                idc: '',
                status: '',
                number: ''
            },
            checkArr: [
                {label: '机房地址', value: 'idcAddress', checked: true},
                {label: '网络类型', value: 'network', checked: true},
                {label: '业务类型', value: 'productType', checked: true},
                {label: '所在城市', value: 'city', checked: true},
                {label: '机房状态', value: 'status', checked: true},
                {label: '业务经理名称', value: 'bossName', checked: true},
                {label: '客服电话', value: 'phone', checked: true}
            ],
            valueArr: []
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$refs.spinner.show()
            this.checkedIds = []
            this.$refs.page.refresh()
        },

        // 查询
        searchFn () {
            if (this.param.dimension) {
                this.refresh()
            } else {
                this.$dispatch('show-notify', '请选择视角')
            }
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

            switch (this.param.dimension) {
                case '1':
                    this.titles.unshift('机房名称')
                    this.valueArr.unshift('idcName')
                    break;
                case '2':
                    this.titles.unshift('机架编号', '机房名称')
                    this.valueArr.unshift('frameName', 'idcName')
                    break;
                case '3':
                    this.titles.unshift('机位编号', '机架编号', '机房名称')
                    this.valueArr.unshift('seatsName', 'frameName', 'idcName')
                    break;
            }
        },

        // 批量删除
        deleteFn () {
            if (this.checkedIds.length) {
                this.$http({
                    url: '/idc/delete/',
                    method: 'POST',
                    data: {
                        checkedIds: this.checkedIds,
                        dimension: this.param.dimension
                    }
                })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.checkedIds = []
                        this.refresh()
                        this.getRoomSearch()

                        this.$dispatch('show-success', '删除成功')
                    } else {
                        this.$dispatch('show-success', '删除失败了')
                    }
                })
            } else {
                this.$dispatch('show-notify', '请选择删除项')
            }

            this.$els.confirm.classList.toggle('open')
        },

        // 取消删除
        cancelFn () {
            this.$els.confirm.classList.toggle('open')
        },
    },
    components: {
        bootPage,
        vSelect,
        createModal,
        editRoomModal,
        editFrameModal,
        editSeatsModal,
        dropdown,
        spinner
    },
    vuex: {
        actions: {
            getRoomSearch
        },
        getters: {
            perm,
            idcs,   // 获取机房位置
            statusArr  // 获取机房状态
        }
    },
    ready () {
        this.getRoomSearch()
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
        'param.dimension' (newVal) {
            this.originFilter()

            this.$refs.spinner.show()
            this.checkedIds = []
            this.$refs.page.refresh2()
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

.pd20 {
    padding: 20px;
}

.mt20 {
    margin-top: 20px;
}
</style>
