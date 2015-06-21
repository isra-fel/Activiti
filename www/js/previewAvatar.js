/*jslint white:true*/
/*global angular*/
/*global alert*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
   
myapp.controller('previewControl', function ($http, $timeout) {
    'use strict';
    var previewCtrl = this;
    
    previewCtrl.previewedAvatar = JSON.parse(window.localStorage.previewedAvatar);
    
    previewCtrl.preview = function () {
        switch(previewCtrl.previewedAvatar.src) {
            case 'drawcall.png':
                previewCtrl.insertJS('3d/js/drawcall.js');
                break;
            case 'lines.png':
                previewCtrl.insertJS('3d/js/lines.js');
                break;
            case 'prof.png':
                previewCtrl.insertJS('3d/js/prof.js');
                break;
            case 'uint.png':
                previewCtrl.insertJS('3d/js/uint.js');
                break;
            default:
                var container = document.getElementById('container'),
                    h1 = document.createElement('h1');
                h1.innerText = "没有找到此头像";
                container.appendChild(h1);
                break;
        }
    };
    
    previewCtrl.insertJS = function (src) {
        var head = document.getElementsByTagName('head')[0],
            script = document.createElement('script');
        script.src = src;
        head.appendChild(script);
    };
    
    previewCtrl.preview();
});