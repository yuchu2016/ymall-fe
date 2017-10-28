webpackJsonp([14],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(73);


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Rosen
	* @Date:   2017-05-17 17:04:32
	* @Last Modified by:   dell
	* @Last Modified time: 2017-09-06 17:56:25
	*/
	
	'use strict';
	
	var _ym = __webpack_require__(1);
	
	var _user = {
	    // 用户登录
	    login : function(userInfo, resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/login.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查用户名
	    checkUsername : function(username, resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/check_valid.do'),
	            data    : {
	                type    : 'username',
	                str     : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 用户注册
	    register : function(userInfo, resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/register.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查登录状态
	    checkLogin : function(resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/get_user_info.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户密码提示问题
	    getQuestion : function(username, resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/forget_get_question.do'),
	            data    : {
	                username : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查密码提示问题答案
	    checkAnswer : function(userInfo, resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/forget_check_answer.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 重置密码
	    resetPassword : function(userInfo, resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/forget_reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户信息
	    getUserInfo : function(resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/get_information.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新个人信息
	    updateUserInfo : function(userInfo, resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/update_information.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登录状态下更新密码
	    updatePassword : function(userInfo, resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登出
	    logout : function(resolve, reject){
	        _ym.request({
	            url     : _ym.getServerUrl('/user/logout.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    }
	}
	module.exports = _user;

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: dell
	* @Date:   2017-09-06 16:17:57
	* @Last Modified by:   dell
	* @Last Modified time: 2017-09-06 16:18:29
	*/
	__webpack_require__(11);

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: dell
	* @Date:   2017-09-11 18:21:02
	* @Last Modified by:   dell
	* @Last Modified time: 2017-09-11 19:42:57
	*/
	'use strict';
	__webpack_require__(34);
	__webpack_require__(12);
	var _user   =   __webpack_require__(2);
	var _ym     =   __webpack_require__(1);
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

/***/ })

});