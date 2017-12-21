myApp.controller('myCodeController', ['UserService', function (UserService) {
  console.log('myCodeController created');
  self = this;
  self.userObject = UserService.userObject;
  console.log('myCodeController is Logging', self.userObject);

  self.newCode = '<h1>Dog<h1>';
  // self.value('ui.config',
  //   {
  //     codemirror:
  //       {
  //         mode: 'javascript',
  //         lineNumbers: true,
  //         matchBrackets: true,
  //         theme: 'rubyblue'
  //       }
  //   });


  // self.codeCtrl = function () {
  //   self.docLocation = document.location.href;
  //   $http.get(self.docLocation)
  //     .success(function (data) {
  //       self.code = data;
  //     });
  // }
}]);
