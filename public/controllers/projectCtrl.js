/**
 * Created by KARNAV on 10-04-2016.
 **/

var app = angular.module('projectCtrl', []);

app.controller('newProject', function ($rootScope, $scope, $http,$window,$location ) {


  $scope.submit_Click = function(){
    var obj = {
      createdby: "hello",
      projectname: $scope.projectname,
      projectdesc: $scope.projectdesc,
      projecttype: $scope.projecttype,
      projectversion: $scope.projectversion,
      projectsection: $scope.projectsection
    }

    console.log(obj);
    var token = $window.localStorage.getItem('token');
    obj.token = token;
    $scope.performRequest(obj, "/api/newProject", function (res) {
      console.log(res);
      $scope.message = res.message;
      if (res.success) {
        alert("new Project Added");
      }
    });

  }





  $scope.performRequest = function (data, url, callback) {
    $http.post(url, data)
      .success(function (res) {
        callback(res);
      });
  };
});


