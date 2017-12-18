myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  let self = this;
  let userObject = {};

  self.getuser = () => {
    console.log('UserService -- getuser');
    $http.get('/user').then((response) => {
      if (response.data.username) {
        // user has a curret session on the server
        userObject.userName = response.data.username;
        userObject.money = response.data.money;
        userObject.basket = response.data.basket;
        console.log('UserService -- getuser -- User Data: ', userObject.userName);
        self.userObject = userObject;
        console.log(self.userObject)
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }).catch((response) => {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  }

  self.logout = () => {
    console.log('UserService -- logout');
    $http.get('/user/logout').then((response) => {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }
});