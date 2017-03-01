/**
 * Created by KARNAV on 14-04-2016.
 */

angular.module('userPanelController', [])


.controller('userPanelCtrl',function($window,$location,$scope,$http){

$scope.init =function(){
	var token = $window.localStorage.getItem('token');
	$scope.performRequest({"token":token}, "/api/getallUser", function (res) {
      console.log(res);
      $scope.users = res;
    });
}

$scope.performRequest = function (data, url, callback) {
    $http.post(url, data)
      .success(function (res) {
        callback(res);
      });
  };


})
