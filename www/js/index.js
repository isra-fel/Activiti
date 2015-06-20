/*jslint white:true*/
/*global alert*/
/*global angular*/
var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
myapp.controller('signupCtrl', function ($http, $timeout) {
    'use strict';
    var signup = this;
    signup.username = '';
    signup.nickname = '';
    signup.password = '';
    signup.passwordConfirmed = '';
    signup.errorList = [];
    
    signup.onSubmit = function () {
        if (signup.validate()) {
            signup.sendRequest();
        } else {
            alert(signup.errorList.reduce(function (previous, current) {
                return previous ? (previous + '\n' + current) : current;
            }, ''));
        }
    };
    
    signup.validate = function () {
        signup.errorList = [];
        signup.usernameValid();
        signup.nicknameValid();
        signup.passwordValid();
        return !signup.errorList.length;
    };
    
    signup.usernameValid = function () {
        var usernameRegex = /^[a-zA-Z_]{4,12}$/,
            errorMessage = '用户名是长度为4~12的字母组合';
        if (signup.username && signup.username.match(usernameRegex)) {
            return true;
        } else {
            signup.errorList.push(errorMessage);
            return false;
        }
    };
    
    signup.nicknameValid = function () {
        var nicknameRegex = /^\W{3,12}$/,
            errorMessage = '昵称是长度为3~12的字符';
        if (signup.nickname && signup.nickname.length >= 3 && signup.nickname.length <= 12) {
            return true;
        } else {
            signup.errorList.push(errorMessage);
            return false;
        }
    };
    
    signup.passwordValid = function () {
        var passwordRegex = /^[a-zA-Z0-9]{4,12}$/,
            errorMessageA = '密码是长度为4~12的字母数字组合',
            errorMessageB = '两次输入的密码不相符';
        if (!signup.password || !signup.password.match(passwordRegex)) {
            signup.errorList.push(errorMessageA);
            return false;
        }
        if (signup.password !== signup.passwordConfirmed) {
            signup.errorList.push(errorMessageB);
            return false;
        }
        return true;
    };
    
    signup.sendRequest = function () {
        var jsonpTimeout = $timeout(function () {
            alert('服务器未响应！');
        }, 13000);
        $http.jsonp(window.localStorage.rootUrl + '/register.action?callback=JSON_CALLBACK',
                    {
            "params": {
                "username": signup.username,
                "nickname": signup.nickname,
                "password": signup.password
            },
            "timeout": jsonpTimeout
        }).success(function (data, status, headers, config) {
            if (!data.error) {
                window.localStorage.loggedInUser = JSON.stringify(data.user);
                window.location.href = 'home.html';
            } else {
                alert(data.error);
            }
        });
    };
});


function onDeviceReady() {
    'use strict';
}

function bindEvents() {
    'use strict';
    document.addEventListener('deviceready', onDeviceReady, false);
}
