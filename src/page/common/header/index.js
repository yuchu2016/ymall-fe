/*
* @Author: dell
* @Date:   2017-09-06 17:42:58
* @Last Modified by:   dell
* @Last Modified time: 2017-09-13 10:17:09
*/
require('./index.css');
var _ym     = require('util/ym.js');

// 通用页面头部
var header = {
    init : function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function(){
        var keyword = _ym.getUrlParam('keyword');
        //关键字回填输入框
        if(keyword){
            $("#search-input").val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        //点击搜索按钮后做搜索提交
       $("#search-btn").click(function(){
            _this.searchSubmit();
       });
       //输入回车后，做搜索提交
       $("#search-input").keyup(function(e){
            //13是回车键
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
       });
    },
    // 搜索提交
    searchSubmit : function(){
        var keyword = $.trim($("#search-input").val());
        //如果提交存在关键字，正常跳转到list页
        if (keyword) {
            window.location.href = './list.html?keyword='+keyword;
        }
        //如果关键字为空，直接返回首页
        else{
            _ym.goHome();
        }
    }
};

header.init();