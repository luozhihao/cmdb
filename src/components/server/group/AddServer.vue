<!-- 添加物理主机 -->
<template>
    <modal :show.sync="viewAddServerModal" effect="fade" width="1200px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">添加物理主机</h4>
        </div>
        <div slot="modal-body" class="modal-body max-height">
            <form class="form-horizontal form-search clearfix">
                <div class="col-sm-3">
                    <label class="control-label col-sm-3">SN：</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.sn" @click="showBroad('param.sn')">
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-3">IP：</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.ip" @click="showBroad('param.ip')">
                        </div>
                    </div>
                </div>
            </form>
            <div class="text-center btn-operate">
                <button type="button" class="btn btn-default" @click="refresh">
                    查询
                </button>
            </div>
            <div class="table-box" v-if="showData">
                <table class="table table-hover table-bordered table-small">
                    <thead>
                        <tr>
                            <th width="2%"><input type="checkbox" v-model="checkedAll"></th>
                            <th>服务器编号</th>
                            <th>SN</th>
                            <th>公司内网</th>
                            <th>机房内网</th>
                            <th>机房外网</th>
                            <th>所在机房</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                            <td><input type="checkbox" :id="list.id" :value="list.id" v-model="checkedIds"></td>
                            <td v-text="list.serverNum"></td>
                            <td v-text="list.sn"></td>
                            <td v-text="list.companyIntnet"></td>
                            <td v-text="list.roomIntnet"></td>
                            <td v-text="list.roomOutnet"></td>
                            <td v-text="list.room"></td>
                        </tr>
                        <tr class="text-center" v-show="tableList.length === 0">
                            <td :colspan="7">暂无数据</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td :colspan="7">
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
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='addServer'>添加</button>
            <button type="button" class="btn btn-default" @click='viewAddServerModal = false'>关闭</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'

export default {
    data() {
        return {
            checkedAll: false,
            checkedIds: [],
            showData: false,
            viewAddServerModal: false,
            param: {
                id: null,
                ip: '',
                sn: '',
            },
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/group/free_machines/',
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.checkedIds = []
            this.$refs.page.refresh()
        },

        // 添加群组物理机
        addServer () {
            if (this.checkedIds.length) {
                this.$http({
                    url: '/group/bind_machines/',
                    method: 'POST',
                    data: {
                        id: this.param.id,
                        checkedIds: this.checkedIds
                    }
                })
                .then(response => {
                    if (response.data.code === 200) {
                        this.viewAddServerModal = false

                        this.$dispatch('refresh')
                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error', response.data.msg)
                    }
                })
            } else {
                this.$dispatch('show-notify', '请选择添加项')
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
    },
    ready () {
        
    },
    components: {
        modal,
        bootPage
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
        'showAddServerModal' (id) {
            this.viewAddServerModal = true

            this.param.id = id
            this.tableList = []
            this.showData = true

            this.refresh()
        },

        // 获取表格数据
        'data' (param) {
            this.tableList = param.data
            this.checkedIds = []
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
    }
}
</script>

<style scoped>
.max-height {
    max-height: 650px;
    overflow: auto;
}
</style>

