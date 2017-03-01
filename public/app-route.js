
angular.module('appRoutes',['ngRoute', 'ngMessages'])
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/login.html',
          controller: "login"
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: "login"
        })
        .when('/signup', {
          templateUrl: 'views/signup.html',
          controller: "signUp"
        })
        .when('/dashboard', {
          templateUrl: 'views/dashboard.html',
          controller:'dashboard'
        })
        .when('/projectDetails', {
          templateUrl: 'views/projectDetails.html'
        })
        .when('/projectStats', {
          templateUrl: 'views/projectStats.html'
        })
        .when('/newProject', {
          templateUrl: 'views/newProject.html',
          controller:'newProject'
        })
        .when('/enterBugs', {
          templateUrl: 'views/enterBugs.html',
          controller:'bugs'
        })
        .when('/viewBugs', {
          templateUrl: 'views/viewBugs.html',
          controller:'dashboard'
        })
        .when('/projectPanel', {
          templateUrl: 'views/projectPanel.html',
          controller:'projectPanelCtrl'
        })
        .when('/viewProject', {
          templateUrl: 'views/viewProject.html',
          controller:'projectPanelCtrl'
        })
        .when('/userPanel', {
          templateUrl: 'views/userPanel.html',
          controller:'userPanelCtrl'
        })
        .when('/viewUser', {
          templateUrl: 'views/viewUser.html',
          controller:'userPanelCtrl'
        });

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

    });
