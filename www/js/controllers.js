angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup) {

  $scope.goToLogin = function(){
    $state.go('login');
  };

  $scope.goToSignup = function(){
    $state.go('signup');
  };
})

.controller('LoginCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup, UserService, $ionicPlatform) {

  $scope.loginData = {};
  $rootScope.checkChild=true;

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
          template: 'Your details have been Successfully recorded...'
        });
        var data ={};
        data.id=$rootScope.userId;
        UserService.ifNoChild(data).then(function(res){
          console.log(res);
          if(res==0){
            $rootScope.checkChild=false;
            }
        });
        $state.go('gamereport');
        $scope.loginData.email = '';
        $scope.loginData.password = '';

      }
    });
  };
})

.controller('SignupCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup, UserService) {

  $scope.userDetails = {};

  $scope.addUser = function(){
    if($scope.userDetails.userName ==null||$scope.userDetails.fullName ==null||$scope.userDetails.email ==null||$scope.userDetails.address == null||$scope.userDetails.mobile ==null||$scope.userDetails.password == null)
    {
      var alertPopup = $ionicPopup.alert({
        title: 'Oops!',
        template: 'Please enter all the fields...'
      });
    }
    else {
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
          $scope.userDetails.password = '';
        });
      });
    }
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

    if($scope.gender.male == null && $scope.gender.female == null){
      flag = 0;
      var alertPopup = $ionicPopup.alert({
            title: 'Oops',
            template: 'Select Male or Female'
      });
    }else {
      if($scope.gender.female == null && $scope.gender.male == "male"){
        $scope.accountDetails.gender = "male";
        flag = 1;
      }
      else if ($scope.gender.male == null && $scope.gender.female == "female") {
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
        UserService.addChildDetails($scope.accountDetails).then(function(res){
          if(res==-1)
           {
             var alertPopup = $ionicPopup.alert({
               title: 'Oops!',
               template: 'Limit exceeded for adding child'
             });
             $state.go('report');
           }
           else {
             var alertPopup = $ionicPopup.alert({
               title: 'Oops!',
               template: 'Your Child Details are Successfully Recorded'
             });
             $state.go('gamereport');
           }
           $scope.accountDetails.userName="";
           $scope.accountDetails.fullName="";
           $scope.accountDetails.dob="";
          $scope.accountDetails.grade="";

        });
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
        var alertPopup = $ionicPopup.alert({
              title: 'Oops!',
              template: 'Successfully Deleted Your Child Details'
        });
        $state.go('addChild');
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
    {
      subscript.planNo = 'Plan 1';
      console.log(subscript);
      UserService.addSubscription(subscript);
      var alertPopup = $ionicPopup.alert({
        title: 'Thank You!',
        template: 'Your Subscription has been Successfully added..'
      });
      $state.go('register');
    }
    else if(document.getElementById('plan2').checked)
    {
        subscript.planNo = 'Plan 2';
        console.log(subscript);
        UserService.addSubscription(subscript);
        var alertPopup = $ionicPopup.alert({
          title: 'Thank You!',
          template: 'Your Subscription has been Successfully added..'
        });
        $state.go('register');
    }
    else if(document.getElementById('plan3').checked)
    {
      subscript.planNo = 'Plan 3';
      console.log(subscript);
      UserService.addSubscription(subscript);
      var alertPopup = $ionicPopup.alert({
        title: 'Thank You!',
        template: 'Your Subscription has been Successfully added..'
      });
      $state.go('register');
    }
    else {
      var alertPopup = $ionicPopup.alert({
            title: 'Oops!',
            template: 'Select a Subscription plan'
      });
    }
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

.controller('SettingsCtrl', function($scope, $state, Backand, $http, $rootScope, $ionicPopup, $window,UserService) {

  //$scope.gameOneDetails={};
  //$scope.gameTwoDetails={};
  //$scope.gameThreeDetails={};
  $scope.pin={};
  $scope.goToMenu = function(){
    $state.go('onclickmenu');
  };

  $scope.goToAddChild = function(){
    $state.go('register');
  };

  $scope.renew = function(){
    if($rootScope.checkChild)
    $state.go('subscriptionrenew');
    else {
      var alertPopup = $ionicPopup.alert({
        title: 'Sorry!',
        template: 'You dont have any child details'
      });
    }
  };

  $scope.goToGameReport = function(id,game){
    console.log(id);
    console.log(game);
    var gamedetails=[];
    var j=0;
    gamedetails[j]="";
    var data ={};
    data.id=id;
    data.game=game;
    UserService.getGameOneDetails(data).then(function(result){
      $state.go('gamereport');
      for(var i=0;i<result.length;i++)
      {
      //  console.log(result[i]);
      //  console.log(typeof(result[i]));
        if(result[i]==' '){
          j++;
          gamedetails[j]="";}
        else{
        gamedetails[j]=gamedetails[j]+result[i];
        //console.log(gamedetails[j]);
     }
      }
      for(i=0;i<gamedetails.length;i++)
        console.log(gamedetails[i]);
      //{
        //console.log(typeof(gamedetails[i]));
      //}
      $rootScope.correctanswers=gamedetails[0];
      $rootScope.que     =  gamedetails[2];
      $rootScope.missed  =  gamedetails[4];
      $rootScope.totaltime= gamedetails[6];
      //console.log($scope.tot);
    });

    //$scope.gameOneDetails={grade:'b',result:'done 2 out of 8'};
  };
  $scope.logout = function(){
    $window.localStorage.clear();
    console.log($rootScope.userId);
    $state.go('main');
    $rootScope.checkChild=true;
  };

})

.controller('OnClickMenuCtrl', function($scope, $state,Backand, $http, $rootScope, $ionicPopup,UserService) {

  $scope.goToSettings = function(){
    $state.go('settings');
  };

  $scope.goToAddChild = function(){
    $state.go('addChild');
  };

  $scope.goToSubscriptions = function(){
    $state.go('subscription');
  };
})

.controller('Subscriptionrenew', function($scope, $state,Backand, $http, $rootScope, $ionicPopup,UserService) {
  var subscript = {};
  $scope.updatePlan = function(){
    subscript.userId = $rootScope.userId;
    if(document.getElementById('plan1').checked)
    {
      subscript.planNo = 'Plan 1';
      console.log(subscript);
      UserService.updateSubscription(subscript);
      var alertPopup = $ionicPopup.alert({
        title: 'Thank You!',
        template: 'Your Subscription has been Successfully renwed..'
      });
      $state.go('register');
    }
    else if(document.getElementById('plan2').checked)
    {
        subscript.planNo = 'Plan 2';
        console.log(subscript);
        UserService.updateSubscription(subscript);
        var alertPopup = $ionicPopup.alert({
          title: 'Thank You!',
          template: 'Your Subscription has been Successfully renwed..'
        });
        $state.go('register');
    }
    else if(document.getElementById('plan3').checked)
    {
      subscript.planNo = 'Plan 3';
      console.log(subscript);
      UserService.updateSubscription(subscript);
      var alertPopup = $ionicPopup.alert({
        title: 'Thank You!',
        template: 'Your Subscription has been Successfully renwed..'
      });
      $state.go('register');
    }
    else {
      var alertPopup = $ionicPopup.alert({
            title: 'Oops!',
            template: 'Select a Subscription plan'
      });
    }
  };
})

.controller('GameReport', function($scope, $state,Backand, $http, $rootScope, $ionicPopup,UserService) {
  $scope.goToMenu = function(){
    $state.go('settings');
  };

  $scope.goToGameReport = function(id,game){
    console.log(id);
    console.log(game);
    var gamedetails=[];
    var j=0;
    gamedetails[j]="";
    var data ={};
    data.id=id;
    data.game=game;
    UserService.getGameOneDetails(data).then(function(result){
      $state.go('gamereport');
      for(var i=0;i<result.length;i++)
      {
      //  console.log(result[i]);
      //  console.log(typeof(result[i]));
        if(result[i]==' '){
          j++;
          gamedetails[j]="";}
        else{
        gamedetails[j]=gamedetails[j]+result[i];
        //console.log(gamedetails[j]);
     }
      }
      for(i=0;i<gamedetails.length;i++)
        console.log(gamedetails[i]);
      //{
        //console.log(typeof(gamedetails[i]));
      //}
      $rootScope.correctanswers=gamedetails[0];
      $rootScope.que     =  gamedetails[2];
      $rootScope.missed  =  gamedetails[4];
      $rootScope.totaltime= gamedetails[6];
      //console.log($scope.tot);
    });

    //$scope.gameOneDetails={grade:'b',result:'done 2 out of 8'};
  };

  $scope.logout = function(){
    $window.localStorage.clear();
    console.log($rootScope.userId);
    $state.go('main');
  };
});
