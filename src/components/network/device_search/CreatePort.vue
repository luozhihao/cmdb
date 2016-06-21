<template>
    <modal :show.sync="createPortModal" effect="fade" width="550px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增端口</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <div class="form-group">
                    <label class="control-label col-sm-3">端口号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">所属VLAN：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="vlan" :options="vlans" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">速率：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">用途：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">状态：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">MAC：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">对端设备编号：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="code" :options="codes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">对端设备端口：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="port" :options="ports" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default" @click='createPortModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        createPortModal: false,
        vlans: [],
        vlan: '',
        codes: [],
        code: '',
        ports: [],
        port: ''
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
        vSelect
    },
    events: {
        'showCreatPort' () {
            this.createPortModal = true
        }
    }
}
</script>

<style scoped>
</style>