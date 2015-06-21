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
    avatarCtrl.newAvatar = null;
    
    avatarCtrl.avatars = [
        {title: "rawshader", src: "rawshader.png", three: true},
        {title: "unit", src: "unit.png", three: true},
        {title: "drawcall", src: "drawcall.png", three: true},
        {title: "lines", src: "lines.png", three: true},
        {title: "prof", src: "prof.png", three: true}
    ];
    
    avatarCtrl.onSubmit = function () {
        if (avatarCtrl.validate()) {
            avatarCtrl.sendRequest();
        } else {
            alert(avatarCtrl.validate.err);
        }
    };
    
    avatarCtrl.sendRequest = function () {
        var jsonpTimeout = $timeout(function () {
//            alert('服务器未响应！');
        }, Number(window.localStorage.timeOut));
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