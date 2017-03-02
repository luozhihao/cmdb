<!-- 添加物理主机 -->
<template>
    <modal :show.sync="viewAddServerModal" effect="fade" width="1200px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">添加物理主机</h4>
        </div>
        <div slot="modal-body" class="modal-body max-height">
            <form class="form-horizontal text-center clearfix mb20">
                <div class="col-sm-3">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-3">SN：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="param.sn">
                        </div>
                    </div>
                </div>
            </form>
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
            <button type="button" class="btn btn-default" @click='viewAddServerModal = false'>取消</button>
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
    }
}
</script>

<style scoped>
.max-height {
    max-height: 550px;
    overflow: auto;
}
</style>

