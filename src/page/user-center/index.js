/*
* @Author: dell
* @Date:   2017-09-11 20:13:20
* @Last Modified by:   dell
* @Last Modified time: 2017-09-12 08:41:55
*/
"use strict";
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _ym             = require('util/ym.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');
// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _ym.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _ym.errorTips(errMsg);
        });
    }
    
};
$(function(){
    page.init();
});