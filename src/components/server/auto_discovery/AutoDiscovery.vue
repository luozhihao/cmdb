<template>
    <div>
        <div class="table-box">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th v-for="title in titles" v-text="title"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                        <td>
                            <span v-if="list.status === '1'" class="label label-success">已确定IDC</span>
                            <span v-if="list.status === '2'" class="label label-warning">未确定IDC</span>
                            <span v-if="list.status === '3'" class="label label-danger">IP存在冲突</span>
                        </td>
                        <td v-text="list.serverNum" :title="list.serverNum"></td>
                        <td v-text="list.sn" :title="list.sn"></td>
                        <td v-text="list.os" :title="list.os"></td>
                        <td v-text="list.model" :title="list.model"></td>
                        <td v-text="list.ip" :title="list.ip"></td>
                        <td v-text="list.cpu" :title="list.cpu"></td>
                        <td v-text="list.ram" :title="list.ram"></td>
                        <td v-text="list.remark" :title="list.remark"></td>
                        <td v-text="list.time" :title="list.time"></td>
                        <td>
                            <button v-if="list.status === '1'" class="btn btn-default auto-btn" @click="$broadcast('showEditAuto', {serverId: list.serverId, autoId: list.id})">加入</button>
                            <button v-if="list.status === '2'" class="btn btn-default auto-btn" @click="$broadcast('showCreateAuto', list.id)">加入</button>
                            <button v-if="list.status === '3'" class="btn btn-default auto-btn" @click="$broadcast('showConfirm', list.id)">已确定</button>
                        </td>
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
        <edit-server-modal></edit-server-modal>
        <create-server-modal></create-server-modal>
        <confirm-modal></confirm-modal>
    </div>
</template>

<script>
import { spinner } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import editServerModal from '../server_search/EditServer.vue'
import createServerModal from '../server_search/createServer.vue'
import confirmModal from '../../global/Confirm.vue'

export default {
    data () {
        return {
            titles: ['状态', '编号', 'SN', 'OS', '型号', 'IP', 'CPU', '内存', '说明', '发现时间', '操作'],
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/device/server/auto_list/',
            param: {}
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$refs.spinner.show()
            this.$refs.page.refresh()
        },
    },
    components: {
        spinner,
        bootPage,
        editServerModal,
        createServerModal,
        confirmModal
    },
    ready () {
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

        // confirm
        'confirm' (param) {
            console.log(param)
        }
    }
}
</script>

<style scoped>
.auto-btn {
    padding: 2px 8px;
    width: 60px;
    margin-top: -4px;
}
</style>