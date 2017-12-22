myApp.controller('myCodeController', ['UserService', 'CodeService', function (UserService, CodeService) {
  console.log('myCodeController created');
  self = this;
  self.userObject = UserService.userObject;
  console.log('myCodeController is Logging', self.userObject);

  self.newCode = '<h1>Dog<h1>';
  self.code = CodeService.code;

  //function to copy codestring in code block
  self.copyCode = CodeService.copyCode;

  //function to download code in codeblock on button click
  self.downloadCodeBlock = CodeService.downloadCodeBlock;

  //function to download code project on button click
  self.downloadProject = CodeService.downloadProject

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
