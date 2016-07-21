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
                <a type="button" class="btn btn-default" href="/file/template_cmdb.xlsx" target="_blank">下载模板</a>
            </div>
        </form>
        <div>
            <div class="import-msg">
                <p v-for="msg in msgs" v-text="msg"></p>
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
                {value: '1', label: '交换机导入'},
                {value: '2', label: '服务器导入'},
                {value: '3', label: '业务树导入'},
                {value: '4', label: '模块服务器关系导入'}
            ],
            type: '',
            road: '',
            msgs: ['【操作说明】', '1、先下载excel模板', '2、红色为必填字段，黑色为非必填字段']
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
            if (this.road !== '' && this.road.endsWith('.xlsx')) {
                let _this = this,
                    formData = new FormData($('#file_form')[0]),
                    url = ''

                // formData.append('type', _this.type)

                switch(this.type) {
                    case '1':
                        url = '/device/switch/import/'
                    case '2':
                        url = '/device/server/import/'
                        break
                }

                if (url) {
                    $.ajax({
                            url: url,
                            type: 'POST',
                            processData: false,
                            contentType: false,
                            dataType: 'JSON',
                            data: formData
                        })
                        .then(function (data) {
                            if (data.code === 200) {
                                _this.road = ''

                                _this.$dispatch('show-success', '导入成功')
                            } else {
                                _this.msgs = data.invalid

                                _this.$dispatch('data.msg')
                                _this.$dispatch('show-error', data.msg)
                            }
                        })
                }
            } else {
                this.$dispatch('show-notify', '导入文件必须为.xlsx后缀的文件')
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

.import-msg > p {
    color: #A04848;
}
</style>