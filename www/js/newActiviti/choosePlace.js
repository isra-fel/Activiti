/*jslint white:true*/
/*global angular*/
/*global alert*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
   
myapp.controller('chooseCtrl', ['$scope', function chooseCtrl ($scope) {
    'use strict';
    var choose = this;
    
    choose.storePlace = function () {
        var newActiviti = JSON.parse(window.localStorage.newActiviti);
        newActiviti.activityChoicePlaces = choose.places;
        window.localStorage.newActiviti = JSON.stringify(newActiviti);
    };
    
    choose.restorePlace = function () {
        if (!window.localStorage.newActiviti) {
            throw new Error('OへO');
        }
        choose.places = JSON.parse(window.localStorage.newActiviti).activityChoicePlaces || [];
    };
    
    choose.restorePlace();
    
    choose.newPlace = "";
    choose.addPlace = function () {
        if (!choose.newPlace) {
            return alert('请输入地点');
        }
        if (choose.places.indexOf(choose.newPlace) !== -1) {
            alert('此地点已在列表中');
        } else {
            choose.places.push(choose.newPlace);
            choose.newPlace = "";
            choose.storePlace();
        }
    };
    
    choose.removePlace = function (place) {
        var index = choose.places.indexOf(place);
        if (index === -1) {
            alert('并没有找到这个地点');
        } else {
            choose.places.splice(index, 1);
            choose.storePlace();
        }
    };
}]);