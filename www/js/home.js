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
//            alert('服务器未响应！');
        }, Number(window.localStorage.timeOut));
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
        });
    };
    
    home.sendRequest();
    
    home.logout = function () {
        window.localStorage.removeItem('loggedInUser');
        window.localStorage.removeItem('newActiviti');
        window.localStorage.removeItem('newAct_currentDate');
        window.localStorage.removeItem('newAct_slots');
        window.location.href = 'index.html';
    };
});

myapp.controller('friendsCtrl', function ($http, $ionicPopup) {
    'use strict';
    var friends = this;
    friends.user = JSON.parse(window.localStorage.loggedInUser || '{}');
    friends.sendRequest = function () {
        $http.jsonp(window.localStorage.rootUrl + '/getFriendsList.action?callback=JSON_CALLBACK',
                  {
            "params": {
                "username": friends.user.username,
                "password": friends.user.password
            }
        }).success(function (data) {
            if (!data.error) {
                friends.listOfFriends = data.listOfFriends;
            } else {
                alert(data.error);
            }
        });
    };
    friends.sendRequest();
    
    friends.showPopup = function () {
        var myPopup = $ionicPopup.show({
        title: '确认导入通讯录好友？',
        buttons: [
          { text: '取消' },
          {
            text: '<b>确认</b>',
            type: 'button-positive',
            onTap: function(e) {
                friends.addFriends();
            }
          }
        ]
      });
    };
    
    friends.addFriends = function () {
        function addFriendsByPhoneNumber(friendsPhoneNumbers) {
            $http.jsonp(window.localStorage.rootUrl + '/addFriendsByPhoneNumber.action?callback=JSON_CALLBACK',
                        {
                "params": {
                    "username": friends.user.username,
                    "password": friends.user.password,
                    "friendsPhoneNumbers": friendsPhoneNumbers
                }
            }).success(function (data) {
                if (!data.error) {
                    alert('导入了' + (data.listOfFriends.length - friends.listOfFriends.length) + '个好友！');
                    friends.listOfFriends = data.listOfFriends;
                } else {
                    alert(data.error);
                }
            });
        }
        
        function parseCordovaContacts(cordovaConcats) {
            return cordovaConcats.map(function (e) {
                return e.phoneNumbers ? (e.phoneNumbers.length ? e.phoneNumbers[0].value : undefined) : undefined;
            }).filter(function (e) {
                //filter out 'undefined's
                return e;
            });
        }
        
        document.addEventListener('deviceready', function() {
            navigator.contacts.find(['id', 'displayName'], function (contacts) {
                try {
                    addFriendsByPhoneNumber(parseCordovaContacts(contacts));
                } catch (err) {
                    alert(JSON.stringify(parseCordovaContacts(contacts)));
                }
            });
        }, false);
    };
});