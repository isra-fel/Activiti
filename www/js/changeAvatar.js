/*jslint white:true*/
/*global angular*/
/*global alert*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
   
myapp.controller('avatarControl', function ($http, $timeout) {
    'use strict';
    var avatarCtrl = this;
    
    avatarCtrl.user = window.localStorage.loggedInUser ? JSON.parse(window.localStorage.loggedInUser) : {};
    avatarCtrl.newPhoneNumber = "";
    
    avatarCtrl.onSubmit = function () {
        if (avatarCtrl.validate()) {
            avatarCtrl.sendRequest();
        } else {
            alert(avatarCtrl.validate.err);
        };
    };
    
    avatarCtrl.validate = function () {
        if (avatarCtrl.newPhoneNumber.match(/^\d{11}$/)) {
            return true;
        } else {
            avatarCtrl.validate.err = '请输入正确的手机号';
            return false;
        }
    };
    
    avatarCtrl.sendRequest = function () {
        var jsonpTimeout = $timeout(function () {
            alert('服务器未响应！');
        }, 13000);
        $http.jsonp(window.localStorage.rootUrl + '/modifyUser.action?callback=JSON_CALLBACK',
                  {
            "params": {
                "username": avatarCtrl.user.username,
                "password": avatarCtrl.user.password,
                "phoneNumber": avatarCtrl.newPhoneNumber
            },
            "timeout": jsonpTimeout
        }).success(function(data, status, headers, config) {
            if (!data.error) {
                avatarCtrl.user = data.user;
                window.localStorage.loggedInUser = JSON.stringify(data.user);
//                window.location.href = 'activitiDetail.html';
            } else {
                alert(data.error);
            }
        });
    };
});