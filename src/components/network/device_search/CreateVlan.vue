<template>
    <modal :show.sync="createVlanModal" effect="fade" width="550px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">新增VLAN</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <div class="form-group">
                    <label class="control-label col-sm-3">名称：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="name">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">速率：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="speed">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">用途：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="use">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">IP：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="ip" :options="ips" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default" @click='createVlanModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        createVlanModal: false,
        name: '',
        speed: '',
        use: '',
        ip: '',
        ips: []
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
        'showCreatVlan' () {
            this.createVlanModal = true
        }
    }
}
</script>

<style scoped>
</style>