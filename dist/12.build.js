webpackJsonp([12],{72:function(e,t,a){var n,i;a(78),n=a(73),i=a(79),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},73:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{pages:{type:Array,"default":function(){return[1]}},async:{type:Boolean,"default":!1},len:{type:Number,"default":10},lens:{type:Array,"default":function(){return[10,50,100]}},data:{type:Array,"default":function(){return[]}},url:{type:String,"default":""},pageLen:{type:Number,"default":5},param:{type:Object,"default":function(){return{}}}},data:function(){return{activeNum:0,pageTotal:1,total:0}},methods:{onPageClick:function(e){this.activeNum=e},onPrevClick:function(){if(this.activeNum>0)this.activeNum=this.activeNum-1;else if(1!==this.pages[0]){for(var e=[],t=0;t<this.pages.length;t++)e[t]=this.pages[t]-1;this.pages=e,this.getData()}},onNextClick:function(){if(this.activeNum<this.pages.length-1)this.activeNum=this.activeNum+1;else if(this.pages[this.pages.length-1]<this.pageTotal){for(var e=[],t=0;t<this.pages.length;t++)e[t]=this.pages[t]+1;this.pages=e,this.getData()}},onFirstClick:function(){if(1===this.pages[0])this.activeNum=0;else{for(var e=[],t=1;t<=this.pageLen;t++)e.push(t);this.pages=e,0===this.activeNum?this.getData():this.activeNum=0}},onLastClick:function(){if(this.pageTotal<=this.pageLen)this.activeNum=this.pages.length-1;else{for(var e=[],t=this.pageLen-1;t>=0;t--)e.push(this.pageTotal-t);this.pages=e,this.activeNum===this.pages.length-1?this.getData():this.activeNum=this.pages.length-1}},getPages:function(){if(this.pages=[],this.async||(this.pageTotal=Math.ceil(this.data.length/this.len)),this.pageTotal<=this.pageLen)for(var e=1;e<=this.pageTotal;e++)this.pages.push(e);else for(var t=1;t<=this.pageLen;t++)this.pages.push(t)},getData:function(){if(this.async)this.param.active=this.pages[this.activeNum],this.param.len=this.len,this.$http({url:this.url,method:"POST",data:this.param}).then(function(e){this.pageTotal=e.data.page_num,this.total=e.data.total,(this.pages.length!==this.pageLen||this.pageTotal<this.pageLen)&&this.getPages(),e.data.data.length||(this.activeNum=this.pageTotal-1),this.$dispatch("data",e.data)});else{for(var e=this.len,t=this.pages[this.activeNum]-1,a=[],n=t*e;t*e+e>n;n++)void 0!==this.data[n]?a.push(this.data[n]):"";this.$dispatch("data",a)}},refresh:function(){this.getData()},refresh2:function(){this.pages=[1],0===this.activeNum?this.getData():this.activeNum=0}},ready:function(){this.async||this.getPages(),this.getData()},watch:{len:function(e,t){this.async?this.refresh2():(this.getPages(),this.activeNum+1>this.pages.length&&(this.activeNum=this.pages.length-1),this.getData())},activeNum:function(e,t){this.getData()}},events:{"refresh::page":function(){this.refresh()},"refresh2::page":function(){this.refresh2()}}}},77:function(e,t,a){t=e.exports=a(2)(),t.push([e.id,".boot-select[_v-457beca8]{float:right;width:80px}.boot-nav[_v-457beca8]{float:right}.boot-page[_v-457beca8]{margin:2px 10px 0 20px}.boot-page[_v-457beca8],.page-total[_v-457beca8]{display:inline-block;vertical-align:middle}","",{version:3,sources:["/./src/components/global/BootPage.vue.style"],names:[],mappings:"AAuSA,0BACA,YAAA,AACA,UAAA,CACA,AAEA,uBACA,WAAA,CACA,AAEA,wBAEA,sBAAA,CAEA,AAEA,iDALA,qBAAA,AAEA,qBAAA,CAMA",file:"BootPage.vue",sourcesContent:['<!-- 表格分页组件 -->\r\n<template>\r\n    <nav class="boot-nav">\r\n        <ul class="pagination boot-page">\r\n            <li>\r\n                <a href="javascript:void(0)" aria-label="Previous" @click="onFirstClick()">\r\n                    <span aria-hidden="true">&laquo;</span>\r\n                </a>\r\n            </li>\r\n            <li>\r\n                <a href="javascript:void(0)" aria-label="Next" @click="onPrevClick()">\r\n                    <span aria-hidden="true">‹</span>\r\n                </a>\r\n            </li>\r\n            <li v-for="page in pages" :class="activeNum === $index ? \'active\' : \'\'">\r\n                <a href="javascript:void(0)" v-text="page" @click="onPageClick($index)"></a>\r\n            </li>\r\n            <li>\r\n                <a href="javascript:void(0)" aria-label="Next" @click="onNextClick()">\r\n                    <span aria-hidden="true">›</span>\r\n                </a>\r\n            </li>\r\n            <li>\r\n                <a href="javascript:void(0)" aria-label="Next" @click="onLastClick()">\r\n                    <span aria-hidden="true">&raquo;</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <div class="page-total">\r\n            共 <span v-text="pageTotal"></span> 页 / (共<span v-text="total"></span>条)\r\n        </div>\r\n    </nav>\r\n    <select class="form-control boot-select" v-model="len">\r\n        <option v-for="arr in lens" :value="arr" v-text="arr" :selected="$index === 0 ? true : false"></option>\r\n    </select>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    props: {\r\n\r\n        // 页码\r\n        pages: {\r\n            type: Array,\r\n            default: function () {\r\n                return [1]\r\n            }\r\n        },\r\n\r\n        // 是否请求服务器端数据\r\n        async: {\r\n            type: Boolean,\r\n            default: false\r\n        },\r\n\r\n        // 每页显示个数\r\n        len: {\r\n            type: Number,\r\n            default: 10\r\n        },\r\n\r\n        // 显示个数数组\r\n        lens: {\r\n            type: Array,\r\n            default: function () {\r\n                return [10, 50, 100]\r\n            }\r\n        },\r\n\r\n        // 表格数据（数组）\r\n        data: {\r\n            type: Array,\r\n            default: function () {\r\n                return []\r\n            }\r\n        },\r\n\r\n        // AJAX地址\r\n        url: {\r\n            type: String,\r\n            default: \'\'\r\n        },\r\n\r\n        // 显示页数\r\n        pageLen: {\r\n            type: Number,\r\n            default: 5\r\n        },\r\n\r\n        // 参数内容\r\n        param: {\r\n            type: Object,\r\n            default: function () {\r\n                return {}\r\n            }\r\n        }\r\n    },\r\n    data () {\r\n        return {\r\n            activeNum: 0,\r\n            pageTotal: 1,\r\n            total: 0\r\n        }\r\n    },\r\n    methods: {\r\n\r\n        // 点击页码刷新数据\r\n        onPageClick (index) {\r\n            this.activeNum = index\r\n        },\r\n\r\n        // 上一页\r\n        onPrevClick () {\r\n\r\n            // 当前页是否为当前最小页码\r\n            if (this.activeNum > 0) {\r\n                this.activeNum = this.activeNum - 1\r\n            } else {\r\n                if (this.pages[0] !== 1) {\r\n                    let newPages = []\r\n\r\n                    for (let i = 0; i < this.pages.length; i++) {\r\n                        newPages[i] = this.pages[i] - 1\r\n                    }\r\n\r\n                    this.pages = newPages\r\n                    this.getData()\r\n                }\r\n            }\r\n        },\r\n\r\n        // 下一页\r\n        onNextClick () {\r\n\r\n            // 当前页是否为当前最大页码\r\n            if (this.activeNum < this.pages.length - 1) {\r\n                this.activeNum = this.activeNum + 1\r\n            } else {\r\n                if (this.pages[this.pages.length - 1] < this.pageTotal) {\r\n                    let newPages = []\r\n\r\n                    for (let i = 0; i < this.pages.length; i++) {\r\n                        newPages[i] = this.pages[i] + 1\r\n                    }\r\n\r\n                    this.pages = newPages\r\n\r\n                    this.getData()\r\n                }\r\n            }\r\n        },\r\n\r\n        // 第一页\r\n        onFirstClick () {\r\n            if (this.pages[0] === 1) {\r\n                this.activeNum = 0\r\n            } else {\r\n                let originPage = []\r\n\r\n                for (let i = 1; i <= this.pageLen; i++) {\r\n                    originPage.push(i)\r\n                }\r\n\r\n                this.pages = originPage\r\n                this.activeNum === 0 ? this.getData() : this.activeNum = 0\r\n            }\r\n        },\r\n\r\n        // 最后一页\r\n        onLastClick () {\r\n            if (this.pageTotal <= this.pageLen) {\r\n                this.activeNum = this.pages.length - 1\r\n            } else {\r\n                let lastPage = []\r\n\r\n                for (let i = this.pageLen - 1; i >= 0; i--) {\r\n                    lastPage.push(this.pageTotal - i)\r\n                }\r\n\r\n                this.pages = lastPage\r\n                this.activeNum === this.pages.length - 1 ? this.getData() : this.activeNum = this.pages.length - 1\r\n            }\r\n        },\r\n\r\n        // 获取页码\r\n        getPages () {\r\n            this.pages = []\r\n\r\n            if (!this.async) {\r\n                this.pageTotal = Math.ceil(this.data.length / this.len)\r\n            }\r\n\r\n            // 比较总页码和显示页数\r\n            if (this.pageTotal <= this.pageLen) {\r\n                for (let i = 1; i <= this.pageTotal; i++) {\r\n                    this.pages.push(i)\r\n                }\r\n            } else {\r\n                for (let i = 1; i <= this.pageLen; i++) {\r\n                    this.pages.push(i)\r\n                }\r\n            }\r\n        },\r\n\r\n        // 页码变化获取数据\r\n        getData () {\r\n            if (!this.async) {\r\n                let len = this.len,\r\n                    pageNum = this.pages[this.activeNum] - 1,\r\n                    newData = [];\r\n\r\n                for (let i = pageNum * len; i < (pageNum * len + len); i++) {\r\n                    this.data[i] !== undefined ? newData.push(this.data[i]) : \'\'\r\n                }\r\n                \r\n                this.$dispatch(\'data\', newData)\r\n            } else {\r\n                this.param.active = this.pages[this.activeNum]\r\n                this.param.len = this.len\r\n\r\n                this.$http({\r\n                    url: this.url, \r\n                    method: \'POST\',\r\n                    data: this.param\r\n                })\r\n                .then(function (response) {\r\n                    this.pageTotal = response.data.page_num\r\n                    this.total = response.data.total\r\n\r\n                    if (this.pages.length !== this.pageLen || this.pageTotal < this.pageLen) {\r\n                        this.getPages()\r\n                    }\r\n\r\n                    if (!response.data.data.length) {\r\n                        this.activeNum = this.pageTotal - 1\r\n                    }\r\n\r\n                    this.$dispatch(\'data\', response.data)\r\n                })\r\n            }\r\n        },\r\n\r\n        // 刷新表格\r\n        refresh () {\r\n            this.getData()\r\n        },\r\n\r\n        // 重置并刷新表格\r\n        refresh2 () {\r\n            this.pages = [1]\r\n\r\n            this.activeNum === 0 ? this.getData() : this.activeNum = 0\r\n        }\r\n    },\r\n    ready () {\r\n        if (!this.async) {\r\n            this.getPages()\r\n        } \r\n\r\n        this.getData()\r\n    },\r\n    watch: {\r\n\r\n        // 监听显示数量\r\n        \'len\' (newVal, oldVal) {\r\n            if (!this.async) {\r\n                this.getPages()\r\n\r\n                if (this.activeNum + 1 > this.pages.length) {\r\n                    this.activeNum = this.pages.length - 1\r\n                }\r\n\r\n                this.getData()\r\n            } else {\r\n                this.refresh2()\r\n            }\r\n        },\r\n\r\n        // 监测当前页变化\r\n        \'activeNum\' (newVal, oldVal) {\r\n            this.getData()\r\n        }\r\n    },\r\n    events: {\r\n        \'refresh::page\' () {\r\n            this.refresh()\r\n        },\r\n        \'refresh2::page\' () {\r\n            this.refresh2()\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.boot-select {\r\n    float: right;\r\n    width: 80px;\r\n}\r\n\r\n.boot-nav {\r\n    float: right;\r\n}\r\n\r\n.boot-page {\r\n    display: inline-block;\r\n    margin: 2px 10px 0 20px;\r\n    vertical-align: middle;\r\n}\r\n\r\n.page-total {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n</style>'],sourceRoot:"webpack://"}])},78:function(e,t,a){var n=a(77);"string"==typeof n&&(n=[[e.id,n,""]]);a(3)(n,{});n.locals&&(e.exports=n.locals)},79:function(e,t){e.exports='<nav class=boot-nav _v-457beca8=""> <ul class="pagination boot-page" _v-457beca8=""> <li _v-457beca8=""> <a href=javascript:void(0) aria-label=Previous @click=onFirstClick() _v-457beca8=""> <span aria-hidden=true _v-457beca8="">«</span> </a> </li> <li _v-457beca8=""> <a href=javascript:void(0) aria-label=Next @click=onPrevClick() _v-457beca8=""> <span aria-hidden=true _v-457beca8="">‹</span> </a> </li> <li v-for="page in pages" :class="activeNum === $index ? \'active\' : \'\'" _v-457beca8=""> <a href=javascript:void(0) v-text=page @click=onPageClick($index) _v-457beca8=""></a> </li> <li _v-457beca8=""> <a href=javascript:void(0) aria-label=Next @click=onNextClick() _v-457beca8=""> <span aria-hidden=true _v-457beca8="">›</span> </a> </li> <li _v-457beca8=""> <a href=javascript:void(0) aria-label=Next @click=onLastClick() _v-457beca8=""> <span aria-hidden=true _v-457beca8="">»</span> </a> </li> </ul> <div class=page-total _v-457beca8=""> 共 <span v-text=pageTotal _v-457beca8=""></span> 页 / (共<span v-text=total _v-457beca8=""></span>条) </div> </nav> <select class="form-control boot-select" v-model=len _v-457beca8=""> <option v-for="arr in lens" :value=arr v-text=arr :selected="$index === 0 ? true : false" _v-457beca8=""></option> </select>'},167:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(72),s=n(i);t["default"]={data:function(){return{checkedAll:!1,checkedIds:[],titles:["关联设备","IP地址","网络类型","网段","掩码","网关","操作"],tableList:[{id:1,device:"SGFW00001",ipAddress:"170.1.1.110",netType:"电信",network:"170.1.1.0/24",mask:"255.255.255.0",gateway:"58.215.168.96"},{id:2,device:"SGFW00001",ipAddress:"170.1.1.110",netType:"电信",network:"170.1.1.0/24",mask:"255.255.255.0",gateway:"58.215.168.96"},{id:3,device:"SGFW00001",ipAddress:"170.1.1.110",netType:"电信",network:"170.1.1.0/24",mask:"255.255.255.0",gateway:"58.215.168.96"},{id:4,device:"SGFW00001",ipAddress:"170.1.1.110",netType:"电信",network:"170.1.1.0/24",mask:"255.255.255.0",gateway:"58.215.168.96"},{id:5,device:"SGFW00001",ipAddress:"170.1.1.110",netType:"电信",network:"170.1.1.0/24",mask:"255.255.255.0",gateway:"58.215.168.96"},{id:6,device:"SGFW00001",ipAddress:"170.1.1.110",netType:"电信",network:"170.1.1.0/24",mask:"255.255.255.0",gateway:"58.215.168.96"}],lenArr:[10,50,100],pageLen:5,url:"",param:{sn:"",deviceNum:"",ip:""}}},methods:{refresh:function(){this.$broadcast("refresh")},showBroad:function(e){var t=e.split("."),a={value:this[t[0]][t[1]],name:e};this.$dispatch("showBroad",a)}},components:{bootPage:s["default"]},watch:{checkedAll:function(e){var t=this;e?this.checkedIds.length!==this.tableList.length&&!function(){var e=t;e.checkedIds=[],e.tableList.forEach(function(t){e.checkedIds.push(t.id)})}():this.checkedIds.length===this.tableList.length&&(this.checkedIds=[])},checkedIds:function(e){e.length===this.tableList.length&&0!==this.tableList.length?this.checkedAll=!0:this.checkedAll=!1}},events:{getTxt:function(e){var t=e.name.split(".");this[t[0]][t[1]]=e.val}}}},194:function(e,t,a){t=e.exports=a(2)(),t.push([e.id,"","",{version:3,sources:[],names:[],mappings:"",file:"IpDelete.vue",sourceRoot:"webpack://"}])},222:function(e,t,a){var n=a(194);"string"==typeof n&&(n=[[e.id,n,""]]);a(3)(n,{});n.locals&&(e.exports=n.locals)},257:function(e,t){e.exports='<div _v-44bc2eee=""> <form class="form-horizontal clearfix form-search" _v-44bc2eee=""> <div class=col-sm-3 _v-44bc2eee=""> <div class=form-group _v-44bc2eee=""> <label class="col-sm-4 control-label" _v-44bc2eee="">SN：</label> <div class=col-sm-8 _v-44bc2eee=""> <input type=text class=form-control placeholder=多个，精确 onfocus=this.blur() v-model=param.sn @click="showBroad(\'param.sn\')" _v-44bc2eee=""> </div> </div> </div> <div class=col-sm-3 _v-44bc2eee=""> <div class=form-group _v-44bc2eee=""> <label class="col-sm-4 control-label" _v-44bc2eee="">设备编号：</label> <div class=col-sm-8 _v-44bc2eee=""> <input type=text class=form-control placeholder=多个，精确 onfocus=this.blur() v-model=param.deviceNum @click="showBroad(\'param.deviceNum\')" _v-44bc2eee=""> </div> </div> </div> <div class=col-sm-3 _v-44bc2eee=""> <div class=form-group _v-44bc2eee=""> <label class="col-sm-4 control-label" _v-44bc2eee="">IP地址：</label> <div class=col-sm-8 _v-44bc2eee=""> <input type=text class=form-control placeholder=多个，精确 onfocus=this.blur() v-model=param.ip @click="showBroad(\'param.ip\')" _v-44bc2eee=""> </div> </div> </div> </form> <div class="text-center btn-operate" _v-44bc2eee=""> <button type=button class="btn btn-default" _v-44bc2eee=""> 查询 </button> <button type=button class="btn btn-default" _v-44bc2eee=""> 批量回收 </button> </div> <div class="text-center table-title" _v-44bc2eee=""> 查询结果 </div> <table class="table table-hover table-bordered" _v-44bc2eee=""> <thead _v-44bc2eee=""> <tr _v-44bc2eee=""> <th width=3% _v-44bc2eee=""><input type=checkbox v-model=checkedAll _v-44bc2eee=""></th> <th v-for="title in titles" v-text=title _v-44bc2eee=""></th> </tr> </thead> <tbody _v-44bc2eee=""> <tr v-for="list in tableList" v-if="tableList.length !== 0" v-show="tableList.length !== 0" _v-44bc2eee=""> <td _v-44bc2eee=""><input type=checkbox :id=list.id :value=list.id v-model=checkedIds _v-44bc2eee=""></td> <td :title=list.device v-text=list.device v-show=list.device _v-44bc2eee=""></td> <td :title=list.ipAddress v-text=list.ipAddress v-show=list.ipAddress _v-44bc2eee=""></td> <td :title=list.netType v-text=list.netType v-show=list.netType _v-44bc2eee=""></td> <td :title=list.network v-text=list.network v-show=list.network _v-44bc2eee=""></td> <td :title=list.mask v-text=list.mask v-show=list.mask _v-44bc2eee=""></td> <td :title=list.gateway v-text=list.gateway v-show=list.gateway _v-44bc2eee=""></td> <td _v-44bc2eee=""> <button class="btn btn-default btn-small" _v-44bc2eee=""> <span class="table-icon glyphicon glyphicon-trash" _v-44bc2eee=""></span> </button> </td> </tr> <tr class=text-center v-show="tableList.length === 0" _v-44bc2eee=""> <td :colspan=titles.length _v-44bc2eee="">暂无数据</td> </tr> </tbody> </table> <div class="clearfix mt30" _v-44bc2eee=""> <boot-page :async=false :lens=lenArr :page-len=pageLen :url=url :param=param _v-44bc2eee=""></boot-page> </div> </div>'},284:function(e,t,a){var n,i;a(222),n=a(167),i=a(257),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)}});
//# sourceMappingURL=12.build.js.map