myApp.controller('myCodeController', ['UserService', 'CodeService', 'InputService', function (UserService, CodeService, InputService) {
  console.log('myCodeController created');
  self = this;
  self.userObject = UserService.userObject;
  console.log('myCodeController is Logging', self.userObject);

  self.code = CodeService.code;

  //projectName Input
  self.projectName = CodeService.projectName;

  //function to copy codestring in code block
  self.copyCode = CodeService.copyCode;

  //function to download code in codeblock on button click
  self.downloadCodeBlock = CodeService.downloadCodeBlock;

  //function to download code project on button click
  self.downloadProject = CodeService.downloadProject

  self.saveNewProject = CodeService.saveNewProject;

  //object containing form inputs to generate Base Code
  self.formInputs = InputService.formInputs
  console.log('formInputs',self.formInputs);

  //function to get and then generate code based on form inputs
  self.getBaseCode = CodeService.getBaseCode;

  //calls getBaseCode function too generate code based on form inputs
  self.getBaseCode(self.formInputs);
}]);
