/*jslint white:true*/
/*global angular*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}

myapp.controller('iconCtrl', function ($scope, $http, $timeout) {
    'use strict';
    $scope.allIcons = [{catagory: 'sport', icons:[
        {code:'ion-ios-basketball-outline', active:false},
        {code:'ion-ios-football', active:false},
        {code:'ion-android-bicycle', active:false},
        {code:'ion-ios-game-controller-b-outline', active:false}
    ]}, {catagory: 'eat', icons:[
        {code:'ion-pizza', active:false},
        {code:'ion-icecream', active:false},
        {code:'ion-beer', active:false},
        {code:'ion-coffee', active:false},
        {code:'ion-android-bar', active:false},
        {code:'ion-fork', active:false}
    ]}, {catagory: 'social', icons:[
        {code:'ion-male', active:false},
        {code:'ion-social-instagram-outline', active:false},
        {code:'ion-ios-videocam-outline', active:false},
        {code:'ion-ios-cart-outline', active:false}
    ]}, {catagory: 'travel', icons:[
        {code:'ion-plane', active:false},
        {code:'ion-model-s', active:false}
    ]}];
    
    $scope.storeIcon = function () {
        var newActiviti = JSON.parse(window.localStorage.newActiviti);
        newActiviti.icon = $scope.icon.code;
        window.localStorage.newActiviti = JSON.stringify(newActiviti);
    };
    
    $scope.restoreIcon = function () {
        if (!window.localStorage.newActiviti) {
            throw new Error('你怎么到这的OへO？');
        }
        var storedIconCode = JSON.parse(window.localStorage.newActiviti).icon || 'ion-pizza';
        $scope.icon = $scope.allIcons.reduce(function (prev, now){
            return prev.concat(now.icons);
        }, []).filter(function (e){
            return e.code === storedIconCode;
        })[0] || $scope.allIcons[1].icons[1];
        $scope.icon.active = true;
    };
    
    $scope.restoreIcon();
    
    $scope.chooseIcon = function (icon) {
        $scope.icon.active = false;
        $scope.icon = icon;
        $scope.icon.active = true;
        $scope.storeIcon();
    };
    
    $scope.onBackClicked = function () {
        window.location.href = "../newActiviti.html";
    };
});