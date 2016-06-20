<template>
    <modal :show.sync="creatModal" effect="fade" width="950px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增机房</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">名称：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">地址：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">运营商：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="operator" :options="operators" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">业务类型：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="productType" :options="productTypes" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">城市：</label>
                        <div class="col-sm-4 pr0">
                            <v-select :value.sync="city1" :options="cityArr1" placeholder="请选择">
                            </v-select>
                        </div>
                        <div class="col-sm-4 pl0">
                            <v-select :value.sync="city2" :options="cityArr2" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">状态：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">客服电话：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">服务经理：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">服务经理电话：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">服务经理邮箱：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">技术联系人：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">技术联系人电话：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">技术联系人邮箱：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">备注：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default" @click='creatModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        creatModal: false,
        operators: [],
        operator: '',
        productTypes: [],
        productType: '',
        statusArr: [],
        status: '',
        cityArr1: [],
        cityArr: ''
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
        'showCreate' () {
            this.creatModal = true
        }
    }
}
</script>

<style scoped>
</style>