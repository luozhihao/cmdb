<!-- 机房连通性 -->
<template>
    <div>  
        <form class="form-horizontal clearfix form-search">
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">机房名称：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.idc" :options="idcs" placeholder="请选择" :search="true">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group input-box">
                    <label class="col-sm-4 control-label">连通类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="param.connType" :options="connTypes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default" @click="refresh">
                查询
            </button>
            <button 
                v-if="perm.打通机房 || perm.all" 
                type="button" 
                class="btn btn-default" 
                @click="$broadcast('showConnect')"
            >
                机房打通
            </button>
        </div>
        <div class="text-center table-title">
            查询结果
        </div>
        <div class="table-box">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th v-for="title in titles" v-text="title"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                        <td :title="list.roomFrom" v-text="list.roomFrom"></td>
                        <td :title="list.roomTo" v-text="list.roomTo"></td>
                        <td :title="list.connType" v-text="list.connType"></td>
                        <td>
                            <button 
                                v-if="perm.打通机房 || perm.all" 
                                type="button" 
                                class="btn btn-default set-btn" 
                                @click="$broadcast('showConfirm', list.id)"
                            >
                                切断
                            </button>
                        </td>
                    </tr>
                    <tr class="text-center" v-show="tableList.length === 0">
                        <td :colspan="titles.length">暂无数据</td>
                    </tr>
                </tbody>
                <tfoot> 
                    <tr>
                        <td :colspan="titles.length">
                            <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <spinner id="spinner-box" :size="md" :fixed="false" 
                 text="数据加载中，请稍后..." v-ref:spinner>
            </spinner>
        </div>
        <connect-modal></connect-modal>
        <confirm-modal></confirm-modal>
    </div>
</template>

<script>
import { spinner } from 'vue-strap'
import bootPage from '../../global/BootPage.vue'
import connectModal from './SetConnect.vue'
import confirmModal from '../../global/Confirm.vue'
import vSelect from '../../global/Select.vue'
import { getRoomConnect } from '../../../vuex/action.js'
import { idcs, connTypes, perm } from '../../../vuex/getters.js'

export default {
    data () {
        return {
            titles: ['机房一', '机房二', '连通类型', '操作'],
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/idc/room_connect_query/',
            param: {
                idc: '',
                connType: ''
            }
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$refs.spinner.show()
            this.$refs.page.refresh()
        },

        // 切断
        disconnect (id) {
            this.$http({
                url: '/idc/room_connect_delete/',
                method: 'POST',
                data: {
                    id: id
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.refresh()

                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error')
                }
            })
        }
    },
    components: {
        bootPage,
        vSelect,
        spinner,
        connectModal,
        confirmModal
    },
    vuex: {
        actions: {
            getRoomConnect
        },
        getters: {
            perm,
            idcs,   // 获取机房位置
            connTypes
        }
    },
    ready () {
        this.getRoomConnect()
        this.$refs.spinner.show()
    },
    events: {

        // 获取表格数据
        'data' (param) {
            this.tableList = param.data
            this.$refs.spinner.hide()
        },

        // 刷新表格
        'refresh' () {
            this.refresh()
        },

        // 确认切断
        'confirm' (param) {
            this.disconnect(param)
        }
    }
}
</script>

<style scoped>
.dropdown-width {
    width: 500px;
}

.dropdown-li {
    width: 50%;
}

.pd20 {
    padding: 20px;
}

.mt20 {
    margin-top: 20px;
}
</style>
