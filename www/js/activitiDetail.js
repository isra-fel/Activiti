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
//            alert('服务器未响应！');
        }, Number(window.localStorage.timeOut));
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
                detail.votes.forEach(function (elem) {
                    elem.activityId = elem.id.activityId;
                    elem.username = elem.id.username;
                });
                detail.activiti.activityChoiceTimes = data.activityChoiceTimes.map(function (elem) { return elem.time; });
                detail.activiti.activityChoicePlaces = data.activityChoicePlaces.map(function (elem) { return elem.place; });
                detail.activiti.friendsInvited = data.inviteActivityRels;
                detail.activiti.confirmed = detail.activiti.activityDate && detail.activiti.activityPlace;
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
        window.localStorage.votedActiviti = JSON.stringify(detail.activiti);
        window.localStorage.votes = JSON.stringify(detail.votes);
        window.location.href = 'vote.html';
    };
    
    detail.onConfirmClick = function () {
        window.localStorage.confirmedActiviti = JSON.stringify(detail.activiti);
        window.location.href = 'confirm.html';
    };
    
    detail.onMapClick = function () {
        window.localStorage.mappedActiviti = JSON.stringify(detail.activiti);
        window.location.href = 'activitiMap.html';
    }
    
    detail.outOfDate = function (deadline) {
        var ddl = new Date(deadline);
        return Date.now() > ddl;
    };
    
    detail.voteShow = function () {
        return detail.activiti &&
            detail.activiti.username !== detail.user.username &&
            ! detail.votes.some(function (elem) {
                return elem.username === detail.user.username;
            }) &&
            ! detail.outOfDate(detail.activiti.deadline);
    };
    
    detail.confirmShow = function () {
        return detail.activiti &&
            detail.votes &&
            detail.activiti.username === detail.user.username &&
            !detail.activiti.activityDate &&
            !detail.activiti.activityPlace &&
            (detail.outOfDate(detail.activiti.deadline) ||
            detail.activiti.friendsInvited.length === detail.votes.length);
    };
});
