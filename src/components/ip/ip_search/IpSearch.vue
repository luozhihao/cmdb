<!-- IP查询 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">IP：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.ip" @click="showBroad('param.ip')">
                    </div>
                </div>
                 <div class="form-group input-box">
                    <label class="control-label col-sm-4">运营商：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.operator" :options="operators" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="control-label col-sm-4">机房：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.room" :options="rooms" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">类型：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="下拉框">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">网段：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="control-label col-sm-4">状态：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="下拉框">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default">
                查询
            </button>
        </div>
        <div class="text-center table-title">
            查询结果
        </div>
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th v-for="title in titles" v-text="title"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                    <td :title="list.ipAddress" v-text="list.ipAddress" v-show="list.ipAddress"></td>
                    <td :title="list.network" v-text="list.network" v-show="list.network"></td>
                    <td :title="list.mask" v-text="list.mask" v-show="list.mask"></td>
                    <td :title="list.gateway" v-text="list.gateway" v-show="list.gateway"></td>
                    <td :title="list.ipStatus" v-text="list.ipStatus" v-show="list.ipStatus"></td>
                    <td :title="list.netType" v-text="list.netType" v-show="list.netType"></td>
                    <td :title="list.idcRoom" v-text="list.idcRoom" v-show="list.idcRoom"></td>
                    <td v-show="list.device"><a class="pointer" v-text="list.device"></a></td>
                </tr>
                <tr class="text-center" v-show="tableList.length === 0">
                    <td :colspan="titles.length">暂无数据</td>
                </tr>
            </tbody>
        </table>
        <div class="clearfix mt30">
            <boot-page :async="false" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
        </div>
    </div>
</template>

<script>
import bootPage from '../../global/BootPage.vue'
import vSelect from '../../global/Select.vue'

let origin = {
        titles: ['IP地址', '网段', '掩码', '网关', 'IP状态', '网络类型', '所在机房', '关联设备'],
        tableList: [
            {ipAddress: '58.215.168.225', network: '58.215.168.0/24', mask: '255.255.255.0', gateway: '58.215.168.96', ipStatus: '已分配', netType: '电信', idcRoom: '无锡国际机房', device: 'SGSW00012'},
            {ipAddress: '58.215.168.225', network: '58.215.168.0/24', mask: '255.255.255.0', gateway: '58.215.168.96', ipStatus: '已分配', netType: '电信', idcRoom: '无锡国际机房', device: 'SGSW00012'},
            {ipAddress: '58.215.168.225', network: '58.215.168.0/24', mask: '255.255.255.0', gateway: '58.215.168.96', ipStatus: '已分配', netType: '电信', idcRoom: '无锡国际机房', device: 'SGSW00012'},
            {ipAddress: '58.215.168.225', network: '58.215.168.0/24', mask: '255.255.255.0', gateway: '58.215.168.96', ipStatus: '已分配', netType: '电信', idcRoom: '无锡国际机房', device: 'SGSW00012'},
            {ipAddress: '58.215.168.225', network: '58.215.168.0/24', mask: '255.255.255.0', gateway: '58.215.168.96', ipStatus: '已分配', netType: '电信', idcRoom: '无锡国际机房', device: 'SGSW00012'}
        ],
        lenArr: [10, 50, 100],
        pageLen: 5,
        url: '',
        operators: [],
        rooms: [],
        param: {
            ip: '',
            operator: '',
            room: ''
        }
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 输入面板
        showBroad (target) {
            let obj = target.split('.')

            let param = {
                value: this[obj[0]][obj[1]],
                name: target
            }

            this.$dispatch('showBroad', param)
        },

        // 刷新数据
        refresh () {
            this.$broadcast('refresh')
        }
    },
    components: {
        bootPage,
        vSelect
    },
    events: {
        'getTxt' (param) {
            let obj = param.name.split('.')

            this[obj[0]][obj[1]] = param.val
        }
    }
}
</script>

<style scoped>

</style>
