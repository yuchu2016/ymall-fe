/*
* @Author: dell
* @Date:   2017-09-12 09:46:38
* @Last Modified by:   dell
* @Last Modified time: 2017-09-12 11:23:34
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _ym             = require('util/ym.js');
var _user           = require('service/user-service.js');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
       
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password            : $.trim($('#password').val()),
                passwordNew         : $.trim($('#password-new').val()),
                passwordConfirm     : $.trim($('#password-confirm').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户密码
                _user.updatePassword({
                    passwordOld  : userInfo.password,
                    passwordNew  : userInfo.passwordNew
                }, function(res, msg){
                    _ym.successTips(msg);
                }, function(errMsg){
                    _ym.errorTips(errMsg);
                });
            }
            else{
                _ym.errorTips(validateResult.msg);
            }
        });
    },
    
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证原密码是否为空
        if(!_ym.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码的长度
        if(!formData.passwordNew || formData.passwordNew.length<6){
            result.msg = '密码长度不能少于6位';
            return result;
        }
        // 验证密码提示问题是否为空
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入密码不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});