/**
 * Created by KARNAV on 14-04-2016.
 */

angular.module('getUser', [])

  .controller('myCtrl', ['$rootScope','$scope', '$http','$window','$location', function ($rootScope, $scope, $http, $window, $location) {
    
    $scope.myProject = function(){
      alert($scope.number.projectname)
    }

    var token = $window.localStorage.getItem('token');
    if (token && token.length > 0) {

      var obj ={
        "token":token

      };
      $rootScope.currentUser = true;

      $http.post('/api/getUser', obj)
        .success(function (res) {
          $scope.currentUser = res._doc;
          console.log(res._doc);
          $scope.apply;

        });
        $http.post('/api/projects', obj)
        .success(function (res) {
         $scope.projectData =res;

        });
    }else{
      $scope.currentUser = false;
      alert("please login...!");
      $location.path('/login');
    }





  }])

  .controller('users', function($scope, $window, $http, $location){

    $http.post('/api/users', user)
      .success(function (res) {
        $scope.User = res.users
        console.log(res);

      });
  })

.controller('logout',function($window,$location){
  $window.localStorage.removeItem('token');
})
