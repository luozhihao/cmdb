<!-- 新增服务器 -->
<template>
    <modal :show.sync="creatServerModal" effect="fade" width="850px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增服务器</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix form-input">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="control-label col-sm-4">SN：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">来源：</label>
                        <div class="col-sm-4 input-box pr0">
                            <v-select :value.sync="origin1" :options="origins1" placeholder="请选择">
                            </v-select>
                        </div>
                        <div class="col-sm-4 input-box pl0">
                            <v-select :value.sync="origin2" :options="origins2" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">机房：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="room" :options="rooms" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">机架：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="frame" :options="frames" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">机位：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="seat" :options="seats" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">入库时间：</label>
                        <div class="col-sm-8">
                            <datepicker
                              :value.sync="addTime"
                              :format="'yyyy-MM-dd'"
                              :show-reset-button="true">
                            </datepicker>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">出厂时间：</label>
                        <div class="col-sm-8">
                            <datepicker
                              :value.sync="factoryTime"
                              :format="'yyyy-MM-dd'"
                              :show-reset-button="true">
                            </datepicker>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">采购时间：</label>
                        <div class="col-sm-8">
                            <datepicker
                              :value.sync="procureTime"
                              :format="'yyyy-MM-dd'"
                              :show-reset-button="true">
                            </datepicker>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">型号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">状态：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">备注：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">类型：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="system" :options="systems" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                     <div class="form-group">
                        <label class="control-label col-sm-4">物理主机编号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">资产编号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">财务编号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">发票编号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="control-label col-sm-4">电压：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">电流：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">功率：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">厂商：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="firm" :options="firms" placeholder="请选择">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">质保期限：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default" @click='creatServerModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal, datepicker } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        creatServerModal: false,
        rooms: [],
        room: '',
        frames: [],
        frame: '',
        seats: [],
        seat: '',
        origins1: [],
        origin1: '',
        origins2: [],
        origin2: '',
        firms: [],
        firm: '',
        statusArr: [],
        status: '',
        systems: [],
        system: '',
        addTime: '',
        factoryTime: '',
        procureTime: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

    },
    components: {
        modal,
        vSelect,
        datepicker
    },
    events: {
        'showCreateServer' () {
            this.creatServerModal = true
        }
    }
}
</script>

<style scoped>
</style>