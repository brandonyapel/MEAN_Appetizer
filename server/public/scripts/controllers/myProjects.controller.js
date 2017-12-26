myApp.controller('myProjectsController',['UserService','ProjectService', function(UserService, ProjectService) {
  console.log('myProjectsController created');
  let pc = this;

  //sources in list of all the users projects into controller
  pc.myProjects = ProjectService.myProjects;
  






  

}]);
