/*jslint white:true*/
/*global angular*/
/*global alert*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
   
myapp.controller('bindControl', function ($http, $timeout) {
    'use strict';
//    var bindCtrl = this;
//
//    document.addEventListener("deviceready", function () {
//        $cordovaGeolocation.getCurrentPosition({
//            timeout : Number(window.localStorage.timeOut),
//            enableHighAccuracy : true
//        }).then(function (position) {
//            var lat  = position.coords.latitude,
//                long = position.coords.longitude;
//            alert('lat =',lat,'long =',long);
//        }, function (err) {
//            alert(err);
//        });
//    }, false);
    
    document.addEventListener("deviceready", function () {
        navigator.contacts.find(['id', 'displayName'], function (contacts) {
            alert('Found ' + contacts.length + ' contacts.');
        }, function (err) {
            alert(err);
        });
    }, false);
});