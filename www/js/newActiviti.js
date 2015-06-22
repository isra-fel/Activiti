/*jslint white:true*/
/*global alert*/
/*global angular*/
var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic', 'ionic-datepicker', 'ionic-timepicker']);
}

myapp.controller('newActivitiCtrl', function ($scope, $http, $timeout) {
   'use strict';
    var newAct = this;
    
    newAct.user = window.localStorage.loggedInUser ? JSON.parse(window.localStorage.loggedInUser) : {};
    
    newAct.restoreActiviti = function () {
        newAct.newActiviti = window.localStorage.newActiviti ? JSON.parse(window.localStorage.newActiviti) : {
            title: undefined,
            description: undefined,
            deadline: undefined,
            icon: 'ion-pizza',
            activityChoiceTimes: [],
            activityChoicePlaces: [],
            friendsInvited: []
        };
        newAct.currentDate = window.localStorage.newAct_currentDate ? 
            new Date(JSON.parse(window.localStorage.newAct_currentDate)) : new Date();
        newAct.slots = window.localStorage.newAct_slots ? JSON.parse(window.localStorage.newAct_slots) : {epochTime: 64800, format: 12, step: 15};
    };
    newAct.storeActiviti = function () {
        window.localStorage.newActiviti = JSON.stringify(newAct.newActiviti);
        window.localStorage.newAct_currentDate = JSON.stringify(newAct.currentDate);
        window.localStorage.newAct_slots = JSON.stringify(newAct.slots);
    };
    
    newAct.restoreActiviti();
    
    newAct.sendRequest = function () {
        var jsonpTimeout = $timeout(function () {
//            alert('服务器未响应！');
        }, Number(window.localStorage.timeOut));
        $http.jsonp(window.localStorage.rootUrl + '/createActivity.action?callback=JSON_CALLBACK',
                  {
            "params": {
                "username": newAct.user.username,
                "password": newAct.user.password,
                "title": newAct.newActiviti.title,
                "description": newAct.newActiviti.description,
                "activityChoiceTimes": newAct.newActiviti.activityChoiceTimes,
                "activityChoicePlaces": newAct.newActiviti.activityChoicePlaces,
                "friendsInvited": newAct.newActiviti.friendsInvited,
                "deadline": newAct.newActiviti.deadline,
                "icon": newAct.newActiviti.icon
            },
            "timeout": jsonpTimeout
        }).success(function(data, status, headers, config) {
            if (!data.error) {
                //创建成功则从localStorage里删除此活动
                window.localStorage.removeItem('newActiviti');
                var newActivitiId = data.activityCreated.activityId;
                window.localStorage.detailedActivitiId = newActivitiId;
                window.location.href = 'activitiDetail.html';
            } else {
                alert(data.error);
            }
        });
    };
    
    newAct.validate = function () {
        function validateSingle(entry) {
            if (!entry.val) {
                newAct.validate.err = entry.errMsg;
                return false;
            } else {
                return true;
            }
        }
        var toValidate = [
            {val: newAct.newActiviti.title, errMsg: '请输入标题'},
            {val: newAct.newActiviti.description, errMsg: '请输入描述'},
            {val: newAct.newActiviti.activityChoiceTimes.length, errMsg: '请选择时间'},
            {val: newAct.newActiviti.activityChoicePlaces.length, errMsg: '请选择地点'},
//            {val: newAct.newActiviti.friendsInvited.length, errMsg: '请选择要邀请的好友'},
            {val: newAct.newActiviti.deadline, errMsg: '请选择截止日期'},
            {val: newAct.newActiviti.icon, errMsg: '请选择一个图标'}
        ];
        return toValidate.reduce(function (prev, curr) {
            return prev && validateSingle(curr);
        }, true);
    };
    
    newAct.onBackClick = function () {
        newAct.storeActiviti();
        window.location.href = 'home.html';
    };
    
    newAct.onIconClick = function () {
        newAct.storeActiviti();
        window.location.href = 'newActiviti/chooseIcon.html';
    };
    
    newAct.onTimeClick = function () {
        newAct.storeActiviti();
        window.location.href = 'newActiviti/chooseTime.html';
    };
    
    newAct.onPlaceClick = function () {
        newAct.storeActiviti();
        window.location.href = 'newActiviti/choosePlace.html';
    };
    
    newAct.onFriendClick = function () {
        newAct.storeActiviti();
        window.location.href = 'newActiviti/chooseFriends.html';
    };
    
    newAct.onSubmit = function () {
        if (newAct.validate()) {
//            newAct.fakeSendRequest();
            newAct.sendRequest();
        } else {
            alert(newAct.validate.err);
        }
    };
    
    /* handling time */
    newAct.datePickerCallback = function (val) {
        newAct.newActiviti.deadline = newAct.getDeadline();
        newAct.storeActiviti();
    };
    newAct.timePickerCallback = function (val) {
//        console.log('val =',val);
        newAct.newActiviti.deadline = newAct.getDeadline(val);
//        console.log(newAct.newActiviti.deadline);
        newAct.storeActiviti();
    };
    
    newAct.getDeadline = function (epoch) {
        function prependZero(val) {
            return (val >= 10) ? val.toString() : ('0' + val);
        }
        function parseEpoch(val) {
            var hours = parseInt(val / 3600, 10),
                minutes = (val / 60) % 60;
            return (prependZero(hours) + ":" + prependZero(minutes) + ":00");
        }
        return newAct.currentDate.getFullYear() + '-' +
            prependZero(newAct.currentDate.getMonth() + 1) + '-' +
            prependZero(newAct.currentDate.getDate()) + ' ' +
            parseEpoch(epoch);
//            parseEpoch((newAct.slots.epochTime+16*3600) % 24*3600);
    };
    
});