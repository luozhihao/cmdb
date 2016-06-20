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
                        <v-select :value.sync="param.room" :options="rooms" placeholder="请选择">
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
                        <td v-if="list.idcName"><a class="pointer" v-text="list.idcName" @click="$broadcast('showEditRoom', list.id)"></a></td>
                        <td v-if="list.frameName"><a class="pointer" v-text="list.frameName" @click="$broadcast('showEditFrame', list.id)"></a></td>
                        <td v-if="list.seatsName"><a class="pointer" v-text="list.seatsName" @click="$broadcast('showEditSeats', list.id)"></a></td>

                        <td v-for="value in list" :title="value" v-text="value" v-if="$key !== 'idcName' && $key !== 'frameName' && $key !== 'seatsName' &&  $key !== 'id'"></td>
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
import bootPage from '../../global/BootPage.vue'
import createModal from './CreateRoom.vue'
import editRoomModal from './EditRoom.vue'
import editFrameModal from './EditFrame.vue'
import editSeatsModal from './EditSeats.vue'
import vSelect from '../../global/Select.vue'

let origin = {
        dimensions: [
            {value: '机房', label: '机房视角'},
            {value: '机架', label: '机架视角'},
            {value: '机位', label: '机位视角'}
        ],
        dimension: '',
        rooms: [],
        statusArr: [],
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
            room: '',
            status: ''
        }
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
        }
    },
    components: {
        bootPage,
        vSelect,
        createModal,
        editRoomModal,
        editFrameModal,
        editSeatsModal
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

</style>
