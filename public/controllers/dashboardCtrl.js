/**
 * Created by KARNAV on 10-04-2016.
 **/

var app = angular.module('dashboardCtrl', ['datatables']);

app.controller('dashboard', function ($rootScope, $scope, $http,$window,$location ) {
console.log("$scope.ViewBugData",$scope.ViewBugData)
  var isAdmin = $window.localStorage.getItem('isAdmin');
    if(isAdmin == null){
      console.log("going to hide")
      $("#userpanel").hide();
    }else{
        $("#userpanel").show();
    }

  $scope.logout = function(){
    console.log("this is")
    $window.localStorage.removeItem('token');
    $window.localStorage.removeItem('isAdmin');
    $location.path("/login");
  }

//  $scope.comment ="";
  $scope.init = function(){
    $scope.CountBugs();
    var obj = {};
    console.log(obj);
    var token = $window.localStorage.getItem('token');
    obj.token = token;
    $scope.performRequest(obj, "/api/getBugs", function (res) {
      console.log(res);
      $scope.bugsdata = res;
    });    
  };

    $scope.myProject = function(){
      alert($scope.number.projectname)
    }

  $scope.update = function(index) {
    var val = $scope.bugsdata[index];
    console.log(val)
    $window.localStorage.setItem('bugsdata',JSON.stringify(val));
  }

  $scope.performRequest = function (data, url, callback) {
    $http.post(url, data)
      .success(function (res) {
        callback(res);
      });
  };

  $scope.getBugDetails = function(){
    $scope.ViewBugData = $window.localStorage.getItem('bugsdata') ? JSON.parse($window.localStorage.getItem('bugsdata')) : undefined; 

    if(!$scope.ViewBugData){
      alert("Please Choose Bug from dashboard")
    }
    var token = $window.localStorage.getItem('token');
    $scope.performRequest({"token":token}, "/api/getBugHistory", function (res) {
      console.log(res);
      $scope.bughistory = res;
    }); 
  }

  $scope.CountBugs = function(){
    var token = $window.localStorage.getItem('token');
    $scope.performRequest({"bugstatus":"New","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.NewCount = res;
    });
    $scope.performRequest({"bugstatus":"Confirm","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.confirmedCount = res;
    });
    $scope.performRequest({"bugstatus":"Acknowledged","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.acknowledgeCount = res;
    });
    $scope.performRequest({"bugstatus":"Inprogress","token":token,"token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.inprogressCount = res;
    });
    $scope.performRequest({"bugstatus":"feedback","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.feedbackCount = res;
    });
    $scope.performRequest({"bugstatus":"Resolved","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.resolvedCount = res;
    });
    $scope.performRequest({"bugstatus":"Closed","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.closedCount = res;
    });
    $scope.performRequest({"severity":"Minor","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.MinorCount = res;
    });
    $scope.performRequest({"severity":"Major","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.MajorCount = res;
    });
    $scope.performRequest({"severity":"Critical","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.CriticalCount = res;
    });
    $scope.performRequest({"severity":"Trival","token":token}, "/api/bugsCount", function (res) {
      console.log(res);
      $scope.TrivalCount = res;
    });
  }

  $scope.getuser = function(){
    // alert($scope.assignto);
     var token = $window.localStorage.getItem('token');
    $scope.performRequest({"emptype":$scope.assignto,"token":token}, "/api/getuserdetails", function (res) {
      console.log(res);
      if(res && res.length>0){
        $("#userdetails").prop('disabled', false)
        $scope.Developer = res;  
      }else{
        $("#userdetails").prop('disabled', 'disabled')
        // $("userdetails").attr("disabled","disabled")
      }      
    });
  }

  $scope.updatebug = function(){
    var token = $window.localStorage.getItem('token');
    console.log($scope.ViewBugData);
    $scope.comment= $(".comment").val();
    //alert($scope.comment)
    var obj = {
      "reportedby":$scope.ViewBugData.reportedby,
      "bugname": $scope.ViewBugData.bugname,
      "projectname": $scope.ViewBugData.projectname,
      "assignto": $scope.assigntouser,
      "bugstatus":$scope.bugstatus,
      "_id":$scope.ViewBugData._id,
      "comment":$scope.comment,
      "token":token
    }

    console.log(obj)
    if($scope.comment.length>0 && $scope.bugstatus != undefined && $scope.assigntouser != undefined){
      $scope.performRequest(obj, "/api/updateBugs", function (res) {
        console.log(res);
          $scope.performRequest(obj, "/api/bugHistory", function (res) {
            console.log(res);
            $location.path("/dashboard")
          });        
      }); 
      
    }else{
      alert("Please fill comment/assignto/bugstatus");
    }
  }



});
