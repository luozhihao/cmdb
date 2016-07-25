<style scoped>
.left-tree {
    position: relative;
    width: 20%;
}

.right-tree {
    width: 25%;

}

.table-tree {
    width: 55%;
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
    height: 750px;
    overflow: auto;
}

.h650 {
    max-height: 650px;
}

.dragicon {
    position: absolute;
    left: 20.2%;
    top: 400px;
    font-size: 16px;
    color: #676767;
}
</style>

<template>
    <div>
        <form class="form-inline text-center">
            <div class="form-group">
                <v-select :value.sync="param.product" :options="products" placeholder="请选择产品" :search="true">
                </v-select>
            </div>
        </form>
        <div class="clearfix tree-box">
            <span class="dragicon glyphicon glyphicon-random"></span>
            <div class="left-tree pull-left tlist">
                <div>业务模型</div>
                <div id="tree1" class="ztree"></div>
            </div>
            <div class="right-tree pull-left tlist">
                <div>业务实例</div>
                <div id="tree2" class="ztree"></div>
            </div>
            <div class="table-tree pull-left">
                <div class="text-center table-title">
                    查询结果
                    <div class="pull-left">
                        <button type="button" class="btn btn-default set-btn" @click="deleteSource">资源回收</button>
                    </div>
                </div>
                <table class="table table-hover table-bordered h650">
                    <thead>
                        <tr>
                            <th width="6%"><input type="checkbox" v-model="checkedAll"></th>
                            <th width="54%">IP</th>
                            <th width="20%">服务器编号</th>
                            <th width="20%">SN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0">
                            <td><input type="checkbox" :id="list.id" :value="list.id" v-model="checkedIds"></td>
                            <td v-text="list.ip" :title="list.ip"></td>
                            <td>
                                <a class="pointer" v-text="list.serial" @click="$broadcast('viewEditServer', list.id)"></a>
                            </td>
                            <td v-text="list.sn" :title="list.sn"></td>
                        </tr>
                        <tr class="text-center" v-show="tableList.length === 0">
                            <td :colspan="4">暂无数据</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td :colspan="4">
                                <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div class="modal fade" id="treeModal" tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="treeModalLabel">新增实例节点</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label id="lblName1" for="inputBox1" class="control-label"></label>
                                <input id="txtName1" type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label id="lblName2" for="inputBox2" class="control-label" style="display:none"></label>
                                <input id="txtName2" type="text" class="form-control" style="display:none">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button id="btnCancel" type="button" class="btn btn-default">取消</button>
                        <button id="btnConfirm" type="button" class="btn btn-primary">确认</button>
                  </div>
                </div>
            </div>
        </div>

        <modal :show.sync="serverModal" effect="fade" width="1400px">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">服务器查询</h4>
            </div>
            <div slot="modal-body" class="modal-body max-height">
                <server-modal></server-modal>
            </div>
            <div slot="modal-footer">
            </div>
        </modal>

        <confirm-modal></confirm-modal>
        <edit-server-modal></edit-server-modal>
    </div>
</template>

<script>
import { spinner, modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import bootPage from '../../global/BootPage.vue'
import { getTreeSelect } from '../../../vuex/action.js'
import { treeProducts } from '../../../vuex/getters.js'
import serverModal from '../../server/server_search/ServerSearch.vue'
import editServerModal from '../../server/server_search/EditServer.vue'
import confirmModal from '../../global/Confirm.vue'
import '../../../assets/js/bootstrap/modal.js'

export default {
    data () {
        return {
            serverModal: false,
            checkedAll: false,
            checkedIds: [],
            tableList: [],
            lenArr: [10, 50, 100],
            pageLen: 5,
            url: '/node/getServer/',
            param: {
                curNode: '',
                product: ''
            }
        }
    },
    methods: {

        // 刷新数据
        refresh () {
            this.checkedIds = []
            this.$refs.page.refresh()
        },

        // 资源回收
        deleteSource () {
            if (this.checkedIds.length) {
                this.$broadcast('showConfirm')
            } else {
                this.$dispatch('show-notify', '请选择回收项')
            }
        },

        // 鼠标划过事件
        addHoverDom (treeId, treeNode) {
            var _this = this;

            if (treeId == "tree1") {
                var treeObj = $.fn.zTree.getZTreeObj("tree1");
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#" + treeNode.tId + "_syncBtn1").length > 0) return;
                if (treeNode.type == 2) {
                    var syncStr = "<span class='button cancel' id='" + treeNode.tId + "_cancelBtn1' title='删除所有实例'></span>";
                    sObj.after(syncStr);
                    var syncStr = "<span class='button sync' id='" + treeNode.tId + "_syncBtn1' title='同步到实例'></span>";
                    sObj.after(syncStr);
                    $(document).off('click',"#"+treeNode.tId+"_cancelBtn1").on('click',"#"+treeNode.tId+"_cancelBtn1",function(){
                         var res=confirm("确定要删除该节点的所有实例吗？");
                         if(res){
                             $.post("/node/removeNodeAll/",{"modelID":treeNode.id},function(data){
                                if(data.code==500){
                                    alert(data.msg);
                                }
                                _this.getProduct();
                             },"json");
                         }
                    });
                    $(document).off('click',"#"+treeNode.tId+"_syncBtn1").on('click',"#"+treeNode.tId+"_syncBtn1",function(){
                         var res=confirm("确定要将该节点同步到所有实例吗？");
                         if(res){
                             $.post("/node/sync/",{"modelID":treeNode.id,"productID":_this.param.product},function(data){
                                if(data.code==500){
                                    alert(data.msg);
                                }else{
                                    alert("同步成功");
                                }
                                _this.getProduct();
                             },"json");
                         }
                    });
                } else if (treeNode.type == 1) {
                    if (treeNode.level == 0) {
                        var moduleStr = "<span class='button ico_docu' id='" + treeNode.tId + "_docBtn1' title='添加Module'></span>";
                        sObj.after(moduleStr);
                        var setStr = "<span class='button ico_close' id='" + treeNode.tId + "_dirBtn1' title='添加Set'></span>";
                        sObj.after(setStr);
                        var syncStr = "<span class='button sync' id='" + treeNode.tId + "_syncBtn1' title='同步到实例'></span>";
                        sObj.after(syncStr);
                        var nodes = treeObj.getNodesByParam("type", "1", treeNode);
                        if (nodes.length > 0) {
                            $("#" + treeNode.tId + "_dirBtn1").css("display", "none");
                        }
                        $("#" + treeNode.tId + "_edit").css("display", "none");
                        $("#" + treeNode.tId + "_remove").css("display", "none");

                        $(document).off('click',"#"+treeNode.tId+"_dirBtn1").on('click',"#"+treeNode.tId+"_dirBtn1",function(){
                            treeNode = treeObj.addNodes(treeNode, -1, { id: _this.uuid(), pId: treeNode.id, type: 1, name: "新Set(请重命名)",open: true, isParent: true });
                            treeObj.editName(treeNode[0]);
                        });
                        $(document).off('click',"#"+treeNode.tId+"_docBtn1").on('click',"#"+treeNode.tId+"_docBtn1",function(){
                            treeNode = treeObj.addNodes(treeNode, -1, { id: _this.uuid(), pId: treeNode.id, type: 2, name: "新Module(请重命名)" });
                            treeObj.editName(treeNode[0]);
                        });
                        $(document).off('click',"#"+treeNode.tId+"_syncBtn1").on('click',"#"+treeNode.tId+"_syncBtn1",function(){
                             var res=confirm("确定要将该节点同步到所有实例吗？");
                             if(res){
                                 $.post("/node/sync/",{"modelID":treeNode.id,"productID":_this.param.product},function(data){
                                    if(data.code==500){
                                        alert(data.msg);
                                    }else{
                                        alert("同步成功");
                                    }
                                    _this.getProduct();
                                 },"json");
                             }
                        });
                    } else if (treeNode.level == 1) {
                        var syncStr = "<span class='button cancel' id='" + treeNode.tId + "_cancelBtn1' title='删除所有实例'></span>";
                        sObj.after(syncStr);
                        var moduleStr = "<span class='button ico_docu' id='" + treeNode.tId + "_docBtn1' title='添加Module'></span>";
                        sObj.after(moduleStr);
                        var setStr = "<span class='button ico_close' id='" + treeNode.tId + "_dirBtn1' title='添加Set'></span>";
                        sObj.after(setStr);
                        var syncStr = "<span class='button sync' id='" + treeNode.tId + "_syncBtn1' title='同步到实例'></span>";
                        sObj.after(syncStr);
                        var nodes = treeObj.getNodesByParam("type", "1", treeNode);
                        if (nodes.length > 0) {
                            $("#" + treeNode.tId + "_dirBtn1").css("display", "none");
                        }
                        $(document).off('click',"#"+treeNode.tId+"_dirBtn1").on('click',"#"+treeNode.tId+"_dirBtn1",function(){
                            treeNode = treeObj.addNodes(treeNode, -1, { id: _this.uuid(), pId: treeNode.id, type: 1, name: "新Set(请重命名)",open: true, isParent: true });
                            treeObj.editName(treeNode[0]);
                        });
                        $(document).off('click',"#"+treeNode.tId+"_docBtn1").on('click',"#"+treeNode.tId+"_docBtn1",function(){
                            treeNode = treeObj.addNodes(treeNode, -1, { id: _this.uuid(), pId: treeNode.id, type: 2, name: "新Module(请重命名)" });
                            treeObj.editName(treeNode[0]);
                        });
                        $(document).off('click',"#"+treeNode.tId+"_cancelBtn1").on('click',"#"+treeNode.tId+"_cancelBtn1",function(){
                            var res=confirm("确定要删除该节点的所有实例吗？");
                            if(res){
                                $.post("/node/removeNodeAll/",{"modelID":treeNode.id},function(data){
                                    if(data.code==500){
                                        alert(data.msg);
                                    }
                                    _this.getProduct();
                                },"json");
                            }
                        });
                        $(document).off('click',"#"+treeNode.tId+"_syncBtn1").on('click',"#"+treeNode.tId+"_syncBtn1",function(){
                             var res=confirm("确定要将该节点同步到所有实例吗？");
                             if(res){
                                 $.post("/node/sync/",{"modelID":treeNode.id,"productID":_this.param.product},function(data){
                                    if(data.code==500){
                                        alert(data.msg);
                                    }else{
                                        alert("同步成功");
                                    }
                                    _this.getProduct();
                                 },"json");
                             }
                        });
                    } else if (treeNode.level == 2) {
                        var syncStr = "<span class='button cancel' id='" + treeNode.tId + "_cancelBtn1' title='删除所有实例'></span>";
                        sObj.after(syncStr);
                        var moduleStr = "<span class='button ico_docu' id='" + treeNode.tId + "_docBtn1' title='添加Module'></span>";
                        sObj.after(moduleStr);
                        var syncStr = "<span class='button sync' id='" + treeNode.tId + "_syncBtn1' title='同步到实例'></span>";
                        sObj.after(syncStr);
                        $(document).off('click',"#"+treeNode.tId+"_docBtn1").on('click',"#"+treeNode.tId+"_docBtn1",function(){
                            treeNode = treeObj.addNodes(treeNode, -1, { id: _this.uuid(), pId: treeNode.id, type: 2, name: "新Module(请重命名)" });
                            treeObj.editName(treeNode[0]);
                        });
                        $(document).off('click',"#"+treeNode.tId+"_cancelBtn1").on('click',"#"+treeNode.tId+"_cancelBtn1",function(){
                            var res=confirm("确定要删除该节点的所有实例吗？");
                            if(res){
                                $.post("/node/removeNodeAll/",{"modelID":treeNode.id},function(data){
                                    if(data.code==500){
                                        alert(data.msg);
                                    }
                                    _this.getProduct();
                                },"json");
                            }
                        });
                        $(document).off('click',"#"+treeNode.tId+"_syncBtn1").on('click',"#"+treeNode.tId+"_syncBtn1",function(){
                             var res=confirm("确定要将该节点同步到所有实例吗？");
                             if(res){
                                 $.post("/node/sync/",{"modelID":treeNode.id,"productID":_this.param.product},function(data){
                                    if(data.code==500){
                                        alert(data.msg);
                                    }else{
                                        alert("同步成功");
                                    }
                                    _this.getProduct();
                                 },"json");
                             }
                        });
                    }
                }
            } else {
                var treeObj = $.fn.zTree.getZTreeObj("tree2");
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#" + treeNode.tId + "_excelBtn2").length > 0) return;
                if (treeNode.type == 2) {
                    var srvStr = "<span class='button add' id='" + treeNode.tId + "_addBtn2' title='添加服务器'></span>";
                    sObj.after(srvStr);
                    $("#" + treeNode.tId + "_edit").css("display", "none");
                    $(document).off('click',"#"+treeNode.tId+"_addBtn2").on('click',"#"+treeNode.tId+"_addBtn2",function(){
                        _this.$broadcast('showServerModal', _this.param.product);
                        _this.serverModal = true;
                        _this.param.curNode = treeNode.id;
                    });
                } else if (treeNode.type == 1) {
                    if (treeNode.level == 0) {
                        $("#" + treeNode.tId + "_edit").css("display", "none");
                        $("#" + treeNode.tId + "_remove").css("display", "none");
                    }
                }
                var excelStr = "<span class='button excel' id='" + treeNode.tId + "_excelBtn2' title='导出'></span>";
                sObj.after(excelStr);
                $(document).off('click',"#"+treeNode.tId+"_excelBtn2").on('click',"#"+treeNode.tId+"_excelBtn2",function(){
                    var form = $('<form>');
                    form.attr('style','display:none');
                    form.attr('target','_self');
                    form.attr('method','post');
                    form.attr('action','/node/export/?productID='+_this.param.product+'&nodeID='+treeNode.id);
                    $('body').append(form);
                    form.submit();
                });
            }
        },

        // 鼠标离开事件
        removeHoverDom (treeId, treeNode) {
            if (treeId == "tree1") {
                $("#" + treeNode.tId + "_docBtn1").unbind().remove();
                $("#" + treeNode.tId + "_dirBtn1").unbind().remove();
                $("#" + treeNode.tId + "_syncBtn1").unbind().remove();
                $("#" + treeNode.tId + "_cancelBtn1").unbind().remove();

            } else {
                $("#" + treeNode.tId + "_excelBtn2").unbind().remove();
                $("#" + treeNode.tId + "_addBtn2").unbind().remove();
            }
        },


        /*拖动事件*/
        beforeDrag (treeId, treeNodes) {
            if (treeId != "tree1" || treeNodes[0].type != 1) {
                return false;
            }

            return true;
        },

        beforeDrop (treeId, treeNodes, targetNode, moveType) {
            if (treeId != "tree2" || targetNode.type != 1) {
                return false;
            }
            if(treeNodes[0].level-targetNode.level!=1) {
                return false;
            }
            return true;
        },

        onDrop (event, treeId, treeNodes, targetNode, moveType) {
            var tag = false;
            var _this = this;

            $('#lblName1').html(treeNodes[0].name+"(更名为)");
            for(var i in treeNodes[0].children){
                if (treeNodes[0].children[i].type==1){
                    tag = true;
                    $('#lblName2').html(treeNodes[0].children[i].name+"(更名为)");
                    break;
                }
            }

            if(tag){
                $('#lblName2').css("display","block");
                $('#txtName2').css("display","block");
            }else{
                $('#lblName2').css("display","none");
                $('#txtName2').css("display","none");
            }

            $('#treeModal').modal('show');
            $('#treeModal').off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                _this.getProduct();
            })
            $("#btnCancel").click(function(){
                $('#treeModal').modal('hide');
                $('#txtName1').val('');
                $('#txtName2').val('');

                //触发下拉框选择事件
                //_this.getProduct();
            });
            $(document).off('click',"#btnConfirm").on('click',"#btnConfirm",function(){
                var v1 = $('#txtName1').val().replace(new RegExp(/ /g), '');
                if (v1.indexOf("'")!=-1||v1.indexOf('"')!=-1){
                    alert("名称中不允许包含引号");
                    return;
                }
                if(v1.length == 0){
                    alert("字段必填");
                    return;
                }
                if(tag){
                    var v2 = $('#txtName2').val().replace(new RegExp(/ /g), '');
                    if (v2.indexOf("'")!=-1||v2.indexOf('"')!=-1){
                        alert("名称中不允许包含引号");
                        return;
                    }
                    if(v2.length == 0){
                        alert("字段必填");
                        return;
                    }
                }

                var nodes = _this.convertTreeNodes(treeNodes[0],targetNode.id,$('#txtName1').val(),$('#txtName2').val());
                $.post("/node/addNode/",{"productID":_this.param.product,"nodes":nodes},function(data){
                    if(data.code==500){
                        alert(data.msg);
                    }else{
                        $('#treeModal').modal('hide');
                        $('#txtName1').val('');
                        $('#txtName2').val('');
                        //触发下拉框选择事件
                        //_this.getProduct();
                    }
                },"json");
            });
        },

        /*将treeNodes转成json字符串*/
        convertTreeNodes (pnode,targetid,set1,set2){
            var _this = this;
            var uid1=_this.uuid();
            var nodestr = '{"node_id":"'+uid1+'","parent_id":"'+targetid+'","model_id":"'+pnode.id+'","node_name":"'+set1+'","type":'+pnode.type+'}';
            if(pnode.children!=undefined){
                for (var i = 0; i < pnode.children.length; i++) {
                    if(pnode.children[i].type==2){
                        nodestr+=',{"node_id":"'+_this.uuid()+'","parent_id":"'+uid1+'","model_id":"'+pnode.children[i].id+'","node_name":"'+set1+"-"+pnode.children[i].name+'","type":'+pnode.children[i].type+'}';
                    }else{
                        var uid2=_this.uuid();
                        nodestr += ',{"node_id":"'+uid2+'","parent_id":"'+uid1+'","model_id":"'+pnode.children[i].id+'","node_name":"'+set2+'","type":'+pnode.children[i].type+'}';
                        if(pnode.children[i].children!=undefined){
                            for (var j = 0; j < pnode.children[i].children.length; j++) {
                                nodestr+=',{"node_id":"'+_this.uuid()+'","parent_id":"'+uid2+'","model_id":"'+pnode.children[i].children[j].id+'","node_name":"'+set2+"-"+pnode.children[i].children[j].name+'","type":'+pnode.children[i].children[j].type+'}';
                            }
                        }
                    }
                }
            }
            return "["+nodestr+"]";
        },

        /*重命名事件*/
        beforeRename (treeId, treeNode, newName, isCancel) {
            var name = newName.replace(new RegExp(/ /g), '');
            if (name.length == 0) {
                alert("节点名称不能为空");
                return false;
            }
            if(name.indexOf("重命名") != -1) {
                alert("请重命名");
                return false;
            }

            return true;
        },

        onRename (e, treeId, treeNode, isCancel) {
            var _this = this;
            var productID = this.param.product;
            $.post("/node/rename/",{"No":treeNode.id,"Name":treeNode.name,"parentID":treeNode.pId,"type":treeNode.type,"productID": productID,"treeID":treeId},function(data){
                if(data.code==500){
                    alert(data.msg);
                    var treeObj = $.fn.zTree.getZTreeObj(treeId);
                    treeObj.editName(treeNode);
                }else{
                    if(treeId=="tree2"){
                        _this.getProduct();
                    }
                }
            },"json");
        },

        /*删除节点*/
        beforeRemove (treeId, treeNode) {
            if(treeId=="tree1"){
                return confirm("删除模型节点时，所有的实例节点也会删除，确认删除 " + treeNode.name + " 吗,？");
            }else{
                return confirm("确认删除 " + treeNode.name + " 吗,？");
            }
        },

        onRemove (e, treeId, treeNode) {
            var _this = this;
            if(treeId=="tree1"){
                $.post("/node/removeModel/",{"modelID":treeNode.id},function(data){
                    if(data.code==500){
                        alert(data.msg);
                    }
                    _this.getProduct();
                },"json");
            }else{
                $.post("/node/removeNode/",{"nodeID":treeNode.id},function(data){
                    if(data.code==500){
                        alert(data.msg);
                    }
                    _this.getProduct();
                },"json");
            }
        },

        /*点击事件*/
        onClick (event, treeId, treeNode) {
            var _this = this;
            if(treeId=="tree2"){
                _this.param.curNode = treeNode.id;
                _this.refresh();
            }
        },

        /*GUID*/
        uuid () {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        },

        // 触发下拉框
        getProduct () {
            let  _this = this,
                 idx = this.products.findIndex(n => n.value === _this.param.product)

            this.$http({
                url: '/node/getTree/',
                method: 'POST',
                data: {
                    productID: this.param.product,
                    productName: this.products[idx].label
                }
            })
            .then(response => {
                var setting = {
                    view: {
                        addHoverDom: _this.addHoverDom,
                        removeHoverDom: _this.removeHoverDom,
                        selectedMulti: false
                    },
                    edit: {
                        drag: {
                            isCopy: true,
                            isMove: false,
                            prev: false,
                            next: false,
                            inner: true
                        },
                        enable: true,
                        renameTitle: "重命名",
                        removeTitle: "删除"
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: _this.onClick,
                        beforeDrag: _this.beforeDrag,
                        beforeDrop: _this.beforeDrop,
                        onDrop: _this.onDrop,
                        beforeRename: _this.beforeRename,
                        onRename: _this.onRename,
                        beforeRemove:_this.beforeRemove,
                        onRemove: _this.onRemove,
                    }
                };

                require(['../../../assets/js/zTree/js/jquery.ztree.all.min.js', '../../../assets/js/zTree/css/zTreeStyle.css'], function () {
                    $.fn.zTree.init($("#tree1"), setting, response.data.data1);
                    $.fn.zTree.init($("#tree2"), setting, response.data.data2);
                })
            })
        }
    },
    ready () {
        this.getTreeSelect()
    },
    components: {
        vSelect,
        bootPage,
        spinner,
        modal,
        serverModal,
        confirmModal,
        editServerModal
    },
    vuex: {
        actions: {
            getTreeSelect
        },
        getters: {
            products: treeProducts
        }
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
        },
        'param.product' (newVal) {
            this.getProduct()
        }
    },
    events: {

        // 获取表格数据
        'data' (param) {
            this.tableList = param.data
            this.checkedIds = []
        },

        // 刷新表格
        'refresh' () {
            this.refresh()
        },

        // 获取服务器数据
        'getServerData' (param) {
            this.$http({
                url: '/node/addServer/',
                method: 'POST',
                data: {
                    nodeID: this.param.curNode,
                    checkedIds: param
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.serverModal = false
                    this.refresh()
                } else {
                    this.$dispatch('show-error', response.data.msg)
                }
            })
        },

        // 确认删除
        'confirm' () {
            this.$http({
                url: '/node/recover/',
                method: 'POST',
                data: {
                    checkedIds: this.checkedIds
                }
            })
            .then(response => {
                this.refresh()
            })
        }
    }
}

</script>