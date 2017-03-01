/**
 * Created by KARNAV on 14-04-2016.
 */

angular.module('projectPanelController', [])


.controller('projectPanelCtrl',function($window,$location){
 var token = $window.localStorage.getItem('token');

 alert("projectPanelController")
})
