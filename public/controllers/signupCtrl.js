
angular.module('signupCtrl',[])

  .controller('signUp', function($scope,$http,$window,$location){

    $scope.signup = function(){
      console.log($scope.email, $scope.firstname, $scope.lastname, $scope.emptype, $scope.password);
      var obj = {
        email:$scope.email,
        firstname:$scope.firstname,
        lastname:$scope.lastname,
        emptype:$scope.emptype,
        password:$scope.password
      };
      console.log(obj);
      $scope.performRequest(obj,"/api/signup", function (res) {
        console.log(res);
        $scope.message = res.message;
        if(res.success){
          console.log(angular.element("input"));
          $window.localStorage.setItem('token', res.token);
          $scope.message = res.message;
          alert("you are successfully Registered and loggedIn !" + user.firstname);
          $location.path('/dashboard');

        }
      });
    };

    $scope.performRequest = function (data,url,callback) {
      $http.post(url,data)
        .success(function(res){
          callback(res);

        });
    }

  });
