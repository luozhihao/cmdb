<!-- 编辑服务器 -->
<template>
    <modal :show.sync="editServerModal" effect="fade" width="1200px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">编辑服务器</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix form-input">
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="control-label col-sm-4">SN：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">类型：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="system" :options="systems" placeholder="请选择">
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
                    <div class="form-group input-box">
                        <label class="control-label col-sm-4">状态：</label>
                        <div class="col-sm-8">
                            <v-select :value.sync="status" :options="statusArr" placeholder="请选择">
                            </v-select>
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
                    <div class="form-group">
                        <label class="control-label col-sm-4">备注：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>            
                </div>
                <div class="col-sm-3">
                   <div class="form-group">
                        <label class="control-label col-sm-4">设备编号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
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
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="control-label col-sm-4">来源：</label>
                        <div class="col-sm-4 input-box pr0">
                            <v-select :value.sync="origin1" :options="origins1" placeholder="请选择" class="fs12">
                            </v-select>
                        </div>
                        <div class="col-sm-4 input-box pl0">
                            <v-select :value.sync="origin2" :options="origins2" placeholder="请选择" class="fs12">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">型号：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder="">
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
                        <label class="control-label col-sm-4">所属部门：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" :readonly="true">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">所属产品：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" :readonly="true">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">运维负责人：</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" :readonly="true">
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="control-label col-sm-4">所属Set：</label>
                        <div class="col-sm-8">
                            <textarea rows="4" class="form-control" :readonly="true"></textarea> 
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">所属Module：</label>
                        <div class="col-sm-8">
                            <textarea rows="4" class="form-control" :readonly="true"></textarea> 
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-4">IP：</label>
                        <div class="col-sm-8">
                            <textarea rows="4" class="form-control" :readonly="true"></textarea> 
                        </div>
                    </div>
                </div>
            </form>
            <div class="text-center mt30 mb20">
                <button type="button" class="btn btn-default">保存</button>
                <button type="button" class="btn btn-default">更新</button>
                <button type="button" class="btn btn-default" @click='editServerModal = false'>取消</button>
            </div>
            <table class="table table-hover table-small table-scroll">
                <thead>
                    <tr>
                        <th>端口号</th>
                        <th>IP</th>
                        <th>MAC</th>
                        <th>速率</th>
                        <th>状态</th>
                        <th>用途</th>
                        <th>对端设备</th>
                        <th>对端设备VLAN</th>
                        <th>对端设备端口</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="port in ports" v-show="ports.length !== 0">
                        <td v-text="port.portNum"></td>
                        <td v-text="port.ip"></td>
                        <td v-text="port.mac"></td>
                        <td v-text="port.speed"></td>
                        <td v-text="port.status"></td>
                        <td v-text="port.use"></td>
                        <td v-text="port.device"></td>
                        <td v-text="port.deviceVlan"></td>
                        <td v-text="port.devicePort"></td>
                    </tr>
                    <tr v-show="ports.length === 0" class="text-center">
                        <td colspan="9">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div slot="modal-footer" class="modal-footer">
        </div>
    </modal>
</template>

<script>
import { modal, datepicker } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        editServerModal: false,
        ports: [
            {portNum: '111', ip: '', mac: '', speed: '', status: '', use: '', device: '', deviceVlan: '', devicePort: ''}
        ],
        rooms: [],
        room: '',
        frames: [],
        frame: '',
        seats: [],
        seat: '',
        statusArr: [],
        status: '',
        systems: [],
        system: '',
        firms: [],
        firm: '',
        origins1: [{value: '蜗牛', label: '蜗牛'}],
        origin1: '蜗牛',
        origins2: [{value: '北京蜗牛', label: '北京蜗牛'}],
        origin2: '北京蜗牛',
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
        'showEditServer' () {
            this.editServerModal = true
        }
    }
}
</script>

<style scoped>
label.col-sm-4 {
    padding-right: 5px;
    padding-left: 5px;
}
</style>