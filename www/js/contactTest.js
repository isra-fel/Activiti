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

    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    
    document.addEventListener("deviceready", function () {
//        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
//            timeout: 5000,
//            enableHighAccuracy: false
//        });
        navigator.contacts.find(['id', 'displayName'], function (contacts) {
            alert('Found ' + contacts.length + ' contacts.\nThe first one: ', JSON.stringify(contacts[0]));
        }, function (err) {
            alert(err);
        });
    }, false);
});