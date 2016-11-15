<template>
    <modal :show.sync="deviceSetModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">
                添加关联设备
            </h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal clearfix">
                <div class="form-group input-box mb0">
                    <label class="control-label col-sm-3">设备编号：</label>
                    <div class="col-sm-9">
                        <typeahead
                            :query.sync="deviceId"
                            :async="'/ip/ip_add_device/?name='"
                            :key="'name'"
                            placeholder="按回车键添加"
                        >
                        </typeahead>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-primary" @click="okFn">
                确认
            </button>
            <button type="button" class="btn btn-default" @click="deviceSetModal = false">
                取消
            </button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import typeahead from '../../global/Typeahead.vue'

export default {
    data () {
        return {
            id: '',
            deviceSetModal: false,
            deviceId: ''
        }
    },
    methods: {
        okFn () {
            if (this.deviceId) {
                this.$http({
                    url: '/ip/ip_add_device/',
                    method: 'POST',
                    data: {
                        ip_id: this.id,
                        device_id: this.deviceId
                    }
                })
                .then(response => {
                    if (response.data.code === 200) {
                        this.$dispatch('show-success', '设置成功')
                        this.$dispatch('refresh')
                    } else {
                        this.$dispatch('show-error', '设置失败了')
                    }

                    this.deviceSetModal = false
                    this.deviceId = ''
                    this.id = ''
                })
            } else {
                this.$dispatch('show-notify', '请输入关联设备编号')
            }
        }
    },  
    components: {
        modal,
        typeahead
    },
    events: {
        'setDeviceNum' (param) {
            this.deviceSetModal = true
            this.id = param
        }
    }
}
</script>

<style scoped>
.modal-body {
    min-height: 200px;
    padding-top: 30px;
}
</style>