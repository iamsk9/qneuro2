angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup) {

  $scope.goToLogin = function(){
    $state.go('login');
  };

  $scope.goToSignup = function(){
    $state.go('signup');
  };
})

.controller('LoginCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup, UserService) {

  $scope.loginData = {};

  $scope.doLogin = function(){
    console.log($scope.loginData);
    /*UserService.logining($scope.loginData)
    .then(function (result){
      $rootScope.userId = result.id;
      console.log($rootScope.userId);
      if(result.mobile == $scope.loginData.mobile){
      var alertPopup = $ionicPopup.alert({
            title: 'Welcome!',
            template: 'Thank You for Logining...'
          });
          $state.go('addChild');
          $scope.loginData.email = '';
          $scope.loginData.mobile = '';
        }
        else {
          var alertPopup = $ionicPopup.alert({
                title: 'Oops!',
                template: 'Invalid Password or Email'
          });
        }
    });*/
    UserService.logining($scope.loginData)
    .then(function(result){
      console.log(result);
      if (result == 0) {
        var alertPopup = $ionicPopup.alert({
              title: 'Oops!',
              template: 'Invalid Password or Email'
        });
      }else {
        $rootScope.userId = result;
        var alertPopup = $ionicPopup.alert({
          title: 'Welcome!',
          template: 'Thank You for Logining...'
        });
        $state.go('addChild');
        $scope.loginData.email = '';
        $scope.loginData.mobile = '';
        $state.go('addChild');
      }
    });
  };
})

.controller('SignupCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup, UserService) {

  $scope.userDetails = {};

  $scope.addUser = function(){

    $scope.userDetails.created_at = new Date();
    UserService.addUser($scope.userDetails)
    .then(function(result){
      console.log(result);
      var alertPopup = $ionicPopup.alert({
        title: 'Welcome!',
        template: 'Thank You for signing up...'
      });
      UserService.logining($scope.userDetails)
      .then(function(result){
        console.log(result);
        $rootScope.userId = result;
        $state.go('subscription');
        $scope.userDetails.userName = '';
        $scope.userDetails.fullName = '';
        $scope.userDetails.email = '';
        $scope.userDetails.address = '';
        $scope.userDetails.mobile = '';
      });
    });
  };

  $scope.goBack = function(){
    $state.go('main');
  };
})

.controller('RegisterCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup, UserService) {

  $scope.accountDetails = {};
  $scope.gender = {};
  var flag = 0;

  $scope.createAccount = function(){
    if($scope.gender.female != null && $scope.gender.female != false && $scope.gender.male != null && $scope.gender.male != false){
      flag = 0;
      var alertPopup = $ionicPopup.alert({
            title: 'Not Both!',
            template: 'Select Male or Female'
      });
    }else {
      if($scope.gender.male != null && $scope.gender.male != false){
        $scope.accountDetails.gender = "male";
        flag = 1;
      }
      else if ($scope.gender.female != null && $scope.gender.female != false) {
        $scope.accountDetails.gender = "female";
        flag = 1;
      }else {
        flag = 0;
      }
      if(flag){
        $scope.accountDetails.created_at = new Date();
        $scope.accountDetails.updated_at = new Date();
        console.log($scope.accountDetails);
        $scope.accountDetails.userId = $rootScope.userId;
        UserService.addChildDetails($scope.accountDetails);
        var alertPopup = $ionicPopup.alert({
          title: 'Oops!',
          template: 'Your Child Details are added Successfully'
        });
        $state.go('report');
      }else {
        var alertPopup = $ionicPopup.alert({
              title: 'Oops!',
              template: 'Select the Child Gender'
            });
      }
    }
  };
})

.controller('DeleteCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup, UserService) {

  $scope.deleteDetails = {};
  $scope.gender = {};
  var flag = 0;

  $scope.deleteAccount = function(){
    if($scope.gender.female != null && $scope.gender.female != false && $scope.gender.male != null && $scope.gender.male != false){
      flag = 0;
      var alertPopup = $ionicPopup.alert({
            title: 'Not Both!',
            template: 'Select Male or Female'
          });
    }else {
      if($scope.gender.male != null && $scope.gender.male != false){
        $scope.deleteDetails.gender = "male";
        flag = 1;
      }
      else if ($scope.gender.female != null && $scope.gender.female != false) {
        $scope.deleteDetails.gender = "female";
        flag = 1;
      }else {
        flag = 0;
      }
      if(flag){
        UserService.deleteChildDetails($scope.deleteDetails);
      }else {
        var alertPopup = $ionicPopup.alert({
          title: 'Oops!',
          template: 'Select the Child Gender'
        });
      }
    }
  };
})

.controller('SubscriptionCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup, UserService) {

  var subscript = {};
  $scope.addSubscription = function(){
    subscript.userId = $rootScope.userId;
    if(document.getElementById('plan1').checked)
      subscript.planNo = 'Plan 1';
    else if(document.getElementById('plan2').checked)
      subscript.planNo = 'Plan 2';
    else if(document.getElementById('plan3').checked)
      subscript.planNo = 'Plan 3';
    else {
      var alertPopup = $ionicPopup.alert({
            title: 'Oops!',
            template: 'Select a Subscription plan'
      });
    }
    UserService.addSubscription(subscript);
    var alertPopup = $ionicPopup.alert({
      title: 'Thank You!',
      template: 'Your Subscription has been Successfully added..'
    });
    $state.go('register');
  };
})

.controller('AddChildCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup) {

  $scope.addChild = function(){
    $state.go('register');
  };

  $scope.goToReport = function(){
    $state.go('report');
  };

  $scope.goToSettings = function(){
    $state.go('settings');
  };

  $scope.goToSubscriptions = function(){
    $state.go('subscription');
  };

  $scope.goToDelete = function(){
    $state.go('delete');
  };
})

.controller('ReportCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup) {


  $scope.goToAddChild = function(){
    $state.go('addChild');
  };

  $scope.goToSettings = function(){
    $state.go('settings');
  };

  $scope.goToSubscriptions = function(){
    $state.go('subscription');
  };

  $scope.goToDelete = function(){
    $state.go('delete');
  };
})

.controller('SettingsCtrl', function($scope, $state, Backand, $http, $rootScope, $ionicPopup, $window) {

  $scope.goToAddChild = function(){
    $state.go('addChild');
  };

  $scope.goToReport = function(){
    $state.go('report');
  };

  $scope.goToSubscriptions = function(){
    $state.go('subscription');
  };

  $scope.logout = function(){
    $window.localStorage.clear();
    console.log($rootScope.userId);
    $state.go('main');
  };

  $scope.goToDelete = function(){
    $state.go('delete');
  };
});
