<!-- 新增产品 -->
<template>
    <modal :show.sync="creatProductModal" effect="fade" width="850px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增产品</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">产品名称：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">业务类型：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="businessType" :options="businessTypes" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">游戏类型：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="gameType" :options="gameTypes" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">平台类型：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="platformType" :options="platformTypes" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">研发模式：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="developModel" :options="developModels" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">运营阶段：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="param.phase" :options="phases" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">部门：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="department" :options="departments" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">项目负责人：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">运营负责人：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">运维负责人：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">市场负责人：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">产品级别：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value="下拉框">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default" @click='creatProductModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        creatProductModal: false,
        departments: [],
        businessTypes: [],
        gameTypes: [],
        platformTypes: [],
        developModels: [],
        phases: [],
        department: '',
        businessType: '',
        gameType: '',
        platformType: '',
        developModel: '',
        phase: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

    },
    components: {
        modal,
        vSelect
    },
    events: {
        'showCreateProduct' () {
            this.creatProductModal = true
        }
    }
}
</script>

<style scoped>
</style>