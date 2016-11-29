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
                        <v-select :value.sync="idc" :options="idcs" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">网段：</label>
                    <div class="col-sm-8">
                        <popover
                            trigger="focus"
                            effect="scale"
                            placement="bottom"
                            title="提示"
                            content="网段格式只能为xxx.xxx.xxx.0/24">
                            <input type="text" class="form-control" v-model="network">
                        </popover>
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
            <button 
                type="button" 
                class="btn btn-default" 
                @click="saveFn" 
                :disabled="netType && idc && gateway.trim() && !loading ? false : true"
                v-text="loading ? '添加中，请稍后...' : '保存'"
            >
                保存
            </button>
        </div>
    </div>
</template>

<script>
import { popover } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { getIpPlan } from '../../../vuex/action.js'
import { idcs, netTypes, operators } from '../../../vuex/getters.js'

export default {
    data () {
        return {
            netType: '',
            idc: '',
            network: '',
            gateway: '',
            ips: '',
            operator: '',
            loading: false
        }
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
            let regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.([1-9]|\d{2}|1\d\d|2[0-4]\d|25[0-4])$/,
                regNetwork = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.0\/24$/

            if (!regNetwork.test(this.network.trim()) && this.network.trim()) {
                this.$dispatch('show-notify', '网段格式错误，请检查')

                return false
            }

            if (!regIp.test(this.gateway.trim())) {
                this.$dispatch('show-notify', '网关格式错误，请检查')

                return false
            }

            let vaild = true,
                newArr = []

            if (this.ips.trim()) {
                let ipArr = this.ips.split(',')
                    
                ipArr.forEach(e => {
                    if (e.indexOf('-') !== -1 && e.split('-').length === 2) {
                        let first = e.split('-')[0].trim(),
                            second = e.split('-')[1].trim()

                        if (regIp.test(first) && regIp.test(second)) {
                            newArr.push(first + '-' + second)
                        } else {
                            this.$dispatch('show-notify', 'ip段格式错误，请检查')

                            vaild = false
                        }
                    } else {
                        if (regIp.test(e.trim())) {
                            newArr.push(e.trim())

                        } else {
                            this.$dispatch('show-notify', 'ip格式错误，请检查')

                            vaild = false
                        }
                    }
                })
            }

            if (vaild) {
                this.loading = true

                this.$http({
                    url: '/ip/ip_add/',
                    method: 'POST',
                    data: {
                        netType: this.netType,
                        idc: this.idc,
                        network: this.network,
                        gateway: this.gateway,
                        ips: newArr.join(','),
                        operator: this.operator
                    }
                })
                .then(response => {
                    if (response.data.code === 200) {
                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error', response.data.msg)
                    }

                    this.loading = false
                })
            }
        }
    },
    components: {
        vSelect,
        popover
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
