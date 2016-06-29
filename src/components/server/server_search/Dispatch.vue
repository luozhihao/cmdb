<!-- 分配到产品 -->
<template>
    <modal :show.sync="dispatchModal" effect="fade" width="550px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">分配到产品</h4>
        </div>
        <div slot="modal-body" class="modal-body min-height">
            <form class="form-inline text-center">
                <div class="form-group">
                    <v-select :value.sync="product" :options="products" placeholder="请选择产品" :search="true">
                    </v-select>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="product ? false : true">保存</button>
            <button type="button" class="btn btn-default" @click='dispatchModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { products } from '../../../vuex/getters.js'

let origin = {
        dispatchModal: false,
        checkedIds: [],
        product: ''
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
            products
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