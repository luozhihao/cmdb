<!--  硬盘查询 -->
<template>
    <div class="clearfix">
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">类型：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.type">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">品牌：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.brand">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">容量：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.size">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default" @click="refresh">
                查询
            </button>
            <button type="button" class="btn btn-default" @click="$broadcast('showDiskModal')">
                新增
            </button>
            <dropdown v-el:deleteconfirm>
                <button type="button" class="btn btn-default" data-toggle="dropdown">
                    批量删除
                    <span class="caret"></span>
                </button>
                <div slot="dropdown-menu" class="dropdown-menu pd20">
                    <button type="button" class="btn btn-danger btn-block" @click="checkedFn('/equipment/disk_delete/', 'deleteconfirm')">确定</button>
                    <button type="button" class="btn btn-default btn-block" @click="cancelFn('deleteconfirm')">取消</button>
                </div>
            </dropdown>
        </div>
        <div class="table-box">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th width="2%"><input type="checkbox" v-model="checkedAll"></th>
                        <th>类型</th>
                        <th>品牌</th>
                        <th>容量</th>
                        <th>数量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                        <td><input type="checkbox" :id="list.id" :value="list.id" v-model="checkedIds"></td>
                        <td v-text="list.type"></td>
                        <td v-text="list.brand"></td>
                        <td v-text="list.size"></td>
                        <td v-text="list.num"></td>
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
        <create-disk></create-disk>
    </div>
</template>
<script>
import { dropdown, spinner } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import vSelect from '../../global/Select.vue'
import createDisk from './CreateDisk.vue'

export default {
    data() {
        return {
            checkedAll: false,
            checkedIds: [],
            param: {
                type: '',
                brand: '',
                size: ''
            },
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/equipment/disk_list/',
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$refs.spinner.show()
            this.checkedIds = []
            this.$refs.page.refresh()
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
        this.$refs.spinner.show()
    },
    components: {
        bootPage,
        vSelect,
        dropdown,
        spinner,
        createDisk
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