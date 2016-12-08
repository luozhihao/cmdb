<!-- 分配到产品 -->
<template>
    <modal :show.sync="dispatchModal" effect="fade" width="550px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">分配到产品</h4>
        </div>
        <div slot="modal-body" class="modal-body min-height">
            <form class="form-horizontal text-center">
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">成本中心：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="costCenter" :options="costCenters" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">产品：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="product" :options="products" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="product && costCenter ? false : true">保存</button>
            <button type="button" class="btn btn-default" @click='dispatchModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { products, costCenters } from '../../../vuex/getters.js'

let origin = {
        dispatchModal: false,
        checkedIds: [],
        product: '',
        costCenter: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 保存
        saveFn () {
            this.$http({
                url: '/device/server/set_product/',
                method: 'POST',
                data: {
                    product: this.product,
                    costCenter: this.costCenter,
                    checkedIds: this.checkedIds
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.dispatchModal = false
                    this.$data = Object.assign({}, init)

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
        vSelect
    },
    vuex: {
        getters: {
            products,
            costCenters
        }
    },
    events: {
        'showDispatchModal' (param) {
            this.dispatchModal = true

            this.checkedIds = param
        }
    }
}
</script>

<style scoped>
.min-height {
    min-height: 300px;
}
</style>