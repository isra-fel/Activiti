/*jslint white:true*/
/*global alert*/
/*global angular*/
var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
myapp.controller('homeCtrl', function($http, $timeout) {
    'use strict';
    var home = this;
    
    home.user = JSON.parse(window.localStorage.loggedInUser || '{}');
    
    home.listCreatedHidden = false;
    home.listJoinedHidden = false;
    home.listOutOfDateHidden = true;
    
    home.listCreated = [];
    home.listJoined = [];
    home.listOutOfDate = [];
    home.listNew = [];
    
    home.viewDetail = function(activiti) {
        window.localStorage.detailedActivitiId = activiti.activityId;
        window.location.href = 'activitiDetail.html';
    };
    
    home.sendRequest = function() {
        var jsonpTimeout = $timeout(function () {
            alert('服务器未响应！');
        }, 13000);
        $http.jsonp(window.localStorage.rootUrl + '/getAllActivities.action?callback=JSON_CALLBACK',
                  {
            "params": {
                "username": home.user.username,
                "password": home.user.password
            },
            "timeout": jsonpTimeout
        }).success(function(data, status, headers, config) {
            if (!data.error) {
                home.listCreated = data.listCreated;
                home.listJoined = data.listJoined;
                home.listOutOfDate = data.listOutOfDate;
                home.listNew = data.listNew;
            } else {
                alert(data.error);
            }
            home.receiveDone = true;
        });
    };
    
    home.receiveDone = false;
    home.sendRequest();
    
    home.logout = function () {
        window.localStorage.removeItem('loggedInUser');
        window.localStorage.removeItem('newActiviti');
        window.localStorage.removeItem('newAct_currentDate');
        window.localStorage.removeItem('newAct_slots');
        window.location.href = 'index.html';
    }
});