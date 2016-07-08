<style scoped>
.left-tree {
    position: relative;
    width: 30%;
}

.right-tree {
    width: 30%;
    
}

.table-tree {
    width: 40%;
    padding: 20px;
}

.tree-box {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 30px;
}

.tlist {
    border-right: 1px solid #ccc;
    padding: 20px;
    min-height: 750px;
}

.h650 {
    min-height: 650px;
}

.dragicon {
    position: absolute;
    right: -8px;
    top: 46%;
    font-size: 16px;
    color: #676767;
}

</style>

<template>
    <div>
        <form class="form-inline text-center">
            <div class="form-group">
                <v-select :value.sync="product" :options="products" placeholder="请选择产品" :search="true">
                </v-select>
            </div>
        </form>
        <div class="clearfix tree-box">
            <div class="left-tree pull-left tlist">
                <div id="tree1" class="ztree"></div>
                <span class="dragicon glyphicon glyphicon-random"></span>
            </div>
            <div class="right-tree pull-left tlist">
                <div id="tree2" class="ztree"></div>
            </div>
            <div class="table-tree pull-left">
                <div class="text-center table-title">
                    查询结果
                    <div class="pull-left">
                        <button type="button" class="btn btn-default set-btn">资源回收</button>
                    </div>
                </div>
                <table class="table table-hover table-bordered h650">
                    <thead>
                        <tr>
                            <th width="6%"><input type="checkbox" v-model="checkedAll"></th>
                            <th>IP</th>
                            <th>服务器编码</th>
                            <th>SN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                            <td><input type="checkbox" :id="list.id" :value="list.id" v-model="checkedIds"></td>
                        </tr>
                        <tr class="text-center" v-show="tableList.length === 0">
                            <td :colspan="4">暂无数据</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td :colspan="4">
                                <boot-page :async="false" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { spinner } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import bootPage from '../../global/BootPage.vue'

export default {
    data () {
        return {
            checkedAll: false,
            checkedIds: [],
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '',
            param: {

            }
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$refs.spinner.show()
            this.checkedIds = []
            this.$broadcast('refresh')
        }
    },
    ready () {
        var setting = {
            view: {
                selectedMulti: false
            },
            
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
            }
        };

        var nodedata = [
            { id: 1, pId: 0, name: "航海世纪", open: true },
            { id: 11, pId: 1, name: "父节点 1-1",  open: true },
            { id: 111, pId: 11, name: "叶子节点 1-1-1",  }
        ];

        require(['zTree/js/jquery.ztree.all.min.js', 'zTree/css/zTreeStyle/zTreeStyle.css'], function () {
            $.fn.zTree.init($("#tree1"), setting, nodedata);
        })
    },
    components: {
        vSelect,
        bootPage,
        spinner
    },
    watch: {
        'checkedAll' (newVal) {
            if (newVal) {
                if (this.checkedIds.length !== this.tableList.length) {
                    let _this = this

                    _this.checkedIds = []
                    _this.tableList.forEach(function(e) {
                        _this.checkedIds.push(e.id)
                    })
                }
            } else {
                if (this.checkedIds.length === this.tableList.length) {
                    this.checkedIds = []
                }
            }
        },
        'checkedIds' (newVal) {
            if (newVal.length === this.tableList.length && this.tableList.length !== 0) {
                this.checkedAll = true
            } else {
                this.checkedAll = false
            }
        }
    }
}
</script>