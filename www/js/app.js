// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'backand', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function(BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
  BackandProvider.setAppName('qneuro');
  $stateProvider

  .state('main', {
    url: '/',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('subscriptionrenew', {
    url: '/subscriptionrenew',
    templateUrl: 'templates/subscriptionrenew.html',
    controller: 'Subscriptionrenew'
  })
  .state('delete', {
    url: '/delete',
    templateUrl: 'templates/delete.html',
    controller: 'DeleteCtrl'
  })
  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'SettingsCtrl'
  })
  .state('addChild', {
    url: '/addChild',
    templateUrl: 'templates/addChild.html',
    controller: 'AddChildCtrl'
  })
  .state('report', {
    url: '/report',
    templateUrl: 'templates/report.html',
    controller: 'ReportCtrl'
  })
  .state('onclickmenu', {
    url: '/onclickmenu',
    templateUrl: 'templates/onclickmenu.html',
    controller: 'OnClickMenuCtrl'
  })

  .state('gamereport', {
    url: '/gamereport',
    templateUrl: 'templates/gamereport.html',
    controller: 'GameReport'
  })

  .state('subscription', {
    url: '/subscription',
    templateUrl: 'templates/subscription.html',
    controller: 'SubscriptionCtrl'
  });

  $urlRouterProvider.otherwise('/');
});
