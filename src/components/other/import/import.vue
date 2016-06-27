<template>
    <div>
        <form id="file_form" class="form-inline form-search text-center">
            <div class="form-group">
                <label>导入类型：</label>
                <v-select :value.sync="type" :options="types" placeholder="请选择">
                </v-select>
                <label>导入文件：</label>
                <input type="text" class="form-control" onfocus="this.blur()" v-model="road">
                <input id="file" type="file" name="file" v-show="false" @change="changeFn">
                <button type="button" class="btn btn-default" @click="findFile">浏览</button>
                <button type="button" class="btn btn-default" @click="uploadFile">导入</button>
                <a type="button" class="btn btn-default" href="/file/guifan.pdf" target="_blank">下载模板</a>
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
            type: '',
            road: ''
        }
    },
    methods: {

        // 浏览文件
        findFile () {
            $('#file').trigger('click')
        },

        // 改变路径
        changeFn () {
            this.road = $('#file').val()
        },

        // 上传文件
        uploadFile () {
            if (this.road !== '') {
                let _this = this,
                    formData = new FormData($('#file_form')[0])

                formData.append('type', _this.type)

                $.ajax({
                        url: '/package_file_upload/',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        dataType: 'JSON',
                        data: formData
                    })
                    .then(function (data) {
                        if (data.code === 1) {
                            _this.road = ''

                            _this.$dispatch('show-success')
                        } else {
                            _this.$dispatch('show-error')
                        }
                    })
            }    
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