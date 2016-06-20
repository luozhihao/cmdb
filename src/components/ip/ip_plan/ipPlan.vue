<!-- IP规划 -->
<template>
    <div>
        <form class="form-horizontal clearfix form-search">
        <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">网络类型：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="下拉框">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">IP地址：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="多个">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">规划机房：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" value="下拉，多选">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">网段：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="form-group">
                    <label class="col-sm-4 control-label">网关：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
        </form>
        <div class="text-center btn-operate">
            <button type="button" class="btn btn-default">
                保存
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
 
        }
    },
    methods: {

    },
    components: {

    }
}
</script>

<style scoped>

</style>
