/*
* @Author: dell
* @Date:   2017-09-11 18:21:02
* @Last Modified by:   dell
* @Last Modified time: 2017-09-11 19:42:57
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   =   require('service/user-service.js');
var _ym     =   require('util/ym.js');
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
    data    :{
        username  : '',
        question  : '',
        answer    : '',
        token     : '',
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        // 输入用户名到下一步按钮的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if (username) {
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();

                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //用户名不存在
            else{
                formError.show("请输入用户名");
            }
        });
        // 输入密码提示问题答案按钮的点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            if (answer) {
                //检查密码提示问题答案
                _user.checkAnswer({
                    username  : _this.data.username,
                    question  : _this.data.question,
                    answer    : answer,
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //用户名不存在
            else{
                formError.show("请输入密码提示问题答案");
            }
        });
        // 输入新密码按钮的点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            if (password && password.length>=6) {
                //检查密码
                _user.resetPassword({
                    username       : _this.data.username,
                    passwordNew    : password,
                    forgetToken    : _this.data.token,
                },function(res){
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //密码为空
            else{
                formError.show("请输入不少于6位的新密码");
            }
        });
    },
    //加载输入用户名的一步
    loadStepUsername  : function(){
        $('.step-username').show();
    },
    //加载输入密码提示答案的一步
    loadStepQuestion  : function(){
        //清楚错误提示
        formError.hide();
        //容器切换
        $('.step-username').hide()
        .siblings('.step-question').show()
        .find('.question').text(this.data.question);
    },
    //加载输入用户密码的一步
    loadStepPassword  : function(){
        //清楚错误提示
        formError.hide();
        //容器切换
        $('.step-question').hide()
        .siblings('.step-password').show();
    },
};
$(function(){
    page.init();
});