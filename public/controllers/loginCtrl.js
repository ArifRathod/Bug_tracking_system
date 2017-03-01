/**
 * Created by KARNAV on 10-04-2016.
 **/

var app = angular.module('loginCtrl', []);

app.controller('login', function ( $rootScope, $scope, $http, $window, $location) {
  $window.localStorage.removeItem('isAdmin');
    
  $(".nav").hide();

  $scope.login = function () {
      console.log($scope.email, $scope.password);
      var obj = {
        email: $scope.email,
        password: $scope.password
      };

      console.log(obj);
      $scope.performRequest(obj, "/api/login", function (res) {
        console.log(res);
        $scope.message = res.message;

        if (res.success) {
          console.log(angular.element("input"));
          $window.localStorage.setItem('token', res.token);
          $(".nav").show();
          $location.path('/dashboard');
          alert(res.message);          
        }
      });

      if($scope.email == "admin@admin.com"){
        $window.localStorage.setItem('isAdmin', true);
      }else{
        $window.localStorage.removeItem('isAdmin');
      }


  };

  $scope.performRequest = function (data, url, callback) {
    $http.post(url, data)
      .success(function (res) {
        callback(res);
      });
  };
});
