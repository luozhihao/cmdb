<!-- IP查询 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">IP：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.ip" @click="showBroad('param.ip')">
                    </div>
                </div>
                 <div class="form-group input-box">
                    <label class="control-label col-sm-4">运营商：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.operator" :options="operators" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3 input-box">
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">机房：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.room" :options="rooms" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.type" :options="netTypes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">网段：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.network">
                    </div>
                </div>
            </div>
            <div class="col-sm-3 input-box">
                <div class="form-group">
                    <label class="control-label col-sm-4">状态：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.status" :options="statusArr" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default" @click="refresh">
                查询
            </button>
        </div>
        <div class="text-center table-title">
            查询结果
        </div>
        <div class="table-box">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th v-for="title in titles" v-text="title"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                        <td :title="list.ip" v-text="list.ip"></td>
                        <td :title="list.network" v-text="list.network"></td>
                        <td :title="list.mask" v-text="list.mask"></td>
                        <td :title="list.gateway" v-text="list.gateway"></td>
                        <td :title="list.status" v-text="list.status"></td>
                        <td :title="list.netType" v-text="list.netType"></td>
                        <td :title="list.operator" v-text="list.operator"></td>
                        <td :title="list.idc" v-text="list.idc"></td>
                        <td><a class="pointer" v-text="list.deviceNum" @click="showView(list.deviceId, list.deviceType)"></a></td>
                    </tr>
                    <tr class="text-center" v-show="tableList.length === 0">
                        <td :colspan="titles.length">暂无数据</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td :colspan="titles.length">
                            <boot-page :async="true" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <spinner id="spinner-box" :size="md" :fixed="false" 
                 text="数据加载中，请稍后..." v-ref:spinner>
            </spinner>
        </div>

        <edit-server-modal></edit-server-modal>
        <edit-device-modal></edit-device-modal>
    </div>
</template>

<script>
import { spinner } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import vSelect from '../../global/Select.vue'
import editServerModal from '../../server/server_search/EditServer.vue'
import editDeviceModal from '../../network/device_search/EditDevice.vue'
import { getIpSearch } from '../../../vuex/action.js'
import { idcs, statusArr, operators, netTypes } from '../../../vuex/getters.js'

let origin = {
        titles: ['IP地址', '网段', '掩码', '网关', 'IP状态', '网络类型', '运营商', '所在机房', '关联设备'],
        tableList: [],
        lenArr: [10, 50, 100],
        pageLen: 5,
        url: '/ip/ip_list/',
        param: {
            ip: '',
            operator: '',
            room: '',
            type: '',
            status: '',
            network: ''
        }
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 输入面板
        showBroad (target) {
            let obj = target.split('.')

            let param = {
                value: this[obj[0]][obj[1]],
                name: target
            }

            this.$dispatch('showBroad', param)
        },

        // 刷新数据
        refresh () {
            this.$refs.spinner.show()
            this.$broadcast('refresh')
        },

        // 显示弹框
        showView (id, type) {
            switch (type) {
                case 1:
                    this.$broadcast('showEditServer', id)
                    break;
                case 2:
                    this.$broadcast('showEditDevice', id)
                    break;
            }
        }
    },
    components: {
        bootPage,
        vSelect,
        spinner,
        editServerModal,
        editDeviceModal
    },
    vuex: {
        actions: {
            getIpSearch
        },
        getters: {
            rooms: idcs,
            statusArr,
            netTypes,
            operators
        }
    },
    ready () {
        this.getIpSearch()
        this.$refs.spinner.show()
    },
    events: {

        // 获取表格数据
        'data' (param) {
            this.tableList = param.data
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
        }
    }
}
</script>

<style scoped>

</style>
