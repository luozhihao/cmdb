<template>
    <modal :show.sync="creatModal" effect="fade" width="950px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增机房</h4>
        </div>
        <div slot="modal-body" class="modal-body mh500">
            <form class="form-horizontal clearfix">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">名称：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="idcName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">地址：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="idcAddress">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">运营商：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="operator" :options="operators" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">业务类型：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="productType" :options="productTypes" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">城市：<span class="text-danger">*</span></label>
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
                        <label class="control-label col-sm-4">状态：<span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">客服电话：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="phone">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">服务经理：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="bossName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">服务经理电话：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="bossPhone">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">服务经理邮箱：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="bossMail">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">技术联系人：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="TechName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">技术联系人电话：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="TechPhone">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">技术联系人邮箱：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="TechMail">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">备注：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" v-model="remark">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="idcName.trim() && idcAddress.trim() && operator && productType && city1 && city2 && status ? false : true">保存</button>
            <button type="button" class="btn btn-default" @click='creatModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { getRoomCreate } from '../../../vuex/action.js'
import { operators, productTypes, cityArr1, statusArr } from '../../../vuex/getters.js'

let origin = {
        creatModal: false,
        idcName: '',
        idcAddress: '',
        operator: '',
        productType: '',
        city1: '',
        city2: '',
        status: '',
        phone: '',
        bossName: '',
        bossPhone: '',
        bossMail: '',
        TechName: '',
        TechPhone: '',
        TechMail: '',
        remark: '',
        cityArr2: []
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 新建机房
        saveFn () {
            this.$http({
                url: '/idc/room/add/',
                method: 'POST',
                data: this.$data
            })
            .then((response) => {
                if (response.data.code === 200) {
                    this.creatModal = false
                    this.$data = Object.assign({}, init)

                    this.$dispatch('refresh')
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error')
                }
            })
        }
    },
    components: {
        modal,
        vSelect
    },
    vuex: {
        actions: {
            getRoomCreate
        },
        getters: {
            operators, // 运营商
            productTypes, // 产品类型
            cityArr1, // 一级城市
            statusArr // 状态
        }
    },
    events: {
        'showCreate' () {
            this.creatModal = true

            this.getRoomCreate()
        }
    },
    watch: {
        'city1' (newVal) {
            if (newVal) {
                this.city2 = ''

                this.$http({
                    url: '/city/sub/?id=' + newVal,
                    method: 'GET'
                })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.cityArr2 = response.data.cityArr2
                    }
                })
            } else {
                this.city2 = ''
                this.cityArr2 = []
            }
        }
    }
}
</script>

<style scoped>
</style>