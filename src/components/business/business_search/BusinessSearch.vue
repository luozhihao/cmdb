<!-- 业务查询 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">产品名称：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.productName">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">游戏类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.gameType" :options="gameTypes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
               <div class="form-group">
                    <label class="control-label col-sm-4">运维负责人：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.maintainManager">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">部门：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.department" :options="departments" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">平台类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.platformType" :options="platformTypes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">运营负责人：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.operationalManager">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">业务类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.businessType" :options="businessTypes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">研发模式：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.developModel" :options="developModels" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">项目负责人：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.projectManager">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">运营阶段：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.phase" :options="phases" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">产品级别：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="productLevel" :options="productLevels" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">市场负责人：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="param.marketManager">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default">
                查询
            </button>
            <button type="button" class="btn btn-default" @click="$broadcast('showCreateProduct')">
                新增产品
            </button>
            <button type="button" class="btn btn-default">
                批量删除
            </button>
            <button type="button" class="btn btn-default">
                同步游戏信息
            </button>
        </div>
        <div class="text-center table-title">
            查询结果
        </div>
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
                    <td :title="list.productName"><a class="pointer" v-text="list.productName" @click="$broadcast('showEditProduct', list.id)"></td>
                    <td :title="list.businessType" v-text="list.businessType"></td>
                    <td :title="list.productLevel" v-text="list.productLevel"></td>
                    <td :title="list.platformType" v-text="list.platformType"></td>
                    <td :title="list.gameType" v-text="list.gameType"></td>
                    <td :title="list.developModel" v-text="list.developModel"></td>
                    <td :title="list.department" v-text="list.department"></td>
                    <td :title="list.phase" v-text="list.phase"></td>
                    <td :title="list.projectManager" v-text="list.projectManager"></td>
                    <td :title="list.operationalManager" v-text="list.operationalManager"></td>
                    <td :title="list.maintainManager" v-text="list.maintainManager"></td>
                    <td :title="list.marketManager" v-text="list.marketManager"></td>
                </tr>
                <tr class="text-center" v-show="tableList.length === 0">
                    <td :colspan="titles.length">暂无数据</td>
                </tr>
            </tbody>
        </table>
        <div class="clearfix">
            <boot-page :async="false" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
        </div>

        <create-product-modal></create-product-modal>
        <edit-product-modal></edit-product-modal>
    </div>
</template>

<script>
import bootPage from '../../global/BootPage.vue'
import createProductModal from './CreateProduct.vue'
import editProductModal from './EditProduct.vue'
import vSelect from '../../global/Select.vue'
import { getBusinessSearch } from '../../../vuex/action.js'
import { departments, productTypes, phases, gameTypes, platformTypes, developModels, productLevels } from '../../../vuex/getters.js'

let origin = {
        checkedAll: false,
        checkedIds: [],
        titles: ['产品名称', '业务类别', '产品级别', '平台类型', '游戏类型', '研发模式', '所属部门', '运营阶段', '项目负责人', '运营负责人', '运维负责人', '市场负责人'],
        tableList: [
            {id: 1, productName: '航海世纪', businessType: '游戏', productLevel: '一级', platformType: '端游', gameType: 'MMORPG', developModel: '自研', department: '项目一部', phase: 'OB', projectManager: '娄佳', operationalManager: '乔研', maintainManager: '董勰,陈红伟', marketManager: ''}
        ],
        lenArr: [10, 50, 100],
        pageLen: 5,
        url: '',
        param: {
            productName: '',
            department: '',
            businessType: '',
            gameType: '',
            platformType: '',
            developModel: '',
            phase: '',
            productLevel: '',
            maintainManager: '',
            operationalManager: '',
            projectManager: '',
            marketManager: ''
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
        createProductModal,
        editProductModal,
        vSelect
    },
    vuex: {
        actions: {
            getBusinessSearch
        },
        getters: {
            departments,
            businessTypes: productTypes,
            phases,
            gameTypes,
            platformTypes,
            developModels,
            productLevels
        }
    },
    ready () {
        this.getBusinessSearch()
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
    }
}
</script>

<style scoped>

</style>
