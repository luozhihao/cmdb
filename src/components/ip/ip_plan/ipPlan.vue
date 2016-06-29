<!-- IP规划 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
        <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">类型：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="netType" :options="netTypes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">IP地址：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="ips" @click="showBroad('ips')">
                    </div>
                </div>
            </div>
            <div class="col-sm-3 input-box">
                <div class="form-group" v-show="netType === '3'">
                    <label class="col-sm-4 control-label">运营商：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="operator" :options="operators" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">规划机房：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="idc" :options="idcs" placeholder="请选择" :search="true" multiple>
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">网段：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="network">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">网关：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="gateway">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="netType && idc && gateway.trim() ? false : true">
                保存
            </button>
        </div>
    </div>
</template>

<script>
import vSelect from '../../global/Select.vue'
import { getIpPlan } from '../../../vuex/action.js'
import { idcs, netTypes, operators } from '../../../vuex/getters.js'

let origin = {
        netType: '',
        idc: [],
        network: '',
        gateway: '',
        ips: '',
        operator: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 输入面板
        showBroad (target) {
            let param = {
                value: this[target],
                name: target
            }

            this.$dispatch('showBroad', param)
        },

        // 保存IP
        saveFn () {
            this.$http({
                url: '/ip/ip_add/',
                method: 'POST',
                data: this.$data
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.$data = Object.assign({}, init)

                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error')
                }
            })
        }
    },
    components: {
        vSelect
    },
    vuex: {
        actions: {
            getIpPlan
        },
        getters: {
            idcs,
            netTypes,
            operators
        }
    },
    ready () {
        this.getIpPlan()
    },
    events: {
        'getTxt' (param) {
            let obj = param.name.split('.')

            this[obj[0]] = param.val
        }
    }
}
</script>

<style scoped>

</style>
