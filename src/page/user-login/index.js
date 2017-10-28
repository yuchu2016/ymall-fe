/*
* @Author: dell
* @Date:   2017-09-05 21:49:46
* @Last Modified by:   dell
* @Last Modified time: 2017-09-11 14:12:32
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   =   require('service/user-service.js');
var _ym     =   require('util/ym.js');
/*//表单的错误提示
var formError(){
    show  :  function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide  :  function(errMsg){
        $('.error-item').hide().find('.err-msg').text();
    }
};
//page逻辑部分
var page={
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //登录按钮的点击事件
        $("#submit").click(function(){
            _this.submit();
        });
        //如果按下，回车进行提交
        $('.user-content').keyup(function(e){
            //keyEcode===13表示回车
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    //提交表单
    submit  : function(){
        var formDate = {
                username  :  $.trim($('#username').val()),
                password  :  $.trim($('#password').val()),
            },
            //表单验证结果
            validateResult = this.formValidate(formDate);
        //验证成功
        if (validateResult.status) {
            //提交
            _user.login(formDate,function(res){
                window.location.href = _ym.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        //验证失败
        else{
            formError.show(validateResult.msg);
        }

    },
    //表单验证
    formValidate : function(formDate){
        var result = {
            status : false,
            msg    : ''
        };
        if(!_ym.validate(formDate.username,'require')){
            result.msg = '用户不能为空';
            return result;
        }
        if(!_ym.validate(formDate.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});*/
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 逻辑部分
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // keyCode == 13 表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.login(formData, function(res){
                window.location.href = _ym.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }

    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_ym.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_ym.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
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