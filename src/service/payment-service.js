/*
* @Author: dell
* @Date:   2017-09-23 14:23:27
* @Last Modified by:   dell
* @Last Modified time: 2017-09-23 14:50:26
*/
'use strict';

var _ym = require('util/ym.js');

var _payment = {
   // 获取支付信息
   getPaymentInfo : function(orderNumber,resolve, reject){
       _ym.request({
           url     : _ym.getServerUrl('/order/pay.do'),
           data    :{
                orderNo :orderNumber,
           },
           success : resolve,
           error   : reject
       });
   },
   // 获取支付状态
   getPaymentStatus : function(orderNumber,resolve, reject){
       _ym.request({
           url     : _ym.getServerUrl('/order/query_order_pay_status.do'),
           data    :{
                orderNo :orderNumber,
           },
           success : resolve,
           error   : reject
       });
   }
}
module.exports = _payment;