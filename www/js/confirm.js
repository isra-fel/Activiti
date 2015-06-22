/*jslint white:true*/
/*global alert*/
/*global angular*/
var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
myapp.controller('confirmControl', function($http, $timeout) {
    'use strict';
    var confirm = this;
        
    confirm.user = JSON.parse(window.localStorage.loggedInUser || '{}');
    confirm.activiti = JSON.parse(window.localStorage.confirmedActiviti);
    
    confirm.timeChoices = confirm.activiti.activityChoiceTimes.map(function (elem) {
        return { "time": elem, "chosen": false};
    });
    confirm.placeChoices = confirm.activiti.activityChoicePlaces.map(function (elem) {
        return { "place": elem, "chosen": false};
    });
    
    confirm.chooseTime = function (timeChoice) {
        if (confirm.chosenTime) {
            confirm.chosenTime.chosen = false;
        }
        confirm.timeChosen = true;
        timeChoice.chosen = true;
        confirm.chosenTime = timeChoice;
    };
    
    confirm.choosePlace = function (placeChoice) {
        if (confirm.chosenPlace) {
            confirm.chosenPlace.chosen = false;
        }
        confirm.placeChosen = true;
        placeChoice.chosen = true;
        confirm.chosenPlace = placeChoice;
    };
    
    confirm.onSubmit = function () {
        if (confirm.validate()) {
            confirm.sendRequest();
        } else {
            alert('请选择时间地点');
        }
    };
    
    confirm.sendRequest = function () {
        var jsonpTimeout = $timeout(function () {
//            alert('服务器未响应！');
        }, Number(window.localStorage.timeOut));
        $http.jsonp(window.localStorage.rootUrl + '/confirmActivity.action?callback=JSON_CALLBACK',
                  {
            "params": {
                "username": confirm.user.username,
                "password": confirm.user.password,
                "activityId": confirm.activiti.activityId,
                "activityDate": confirm.chosenTime.time,
                "activityPlace": confirm.chosenPlace.place
            },
            "timeout": jsonpTimeout
        }).success(function(data, status, headers, config) {
            if (!data.error) {
                window.location.href = 'activitiDetail.html';
            } else {
                alert(data.error);
            }
        });
    };
    
    confirm.validate = function () {
        return confirm.chosenPlace && confirm.chosenTime;
    };
});