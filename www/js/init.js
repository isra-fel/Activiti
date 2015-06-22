(function writeConsts() {
    'use strict';
    window.localStorage.rootUrl = 'http://webpj.aliapp.com';
//    window.localStorage.rootUrl = 'http://192.168.1.110:8081/adwebproject';
    
    //jsonp请求等待时间
    window.localStorage.timeOut = '3000';
}());

if (window.localStorage.loggedInUser) {
    window.location.href = 'home.html';
}

//test only
//window.location.href = 'contactTest.html';