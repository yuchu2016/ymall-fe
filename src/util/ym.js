/*
* @Author: dell
* @Date:   2017-09-06 12:49:21
* @Last Modified by:   dell
* @Last Modified time: 2017-09-11 08:45:56
*/

'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
var _ym = {
    //网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type        :       param.method  || 'get',
            url         :       param.url     || '',
            dataType    :       param.type    || 'json',
            data        :       param.data    || '',
            success     :       function(res){
                    //请求成功
                    if (0 === res.status) {
                        typeof param.success === 'function' && param.success(res.data,res.msg);
                    }
                    //没有登录，需要强制登录
                    else if(10 === res.status){
                            _this.doLogin();
                    }
                    //请求数据错误
                    else if(1 === res.status){
                      typeof param.error === 'function' && param.error(res.msg);
                    }
            },
            error       :       function(err){
                    typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取URL参数
    getUrlParam : function(name){
        var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml : function(htmlTemplete,data){
        var templete = Hogan.compile(htmlTemplete),
            result   = templete.render(data);
            return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '操作失败');
    },
    //字段验证，支持非空以及手机邮箱验证
    validate : function(value,type){
        var value = $.trim(value);
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        //手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 统一登录处理
    doLogin : function(){
        window.location.href = './user-login.html?redirect='+ encodeURIComponent(window.location.href);
    },
    //跳会主页
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports = _ym;