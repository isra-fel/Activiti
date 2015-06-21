/*jslint white:true*/
/*global angular*/
/*global alert*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
   
myapp.controller('bindControl', function ($http, $timeout) {
    'use strict';
    var bindCtrl = this,
        onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    
    document.addEventListener("deviceready", function () {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
//        navigator.contacts.find(['id', 'displayName'], function (contacts) {
//            alert('Found ' + contacts.length + ' contacts.');
//        }, function (err) {
//            alert(err);
//        });
    }, false);
});