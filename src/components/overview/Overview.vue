<template>
    <div class="overview-box clearfix">
        <div class="left-table pull-left table-view">
            <div class="text-center table-title">
                产品服务器Top30（产品总数：<span v-text="productTotal"></span>）
            </div>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>产品名称</th>
                        <th>服务器数量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="productServer in productServers" v-show="productServers.length !== 0">
                        <td v-text="productServer.productName"></td>
                        <td v-text="productServer.serverNum"></td>
                    </tr>
                    <tr class="text-center" v-show="productServers.length === 0">
                        <td :colspan="2">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="right-table pull-left table-view">
            <div class="text-center table-title">
                设备分布
            </div>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>分类</th>
                        <th>类型</th>
                        <th>数量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="device in devices" v-show="devices.length !== 0">
                        <td v-text="device.sort"></td>
                        <td v-text="device.type"></td>
                        <td v-text="device.num"></td>
                    </tr>
                    <tr class="text-center" v-show="devices.length === 0">
                        <td :colspan="3">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            productTotal: null,
            productServers: [],
            devices: []
        }
    },
    ready () {
        this.$http({
            url: '/product/summary/',
            method: 'POST'
        })
        .then(response => {
            this.$data = Object.assign({}, this.$data, response.data)
        })
    }
}
</script>

<style scoped>
.overview-box {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 30px;
}

.table-view {
    padding: 20px;
    min-height: 750px;
}

.left-table {
    width: 50%;
    border-right: 1px solid #ccc;
}

.right-table {
    width: 50%;
}
</style>