<!-- 查看群组绑定的物理机 -->
<template>
    <modal :show.sync="viewServerModal" effect="fade" width="1200px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">查看绑定的物理机</h4>
        </div>
        <div slot="modal-body" class="modal-body max-height">
            <form class="form-horizontal text-center clearfix mb20">
                <!-- <div class="col-sm-3">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-3">SN：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="param.sn">
                        </div>
                    </div>
                </div> -->
            </form>
            <div class="table-box" v-if="showData">
                <table class="table table-hover table-bordered table-small">
                    <thead>
                        <tr>
                            <th>服务器编号</th>
                            <th>SN</th>
                            <th>公司内网</th>
                            <th>机房内网</th>
                            <th>机房外网</th>
                            <th>所在机房</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                            <td v-text="list.serverNum"></td>
                            <td v-text="list.sn"></td>
                            <td v-text="list.companyIntnet"></td>
                            <td v-text="list.roomIntnet"></td>
                            <td v-text="list.roomOutnet"></td>
                            <td v-text="list.room"></td>
                            <td>
                                <button type="button" class="btn btn-default" @click="unbind(list.id)">解绑</button>
                            </td>
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
            <button type="button" class="btn btn-default" @click='viewServerModal = false'>关闭</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'

export default {
    data() {
        return {
            showData: false,
            viewServerModal: false,
            param: {
                id: null,
                sn: '',
                type: 8
            },
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/group/detail/',
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$refs.page.refresh()
        },

        // 解绑
        unbind (id) {
            this.$http({
                url: '/group/unbind_machines/',
                method: 'POST',
                data: {
                    id: this.param.id,
                    checkedIds: [id]
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.$dispatch('refresh')
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error', response.data.msg)
                }
            })
        }
    },
    ready () {
        
    },
    components: {
        modal,
        bootPage
    },
    events: {
        'showServerModal' (id) {
            this.viewServerModal = true

            this.param.id = id
            this.tableList = []
            this.showData = true

            this.refresh()
        },

        // 获取表格数据
        'data' (param) {
            this.tableList = param.data
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
    max-height: 650px;
    overflow: auto;
}
</style>

