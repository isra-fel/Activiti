/*jslint white:true*/
/*global angular*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}

myapp.controller('chooseFriendsControl', function () {
    'use strict';
    var cfc = this;
    
    cfc.friends = [];
    cfc.listOfFriends = JSON.parse(window.localStorage.listOfFriends || '[]');
    
    cfc.storeFriends = function () {
        var activiti = JSON.parse(window.localStorage.newActiviti);
        activiti.friendsInvited = cfc.friends;
        window.localStorage.newActiviti = JSON.stringify(activiti);
    };
    
    cfc.restoreFriends = function () {
        var activiti = JSON.parse(window.localStorage.newActiviti);
        cfc.friends = activiti.friendsInvited || [];
        cfc.friends.forEach(function (friendChosen) {
            cfc.listOfFriends.filter(function (friend) {
                return friend.username === friendChosen;
            })[0].chosen = true;
        });
    };
    
    cfc.restoreFriends();
    
    cfc.onBackClick = function () {
        window.location.href = '../newActiviti.html';
    };
    
    cfc.onItemClick = function (friend) {
        function chooseFriend(friend) {
            friend.chosen = true;
            cfc.friends.push(friend.username);
        }
        function unchooseFriend(friend) {
            friend.chosen = false;
            cfc.friends.splice(cfc.friends.indexOf(friend.username));
        }
        if (friend.chosen) {
            unchooseFriend(friend);
        } else {
            chooseFriend(friend);
        }
        cfc.storeFriends();
    };
});