<!-- IP规划 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
        <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="netType" :options="netTypes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">IP地址：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="ips">
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
                    <label class="col-sm-4 control-label">规划机房：</label>
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
                    <label class="col-sm-4 control-label">网关：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="gateway">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default">
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
    }

export default {
    data () {
        return origin
    },
    methods: {

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
    }
}
</script>

<style scoped>

</style>
