/*jslint white:true*/
/*global angular*/
/*global alert*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic', 'ionic-datepicker', 'ionic-timepicker']);
}
   
myapp.controller('pickerCtrl', function pickerCtrl ($scope) {
    'use strict';
    var picker = this;
    
    picker.currentDate = new Date();
    picker.slots = {epochTime: 64800, format: 12, step: 15};
    
    picker.storeTime = function () {
        var newActiviti = JSON.parse(window.localStorage.newActiviti);
        newActiviti.activityChoiceTimes = picker.times;
        window.localStorage.newActiviti = JSON.stringify(newActiviti);
    };
    
    picker.restoreTime = function () {
        if (!window.localStorage.newActiviti) {
            throw new Error('OへO');
        }
        picker.times = JSON.parse(window.localStorage.newActiviti).activityChoiceTimes || [];
    };
    
    picker.restoreTime();
    
    picker.addTime = function () {
        if (picker.times.indexOf(picker.getTimeString()) !== -1) {
            alert('此时间已在列表中');
        } else {
            picker.times.push(picker.getTimeString());
            picker.storeTime();
        }
    };
    
    picker.removeTime = function (time) {
        var index = picker.times.indexOf(time);
        if (index === -1) {
            alert('并没有找到这个时间');
        } else {
            picker.times.splice(index, 1);
            picker.storeTime();
        }
    };
    
    picker.getTimeString = function () {
        function prependZero(val) {
            return (val >= 10) ? val.toString() : ('0' + val);
        }
        function parseEpoch(val) {
            var hours = parseInt(val / 3600, 10),
                minutes = (val / 60) % 60;
            return (prependZero(hours) + ":" + prependZero(minutes) + ":00");
        }
        return picker.currentDate.getFullYear() + '-' +
            prependZero(picker.currentDate.getMonth() + 1) + '-' +
            prependZero(picker.currentDate.getDate()) + ' ' +
            parseEpoch(picker.slots.epochTime);
    };
});