<!-- 机房打通 -->
<template>
    <modal :show.sync="connectModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">机房打通</h4>
        </div>
        <div slot="modal-body" class="modal-body min-height">
            <form class="form-inline text-center pt110 clearfix">
                <div class="col-sm-12 mb50">
                    <div class="input-box col-sm-4 col-sm-offset-4">
                        <v-select :value.sync="connType" :options="connTypes" placeholder="请选择类型">
                        </v-select>
                    </div>
                </div>
                <div class="input-box col-sm-4">
                    <v-select :value.sync="roomFrom" :options="idcs" placeholder="请选择机房一" :search="true">
                    </v-select>
                </div>
                <div class="col-sm-4">
                    <img src="../../../assets/images/connect.jpg" height="40" width="150">
                </div>
                <div class="input-box col-sm-4">
                    <v-select :value.sync="roomTo" :options="idcs" placeholder="请选择机房二" :search="true">
                    </v-select>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="connectFn" :disabled="connType && roomFrom && roomTo ? false : true">打通</button>
            <button type="button" class="btn btn-default" @click='connectModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { idcs, connTypes } from '../../../vuex/getters.js'

let origin = {
        connectModal: false,
        connType: '',
        roomFrom: '',
        roomTo: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 确认打通
        connectFn () {
            if (this.roomFrom !== this.roomTo) {
                this.$http({
                    url: '/idc/room_connect_add/',
                    method: 'POST',
                    data: {
                        connType: this.connType,
                        roomFrom: this.roomFrom,
                        roomTo: this.roomTo
                    }
                })
                .then(response => {
                    if (response.data.code === 200) {
                        this.connectModal = false
                        this.$data = Object.assign({}, init)

                        this.$dispatch('show-success')
                        this.$dispatch('refresh')
                    } else {
                        this.$dispatch('show-error', response.data.msg)
                    }
                })
            } else {
                this.$dispatch('show-notify', '相同机房间不能够进行打通！')
            }
        }
    },
    components: {
        modal,
        vSelect
    },
    vuex: {
        getters: {
            idcs,
            connTypes
        }
    },
    events: {
        'showConnect' () {
            this.connectModal = true
        }
    }
}
</script>

<style scoped>
.min-height {
    min-height: 500px;
}

.pt110 {
    padding-top: 110px;
}

.mb50 {
    margin-bottom: 50px;
}
</style>