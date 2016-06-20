<template>
    <div>
        <form class="form-inline form-search text-center">
            <div class="form-group">
                <label>导入类型：</label>
                <v-select :value.sync="type" :options="types" placeholder="请选择">
                </v-select>
                <label>导入文件：</label>
                <input type="text" class="form-control" onfocus="this.blur()">
                <button type="button" class="btn btn-default">浏览</button>
                <button type="button" class="btn btn-default">导入</button>
                <button type="button" class="btn btn-default">下载模板</button>
            </div>
        </form>
        <div>
            <div class="import-msg">
                <p>【操作说明】</p>
                <p>1、先下载excel模板</p>
                <p>2、红色为必填字段，黑色为非必填字段</p>
            </div>
        </div>
    </div>
</template>

<script>
import vSelect from '../../global/Select.vue'

export default {
    data () {
        return {
            types: [
                {value: '机房导入', label: '机房导入'},
                {value: '机架位导入', label: '机架位导入'},
                {value: '交换机导入', label: '交换机导入'},
                {value: '服务器导入', label: '服务器导入'},
                {value: '业务树导入', label: '业务树导入'},
                {value: '模块服务器关系导入', label: '模块服务器关系导入'}
            ],
            type: ''
        }
    },
    components: {
        vSelect
    }
}
</script>

<style scoped>
.import-msg {
    width: 600px;
    padding: 20px;
    margin: 150px auto 0;
    text-align: center;
    border: 1px solid #ccc;
}
</style>