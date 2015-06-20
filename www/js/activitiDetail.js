/*jslint white:true*/
/*global alert*/
/*global angular*/
var myapp;
if (typeof myapp === 'undefined') {
    myapp = angular.module('myapp', ['ionic']);
}
myapp.controller('detailCtrl', function($http, $timeout) {
    'use strict';
    var detail = this;
    
    detail.user = JSON.parse(window.localStorage.loggedInUser || '{}');
    detail.activiti = undefined;
    detail.votes = undefined;
    
    detail.sendRequest = function() {
        var jsonpTimeout = $timeout(function () {
            alert('服务器未响应！');
        }, 13000);
        $http.jsonp(window.localStorage.rootUrl + '/getActivityDetails.action?callback=JSON_CALLBACK',
                  {
            "params": {
                "username": detail.user.username,
                "password": detail.user.password,
                "activityId": window.localStorage.detailedActivitiId
            },
            "timeout": jsonpTimeout
        }).success(function(data, status, headers, config) {
            if (!data.error) {
                detail.activiti = data.activity;
                //！！！不是我的锅
                detail.activiti.description = detail.activiti.discription;
//                console.log(detail.activiti.description);
                detail.votes = data.takePartInRels;
                detail.activiti.activityChoiceTimes = data.activityChoiceTimes.map(function (elem) { return elem.time; });
                detail.activiti.activityChoicePlaces = data.activityChoicePlaces.map(function (elem) { return elem.place; });
                detail.createdByMe = detail.activiti.username === detail.user.username;
            } else {
                alert(data.error);
            }
        });
    };
    
    detail.sendRequest();
    
    detail.countTime = function (time) {
        return detail.votes.filter(function(e) {
            return e.timeChoice === time;
        }).length;
    };
    
    detail.countPlace = function (place) {
        return detail.votes.filter(function(e) {
            return e.placeChoice === place;
        }).length;
    };
    
    detail.onVoteClick = function () {
        window.location.href = 'vote.html';
    };
});

function onBackButtonPressed(e) {
    'use strict';
    window.location.href = 'activitiManage.html';
}

function onDeviceReady() {
    'use strict';
    document.addEventListener('backbutton', onBackButtonPressed, false);
}

function bindEvents() {
    'use strict';
    document.addEventListener('deviceready', onDeviceReady, false);
}
