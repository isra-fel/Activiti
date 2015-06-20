/*jslint white:true*/
/*global angular*/
/*global alert*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
   
myapp.controller('bindControl', function ($http, $timeout) {
    'use strict';
    var bindCtrl = this;
    
    bindCtrl.user = window.localStorage.loggedInUser ? JSON.parse(window.localStorage.loggedInUser) : {};
    bindCtrl.newPhoneNumber = "";
    
    bindCtrl.onSubmit = function () {
        if (bindCtrl.validate()) {
            bindCtrl.sendRequest();
        } else {
            alert(bindCtrl.validate.err);
        };
    };
    
    bindCtrl.validate = function () {
        if (bindCtrl.newPhoneNumber.match(/^\d{11}$/)) {
            return true;
        } else {
            bindCtrl.validate.err = '请输入正确的手机号';
            return false;
        }
    };
    
    bindCtrl.sendRequest = function () {
//        console.log('phonenumber', bindCtrl.newPhoneNumber);
        var jsonpTimeout = $timeout(function () {
            alert('服务器未响应！');
        }, 13000);
        $http.jsonp(window.localStorage.rootUrl + '/modifyUser.action?callback=JSON_CALLBACK',
                  {
            "params": {
                "username": bindCtrl.user.username,
                "password": bindCtrl.user.password,
                "phoneNumber": bindCtrl.newPhoneNumber
            },
            "timeout": jsonpTimeout
        }).success(function(data, status, headers, config) {
            if (!data.error) {
                bindCtrl.user = data.user;
                window.localStorage.loggedInUser = JSON.stringify(data.user);
//                window.location.href = 'activitiDetail.html';
            } else {
                alert(data.error);
            }
        });
    };
});