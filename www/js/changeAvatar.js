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
    avatarCtrl.user.avatarURL = avatarCtrl.user.avatarURL || 'default.png';
    
    avatarCtrl.newAvatar = null;
    
    avatarCtrl.avatars = [
        {title: "无头像", src: "default.png", three: false},
//        {title: "rawshader", src: "rawshader.png", three: true},
        {title: "uint", src: "uint.png", three: true},
        {title: "drawcall", src: "drawcall.png", three: true},
        {title: "lines", src: "lines.png", three: true},
        {title: "prof", src: "prof.png", three: true},
        {title: "狼", src: "bx.jpg", three: false},
        {title: "miku", src: "miku.jpg", three: false},
        {title: "蘑菇", src: "mushroom.jpg", three: false}
    ];
    avatarCtrl.chosenAvatar = avatarCtrl.avatars.filter(function (e) {
        return e.src === avatarCtrl.user.avatarURL;
    })[0];
    avatarCtrl.chosenAvatar.chosen = true;
    
    avatarCtrl.onSubmit = function () {
        avatarCtrl.sendRequest();
    };
    
    avatarCtrl.chooseAvatar = function (avatar) {
        if (avatarCtrl.chosenAvatar !== avatar) {
            avatarCtrl.chosenAvatar.chosen = false;
            avatar.chosen = true;
            avatarCtrl.chosenAvatar = avatar;
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
                "icon": avatarCtrl.chosenAvatar.src
            },
            "timeout": jsonpTimeout
        }).success(function(data, status, headers, config) {
            if (!data.error) {
                data.user.avatarURL = data.user.icon;
                window.localStorage.loggedInUser = JSON.stringify(data.user);
                window.location.href = 'home.html';
            } else {
                alert(data.error);
            }
        });
    };
    
    avatarCtrl.preview = function (avatar) {
        window.localStorage.previewedAvatar = JSON.stringify(avatar);
        window.location.href = 'previewAvatar.html';
    };
});