<!-- 群组查询 -->
<template>
    <div class="clearfix">
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">群组名：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.group" :options="groups" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default" @click="refresh">
                查询
            </button>
            <button type="button" class="btn btn-default" @click="createGroup">
                新增群组
            </button>
            <dropdown v-el:deleteconfirm>
                <button type="button" class="btn btn-default" data-toggle="dropdown">
                    批量删除
                    <span class="caret"></span>
                </button>
                <div slot="dropdown-menu" class="dropdown-menu pd20">
                    <button type="button" class="btn btn-danger btn-block" @click="checkedFn('/group/delete/', 'deleteconfirm')">确定</button>
                    <button type="button" class="btn btn-default btn-block" @click="cancelFn('deleteconfirm')">取消</button>
                </div>
            </dropdown>
        </div>
        <div class="table-box">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th width="2%"><input type="checkbox" v-model="checkedAll"></th>
                        <th>群组名</th>
                        <th>物理主机</th>
                        <th>私有云主机</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                        <td><input type="checkbox" :id="list.id" :value="list.id" v-model="checkedIds"></td>
                        <td>
                            <a class="pointer" v-text="list.name" @click="editGroup(list.id, list.name)"></a>
                        </td>
                        <td>
                            <a class="pointer" v-text="list.physicalNum" @click="$broadcast('showServerModal', list.id)"></a>
                        </td>
                        <td>
                            <a class="pointer" v-text="list.cloudNum" @click="$broadcast('showCloudModal', list.id)"></a>
                        </td>
                        <td>
                            <button type="button" class="btn btn-default" @click="$broadcast('showAddServerModal', list.id)">添加物理机</button>
                        </td>
                    </tr>
                    <tr class="text-center" v-show="tableList.length === 0">
                        <td :colspan="5">暂无数据</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td :colspan="5">
                            <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <spinner id="spinner-box" :size="md" :fixed="false" 
                 text="数据加载中，请稍后..." v-ref:spinner>
            </spinner>
        </div>
        <create-group></create-group>
        <edit-group></edit-group>
        <server></server>
        <cloud></cloud>
        <add-server></add-server>
    </div>
</template>
<script>
import { dropdown, spinner } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import vSelect from '../../global/Select.vue'
import createGroup from './CreateGroup.vue'
import editGroup from './EditGroup.vue'
import server from './Server.vue'
import cloud from './Cloud.vue'
import addServer from './AddServer.vue'
import { getGroupSearch } from '../../../vuex/action.js'
import { groups } from '../../../vuex/getters.js'

export default {
    data() {
        return {
            checkedAll: false,
            checkedIds: [],
            param: {
                group: ''
            },
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/group/query/',
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$refs.spinner.show()
            this.checkedIds = []
            this.$refs.page.refresh()
        },

        // 新增群组
        createGroup () {
            this.$broadcast('showCreateModal')
        },

        // 修改群组
        editGroup (id, name) {
            this.$broadcast('showEditModal', {id: id, name: name})
        },

        // 批量删除
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
                        this.$dispatch('show-error', response.data.msg)
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
        },
    },
    ready () {
        this.getGroupSearch()
        this.$refs.spinner.show()
    },
    components: {
        bootPage,
        vSelect,
        dropdown,
        spinner,
        createGroup,
        editGroup,
        server,
        cloud,
        addServer
    },
    vuex: {
        actions: {
            getGroupSearch
        },
        getters: {
            groups
        }
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
    }
}
</script>
<style>
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