angular.module('starter.services', [])

.service('UserService', function ($http, Backand) {

  var userid;

  addUser = function (data) {
    console.log(data);
    var link = 'http://epicsoft.esy.es/signup.php';
    $http.post(link, data).then(function (res){
      console.log(res.data);
    });
  };

  addChildDetails = function (data) {
    console.log(data);
    var link = 'http://epicsoft.esy.es/addChildDetails.php';
    $http.post(link, data).then(function (res){
      console.log(res.data);
    });
  };

  deleteChildDetails = function (data) {
    console.log(data);
    var link = 'http://epicsoft.esy.es/delete.php';
    $http.post(link, data).then(function (res){
      console.log(res.data);
    });
  };

  logining = function (data) {
    var link = 'http://epicsoft.esy.es/login.php';
      return $http.post(link, data)
      .then(function (res){
        userid = res.data;
        return userid;
      });
  };

  getUserId = function (data) {
    return userid;
  };

  addSubscription = function(data){
    console.log(data);
    var link = 'http://epicsoft.esy.es/subscriptions.php';
    $http.post(link, data).then(function (res){
      console.log(res.data);
    });
  };

  return{
    addUser: addUser,
    getUserId:getUserId,
    addChildDetails: addChildDetails,
    deleteChildDetails: deleteChildDetails,
    logining:logining,
    addSubscription: addSubscription
  };
});