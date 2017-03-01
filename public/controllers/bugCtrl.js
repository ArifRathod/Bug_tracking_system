/**
 * Created by KARNAV on 10-04-2016.
 **/

var app = angular.module('bugCtrl', []);

app.controller('bugs', function ($rootScope, $scope, $http,$window,$location ) {
  $scope.New = "New";

    $scope.submit_Click = function(){
      
      var project = $scope.number.projectname;
        var obj = {
          "reportedby":$scope.currentUser.firstname,
          "bugname": $scope.bugname,
          "projectname": project,
          "assignto": $scope.assignto,
          "tags": $scope.tags,
          "foundinversion":$scope.foundinversion ,
          "severity": $scope.severity,
          "projectsection": $scope.projectsection,
          "priority": $scope.priority,
          "bugtype": $scope.bugtype,
          "reproducibility": $scope.reproducibility,
          "devicetype": $scope.devicetype,
          "model": $scope.model,
          "os": $scope.os,
          "browser": $scope.browser,
          "expectedresult": $scope.expectedresult,
          "stepstoreproduce": $scope.stepstoreproduce,
          "bugdesc": $scope.bugdesc,
          "bugstatus":$scope.New,
          "_id":$scope.ID
        }

      console.log(obj);
      var token = $window.localStorage.getItem('token');
      obj.token = token;
      $scope.performRequest(obj, "/api/bugs", function (res) {
        console.log(res);
        $scope.message = res.message;
        if (res.success) {
          alert("Bug Report successful");
        }
      });
    }

  $scope.performRequest = function (data, url, callback) {
    $http.post(url, data)
      .success(function (res) {
        callback(res);
      });
  };

  $scope.init = function(){
    var token = $window.localStorage.getItem('token');
    var obj ={};
    obj.token = token;
    $http.post("/api/projects", obj)
      .success(function (res) {
        $scope.projectData =res;
        console.log("res",res)
      });
  };

});
