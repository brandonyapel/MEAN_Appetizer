myApp.controller('myCodeController', ['UserService', 'CodeService', 'InputService','$routeParams', function (UserService, CodeService, InputService, $routeParams) {
  console.log('myCodeController created');
  console.log($routeParams)
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

  ///function to saveNewProject
  self.saveNewProject = CodeService.saveNewProject;

  //object containing form inputs to generate Base Code
  self.formInputs = InputService.formInputs
  console.log('formInputs',self.formInputs);

  //function to get blank project code
  self.getCode = CodeService.getCode;

  //function to get and then generate code based on form inputs
  self.getBaseCode = CodeService.getBaseCode;

  //function to get ProjectFiles
  self.getSavedProjectFiles = CodeService.getSavedProjectFiles;

  //if statement to select what get request to fire off
  if ($routeParams.getRequest == "getCode"){
    self.getCode()
  }
  else if ($routeParams.getRequest == "getBaseCode"){
    self.getBaseCode(self.formInputs);
  }
  else if ($routeParams.getRequest == "getSavedProjectFiles"){
    self.getSavedProjectFiles($routeParams.projectID)
  }
}]);
