/*jslint white:true*/
/*global angular*/
/*global alert*/
/*global BMap*/
/*global BMAP_ANCHOR_TOP_LEFT*/
/*global BMAP_STATUS_SUCCESS*/

var myapp;
if (myapp === undefined) {
    myapp = angular.module('myapp', ['ionic']);
}
   
myapp.controller('mapController', function () {
    'use strict';
    var mapCtrl = this;
    
    mapCtrl.activiti = JSON.parse(window.localStorage.mappedActiviti);
    
    mapCtrl.getLocation = function () {
        document.addEventListener("deviceready", function () {
            navigator.geolocation.getCurrentPosition(mapCtrl.gotLocation, function (err) {
                alert(JSON.stringify(err));
            }, {
                timeout: 30000,
                enableHighAccuracy: false
            });
        });
    };
    
    mapCtrl.gotLocation = function (position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        mapCtrl.currentLocation = new BMap.Point(lng, lat);
        mapCtrl.init(mapCtrl.currentLocation);
        mapCtrl.addPerson(mapCtrl.currentLocation);
        mapCtrl.search(mapCtrl.activiti.activityPlace);
    };
    
    mapCtrl.init = function (currentPoint) {
        // 基础功能
        mapCtrl.map = new BMap.Map("allmap");
        var point = currentPoint,
            // 左上角，添加比例尺
            top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}),
            //左上角，添加默认缩放平移控件
            top_left_navigation = new BMap.NavigationControl(); 
        
        mapCtrl.map.centerAndZoom(point, 15);
        //可以缩放
        mapCtrl.map.enableScrollWheelZoom(true);
        
        mapCtrl.map.addControl(top_left_control);        
        mapCtrl.map.addControl(top_left_navigation); 
    };
    
    mapCtrl.addPerson = function (point) {
        var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157)),
            marker = new BMap.Marker(point, {icon:myIcon});
        mapCtrl.map.addOverlay(marker);
    };
    
    mapCtrl.search = function (keyword) {
        var searchOptions = {
            onSearchComplete: mapCtrl.onSearchComplete
        };
        mapCtrl.local = new BMap.LocalSearch(mapCtrl.map, searchOptions);
        mapCtrl.local.search(keyword);
    };
    
    mapCtrl.onSearchComplete = function (results) {
        //判断状态是否正确          
        if (mapCtrl.local.getStatus() === BMAP_STATUS_SUCCESS){
            var i, marker;
            for (i = 0; i < results.getCurrentNumPois(); i += 1){
                marker = new BMap.Marker(new BMap.Point(results.getPoi(i).point.lng, results.getPoi(i).point.lat));  
                mapCtrl.map.addOverlay(marker);
                //给每个搜索结果添加点击事件
                marker.addEventListener("click", mapCtrl.onDestClick);
            }
            mapCtrl.map.centerAndZoom(new BMap.Point(results.getPoi(0).point.lng, results.getPoi(0).point.lat), 15);
        }     
    };
    
    mapCtrl.onDestClick = function (e) {
        if(window.confirm('要将该处设为目的地吗？')) {
            var p = e.target, marker, walking;
			mapCtrl.dest = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
			marker = new BMap.Marker(mapCtrl.dest); 
			mapCtrl.map.clearOverlays();
			mapCtrl.map.addOverlay(marker);       
			//寻路
			walking = new BMap.TransitRoute(mapCtrl.map, {renderOptions:{map: mapCtrl.map, panel: "r-result", autoViewport: true}, onSearchComplete: mapCtrl.onRoutingComplete});
			walking.search(mapCtrl.currentLocation, mapCtrl.dest); 
        } else {
            return false;
        }
    };
    
    mapCtrl.onRoutingComplete = function (results) {
		var plan = results.getPlan(0);
		alert(plan.getDuration(true) + '\n' + 
              plan.getDistance(true));  //获取距离
	};
    
    mapCtrl.getLocation();
    
    //for PC test
//    mapCtrl.gotLocation({coords:{latitude: 31.192653, longitude: 121.589866}});
});