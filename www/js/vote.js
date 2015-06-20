/*jslint white:true*/
/*global alert*/
/*global angular*/
var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
myapp.controller('voteCtrl', function($http, $timeout) {
    'use strict';
    var vote = this;
    
    vote.nlp = "";
    vote.timeChosen = false;
    vote.placeChosen = false;
    vote.chosenTime = undefined;
    vote.chosenPlace = undefined;
    vote.status = "yes";
    
    vote.user = JSON.parse(window.localStorage.loggedInUser || '{}');
    vote.activiti = 
    vote.activiti = {
        "hostActivityRel": [{"username":"user1", "activityId":"123456"}],
        "activityId" : "123456",
        "title" : "玩玩玩",
        "description" : "五一快到了，大家一起玩吧！",
        "deadline" : "2015-04-09 24:00:00",
        "status" : "notVoted",
        "activityChoiceTimes" : [
            "2015-04-10 12:00:00",
            "2015-04-10 18:00:00",
            "2015-04-11 18:00:00"
        ],
        "activityChoicePlaces" : [
            "三号湾",
            "五角场",
            "世纪公园"
        ],
        "friendsInvited" : [
            "friend1",
            "friend2",
            "friend3",
            "friend4"
        ],
        "icon": 'ion-plane'
    };
    vote.timeChoices = vote.activiti.activityChoiceTimes.map(function (elem) {
        return { "time": elem, "chosen": false};
    });
    vote.placeChoices = vote.activiti.activityChoicePlaces.map(function (elem) {
        return { "place": elem, "chosen": false};
    });
    vote.votes = [
        {
            "activityId" : "123456",
            "username" : "friend1",
            "timeChoice" : "2015-04-10 12:00:00",
            "placeChoice" : "三号湾",
            "status" : "yes"
        },
        {
            "activityId" : "123456",
            "username" : "friend2",
            "timeChoice" : "2015-04-10 18:00:00",
            "placeChoice" : "三号湾",
            "status" : "yes"
        },
        {
            "activityId" : "123456",
            "username" : "friend3",
            "timeChoice" : "",
            "placeChoice" : "",
            "status" : "no"
        }
    ];
    
    vote.countTime = function (time) {
        return vote.votes.filter(function(e) {
            return e.timeChoice === time;
        }).length;
    };
    
    vote.countPlace = function (place) {
        return vote.votes.filter(function(e) {
            return e.placeChoice === place;
        }).length;
    };
    
    vote.chooseTime = function (timeChoice) {
        if (vote.chosenTime) {
            vote.chosenTime.chosen = false;
        }
        vote.timeChosen = true;
        timeChoice.chosen = true;
        vote.chosenTime = timeChoice;
    };
    
    vote.choosePlace = function (placeChoice) {
        if (vote.chosenPlace) {
            vote.chosenPlace.chosen = false;
        }
        vote.placeChosen = true;
        placeChoice.chosen = true;
        vote.chosenPlace = placeChoice;
    };
    
    vote.onSubmit = function () {
        if (vote.validate()) {
            vote.sendRequest();
        } else {
            alert('请填写全信息');
        }
    };
    
    vote.sendRequest = function () {
        var jsonpTimeout = $timeout(function () {
            alert('服务器未响应！');
        }, 13000);
        $http.jsonp(window.localStorage.rootUrl + '/voteActivity.action?callback=JSON_CALLBACK',
                  {
            "params": {
                "username": vote.user.username,
                "password": vote.user.password,
                "status": vote.status,
                "timeChoice": vote.chosenTime.time,
                "placeChoices": vote.chosenPlace.place
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
    
    vote.validate = function () {
        return vote.status && vote.chosenPlace && vote.chosenTime;
    };
});