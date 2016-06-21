<!-- IP回收 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
        <div class="col-sm-3">
            <div class="form-group">
                <label class="col-sm-4 control-label">SN：</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.sn" @click="showBroad('param.sn')">
                </div>
            </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">设备编号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.deviceNum" @click="showBroad('param.deviceNum')">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">IP地址：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="多个，精确" onfocus="this.blur()" v-model="param.ip" @click="showBroad('param.ip')">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default">
                查询
            </button>
            <button type="button" class="btn btn-default">
                批量回收
            </button>
        </div>
        <div class="text-center table-title">
            查询结果
        </div>
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th width="3%"><input type="checkbox" v-model="checkedAll"></th>
                    <th v-for="title in titles" v-text="title"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                    <td><input type="checkbox" :id="list.id" :value="list.id" v-model="checkedIds"></td>
                    <td :title="list.device" v-text="list.device" v-show="list.device"></td>
                    <td :title="list.ipAddress" v-text="list.ipAddress" v-show="list.ipAddress"></td>
                    <td :title="list.netType" v-text="list.netType" v-show="list.netType"></td>
                    <td :title="list.network" v-text="list.network" v-show="list.network"></td>
                    <td :title="list.mask" v-text="list.mask" v-show="list.mask"></td>
                    <td :title="list.gateway" v-text="list.gateway" v-show="list.gateway"></td>
                    <td>
                        <button class="btn btn-default btn-small">
                            <span class="table-icon glyphicon glyphicon-trash"></span>
                        </button>
                    </td>
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

export default {
    data () {
        return {
            checkedAll: false,
            checkedIds: [],
            titles: ['关联设备', 'IP地址', '网络类型', '网段', '掩码', '网关', '操作'],
            tableList: [
                {id: 1, device: 'SGFW00001', ipAddress: '170.1.1.110', netType: '电信', network: '170.1.1.0/24', mask: '255.255.255.0', gateway: '58.215.168.96'},
                {id: 2, device: 'SGFW00001', ipAddress: '170.1.1.110', netType: '电信', network: '170.1.1.0/24', mask: '255.255.255.0', gateway: '58.215.168.96'},
                {id: 3, device: 'SGFW00001', ipAddress: '170.1.1.110', netType: '电信', network: '170.1.1.0/24', mask: '255.255.255.0', gateway: '58.215.168.96'},
                {id: 4, device: 'SGFW00001', ipAddress: '170.1.1.110', netType: '电信', network: '170.1.1.0/24', mask: '255.255.255.0', gateway: '58.215.168.96'},
                {id: 5, device: 'SGFW00001', ipAddress: '170.1.1.110', netType: '电信', network: '170.1.1.0/24', mask: '255.255.255.0', gateway: '58.215.168.96'},
                {id: 6, device: 'SGFW00001', ipAddress: '170.1.1.110', netType: '电信', network: '170.1.1.0/24', mask: '255.255.255.0', gateway: '58.215.168.96'}
            ],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '',
            param: {
                sn: '',
                deviceNum: '',
                ip: ''
            }
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$broadcast('refresh')
        },

        // 输入面板
        showBroad (target) {
            let obj = target.split('.')

            let param = {
                value: this[obj[0]][obj[1]],
                name: target
            }

            this.$dispatch('showBroad', param)
        },
    },
    components: {
        bootPage
    },
    watch: {
        'checkedAll' (newVal) {
            if (newVal) {
                if (this.checkedIds.length !== this.tableList.length) {
                    let _this = this

                    _this.checkedIds = []
                    _this.tableList.forEach(function(e) {
                        _this.checkedIds.push(e.id)
                    })
                }
            } else {
                if (this.checkedIds.length === this.tableList.length) {
                    this.checkedIds = []
                }
            }
        },
        'checkedIds' (newVal) {
            if (newVal.length === this.tableList.length && this.tableList.length !== 0) {
                this.checkedAll = true
            } else {
                this.checkedAll = false
            }
        }
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
