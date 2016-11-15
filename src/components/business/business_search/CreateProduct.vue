<!-- 新增产品 -->
<template>
    <modal :show.sync="creatProductModal" effect="fade" width="850px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增产品</h4>
        </div>
        <div slot="modal-body" class="modal-body mh500">
            <form class="form-horizontal clearfix">
                <div class="col-sm-12">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-2">业务类型：<span class="text-danger">*</span></label>
                        <div class="col-sm-9">
                            <v-select :value.sync="businessType" :options="businessTypes" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12" v-show="businessType !== '1'">
                    <div class="form-group">
                        <label class="control-label col-sm-2">产品名称：<span class="text-danger">*</span></label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" v-model="productName">
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">部门：<span class="text-danger">*</span></label>
                            <div class="col-sm-8" style="width: 262px; padding-right: 0">
                                <v-select :value.sync="department1" :options="departments1" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <div class="col-sm-10">
                                <v-select :value.sync="department2" :options="departments2" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                </div>  
                <div class="col-sm-12" v-show="businessType === '1'">
                    <div class="col-sm-6" >
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">游戏列表：<span class="text-danger">*</span></label>
                            <div class="col-sm-6">
                                <v-select :value.sync="gameList" :options="gameLists" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="control-label col-sm-4">区域名称：</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" v-model="childType">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12" v-show="businessType === '1'">
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">游戏类型：<span class="text-danger">*</span></label>
                            <div class="col-sm-6">
                                <v-select :value.sync="gameType" :options="gameTypes" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">平台类型：<span class="text-danger">*</span></label>
                            <div class="col-sm-6">
                                <v-select :value.sync="platformType" :options="platformTypes" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12" v-show="businessType === '1'">
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">研发模式：<span class="text-danger">*</span></label>
                            <div class="col-sm-6">
                                <v-select :value.sync="developModel" :options="developModels" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">运营阶段：<span class="text-danger">*</span></label>
                            <div class="col-sm-6">
                                <v-select :value.sync="phase" :options="phases" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">产品级别：<span class="text-danger">*</span></label>
                            <div class="col-sm-6">
                                <v-select :value.sync="productLevel" :options="productLevels" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">子公司：<span class="text-danger">*</span></label>
                            <div class="col-sm-6">
                                <v-select :value.sync="company" :options="companys" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12" v-show="businessType === '1'">
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">工作室：<span class="text-danger">*</span></label>
                            <div class="col-sm-6">
                                <v-select :value.sync="studio" :options="studios" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group input-box">
                            <label class="control-label col-sm-4">发行部：<span class="text-danger">*</span></label>
                            <div class="col-sm-6">
                                <v-select :value.sync="release" :options="releases" placeholder="请选择">
                                </v-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group input-box mb0">
                        <label class="control-label col-sm-2">项目负责人：</label>
                        <div class="col-sm-9">
                            <typeahead
                                :on-hit="addProjectManager"
                                :async="'/product/getUser/?name='"
                                :key="'name'"
                                placeholder="按回车键添加"
                            >
                            </typeahead>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group mb20">
                        <div class="col-sm-9 col-sm-offset-2">
                            <span class="selected-tag" v-for="projectManager in projectManagers" track-by="$index">
                                <span v-text="projectManager"></span>
                                <button type="button" class="close" @click="deleteUser($index, 'projectManagers')">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group input-box mb0">
                        <label class="control-label col-sm-2">运营负责人：</label>
                        <div class="col-sm-9">
                            <typeahead
                                :on-hit="addOperationalManager"
                                :async="'/product/getUser/?name='"
                                :key="'name'"
                                placeholder="按回车键添加"
                            >
                            </typeahead>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group mb20">
                        <div class="col-sm-9 col-sm-offset-2">
                            <span class="selected-tag" v-for="operationalManager in operationalManagers" track-by="$index">
                                <span v-text="operationalManager"></span>
                                <button type="button" class="close" @click="deleteUser($index, 'operationalManagers')">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group input-box mb0">
                        <label class="control-label col-sm-2">运维负责人：<span class="text-danger">*</span></label>
                        <div class="col-sm-9">
                            <typeahead
                                :on-hit="addMaintainManager"
                                :async="'/product/getUser/?name='"
                                :key="'name'"
                                placeholder="按回车键添加"
                            >
                            </typeahead>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group mb20">
                        <div class="col-sm-9 col-sm-offset-2">
                            <span class="selected-tag" v-for="maintainManager in maintainManagers" track-by="$index">
                                <span v-text="maintainManager"></span>
                                <button type="button" class="close" @click="deleteUser($index, 'maintainManagers')">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group input-box mb0">
                        <label class="control-label col-sm-2">市场负责人：</label>
                        <div class="col-sm-9">
                            <typeahead
                                :on-hit="addMarketManager"
                                :async="'/product/getUser/?name='"
                                :key="'name'"
                                placeholder="按回车键添加"
                            >
                            </typeahead>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group mb20">
                        <div class="col-sm-9 col-sm-offset-2">
                            <span class="selected-tag" v-for="marketManager in marketManagers" track-by="$index">
                                <span v-text="marketManager"></span>
                                <button type="button" class="close" @click="deleteUser($index, 'marketManagers')">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveFn">保存</button>
            <button type="button" class="btn btn-default" @click='creatProductModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import typeahead from '../../global/Typeahead.vue'
import vSelect from '../../global/Select.vue'
import { getBusinessSearch } from '../../../vuex/action.js'
import { productTypes, phases, gameTypes, platformTypes, developModels, gameLists, productLevels, studios, releases, companys, departments1 } from '../../../vuex/getters.js'

let origin = {
        creatProductModal: false,
        businessType: '1',
        gameList: '',
        childType: '',
        department1: '',
        department2: '',
        productName: '',
        productLevel: '',
        gameType: '',
        platformType: '',
        developModel: '',
        phase: '',
        company: '',
        studio: '',
        release: '',
        projectManagers: [],
        maintainManagers: [],
        operationalManagers: [],
        marketManagers: [],
        departments2: []
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 模糊搜索项目负责人
        addProjectManager (items, targetVM) {
            if ($.inArray(items, this.projectManagers) === -1 && items) {
                this.projectManagers.push(items) 
            }
            
            targetVM.reset()
        },

        // 模糊搜索运营负责人
        addOperationalManager (items, targetVM) {
            if ($.inArray(items, this.operationalManagers) === -1 && items) {
                this.operationalManagers.push(items) 
            }
            
            targetVM.reset()
        },

        // 模糊搜索运维负责人
        addMaintainManager (items, targetVM) {
            if ($.inArray(items, this.maintainManagers) === -1 && items) {
                this.maintainManagers.push(items) 
            }
            
            targetVM.reset()
        },

        // 模糊搜索市场负责人
        addMarketManager (items, targetVM) {
            if ($.inArray(items, this.marketManagers) === -1 && items) {
                this.marketManagers.push(items) 
            }
            
            targetVM.reset()
        },

        // 删除负责人
        deleteUser (index, name) {
            this[name].splice(index, 1)
        },

        // 新增产品
        saveFn () {
            if (this.businessType === '1') {

                if (this.gameList && this.department1 && this.productLevel && this.gameType && this.platformType
                    && this.developModel && this.phase && this.maintainManagers.length && this.company && this.studio && this.release) {

                    this.saveVaild()
                    
                } else {
                    this.$dispatch('show-notify', '存在未填写的必填项，请检查')
                }

            } else if (this.businessType !== '1' && this.businessType) {

                if (this.department1 && this.productLevel && this.maintainManagers.length && this.company) {

                    this.saveVaild()
                    
                } else {
                    this.$dispatch('show-notify', '存在未填写的必填项，请检查')
                }
            } else {
                this.$dispatch('show-notify', '请选择业务类型')
            }
        },

        // 执行保存
        saveVaild () {
            this.$http({
                url: '/product/operate/',
                method: 'POST',
                data: this.$data
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.creatProductModal = false
                    this.$data = Object.assign({}, init)
                    this.getBusinessSearch()

                    this.$dispatch('refresh')
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error', response.data.msg)
                }
            })
        }
    },
    components: {
        modal,
        vSelect,
        typeahead
    },
    vuex: {
        actions: {
            getBusinessSearch
        },
        getters: {
            businessTypes: productTypes,
            phases,
            gameTypes,
            platformTypes,
            developModels,
            gameLists,
            productLevels,
            studios,
            releases,
            companys,
            departments1
        }
    },
    watch: {
        'businessType' (newVal) {
            if (newVal === '1') {
                this.productName = ''
            } else if (newVal !== '1' && newVal) {
                this.gameList = ''
                this.childType = ''
                this.gameType = ''
                this.platformType = ''
                this.developModel = ''
                this.phase = ''
                this.studio = ''
                this.release = ''
                this.company = this.company || '1'
            }
        },
        'department1' (newVal) {
            this.department2 = ''

            this.$http({
                url: '/product/getDepartment/?id=' + newVal,
                method: 'GET'
            })
            .then(response => {
                this.departments2 = response.data.departments2
            })
        }
    },
    events: {
        'showCreateProduct' () {
            this.creatProductModal = true
        }
    }
}
</script>

<style scoped>
.selected-tag {
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 26px;
    margin: 4px 1px 0 3px;
    padding: 0 .25em;
    float: left;
    line-height: 1.7em;
    color: #147688;
    background-color: #d7f3f9;
    border-color: #91ddec;
    white-space: nowrap;
}

.selected-tag .close {
    float: none;
    margin-right: 0;
    font-size: 20px;
    -webkit-appearance: none;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: .2;
}

.selected-tag .close:hover {
    color: #000;
    filter: alpha(opacity=50);
    opacity: .5;
}
</style>