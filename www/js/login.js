/*jslint white:true*/
/*global alert*/
/*global angular*/
var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
myapp.controller('loginCtrl', function($http, $timeout) {
    'use strict';
    var login = this;
    login.username = '';
    login.password = '';
    login.errorList = [];
    
    login.onSubmit = function() {
        if (login.validate()) {
            login.sendRequest();
        } else {
            alert(login.errorList.reduce(function(previous, current) {
                return previous ? (previous + '\n' + current) : current;
            }, ''));
        }
    };
    
    login.validate = function() {
        login.errorList = [];
        login.usernameValid();
        login.passwordValid();
        return !login.errorList.length;
    };
    
    login.usernameValid = function() {
        var usernameRegex = /^[a-zA-Z_]{4,12}$/,
            errorMessage = '用户名是长度为4~12的字母组合';
        if (login.username && login.username.match(usernameRegex)) {
            return true;
        }
        else {
            login.errorList.push(errorMessage);
            return false;
        }
    };
    
    login.passwordValid = function() {
        var passwordRegex = /^[a-zA-Z0-9]{4,12}$/,
            errorMessageA = '密码是长度为4~12的字母数字组合';
        if (!login.password || !login.password.match(passwordRegex)) {
            login.errorList.push(errorMessageA);
            return false;
        }
        return true;
    };
    
    login.sendRequest = function() {
        var jsonpTimeout = $timeout(function () {
//            alert('服务器未响应！');
        }, Number(window.localStorage.timeOut));
        $http.jsonp(window.localStorage.rootUrl + '/login.action?callback=JSON_CALLBACK',
                  {
            "params": {
                "username": login.username,
                "password": login.password
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
});
