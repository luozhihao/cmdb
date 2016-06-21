<!-- IP规划 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
        <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">网络类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="network" :options="networks" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">IP地址：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="多个">
                    </div>
                </div>
            </div>
            <div class="col-sm-3 input-box">
                <div class="form-group">
                    <label class="col-sm-4 control-label">规划机房：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="idc" :options="idcs" placeholder="请选择" multiple>
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">网段：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">网关：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
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

let origin = {
        networks: [],
        network: '',
        idcs: [],
        idc: []
    }

export default {
    data () {
        return origin
    },
    methods: {

    },
    components: {
        vSelect
    }
}
</script>

<style scoped>

</style>
