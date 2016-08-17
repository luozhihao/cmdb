<!-- 网段查询 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">网段：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.network">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                 <div class="form-group input-box">
                    <label class="control-label col-sm-4">运营商：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.operator" :options="operators" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">机房：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.room" :options="rooms" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.type" :options="netTypes" placeholder="请选择">
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
                        <td :title="list.network" v-text="list.network"></td>
                        <td :title="list.mask" v-text="list.mask"></td>
                        <td :title="list.gateway" v-text="list.gateway"></td>
                        <td :title="list.netType" v-text="list.netType"></td>
                        <td :title="list.operator" v-text="list.operator"></td>
                        <td :title="list.idc" v-text="list.idc"></td>
                    </tr>
                    <tr class="text-center" v-show="tableList.length === 0">
                        <td :colspan="titles.length">暂无数据</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td :colspan="titles.length">
                            <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <spinner id="spinner-box" :size="md" :fixed="false" 
                 text="数据加载中，请稍后..." v-ref:spinner>
            </spinner>
        </div>
    </div>
</template>

<script>
import { spinner, dropdown } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import vSelect from '../../global/Select.vue'
import { getNetSearch } from '../../../vuex/action.js'
import { idcs2, operators2, netTypes2 } from '../../../vuex/getters.js'

export default {
    data () {
        return {
            titles: ['网段', '掩码', '网关', '网络类型', '运营商', '所在机房'],
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/ip/network_list/',
            param: {
                network: '',
                operator: '',
                room: '',
                type: ''
            }
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$refs.spinner.show()
            this.$refs.page.refresh()
        }
    },
    components: {
        bootPage,
        vSelect,
        spinner
    },
    vuex: {
        actions: {
            getNetSearch
        },
        getters: {
            rooms: idcs2,
            operators: operators2,
            netTypes: netTypes2
        }
    },
    ready () {
        this.getNetSearch()
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
        }
    }
}
</script>

<style scoped>
.pd20 {
    padding: 20px;
}
</style>
