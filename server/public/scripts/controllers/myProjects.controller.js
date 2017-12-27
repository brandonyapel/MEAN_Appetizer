myApp.controller('myProjectsController',['UserService','ProjectService','CodeService', function(UserService, ProjectService, CodeService) {
  console.log('myProjectsController created');
  let pc = this;

  //sources in list of all the users projects into controller
  pc.myProjects = ProjectService.myProjects;
  
  //function to get project files and download files as zip.
  pc.getProjectFiles = CodeService.getProjectFiles;
  pc.downloadProject = CodeService.downloadProject;
  pc.code=CodeService.code;

  pc.downloadProjectClick = function (project) {
    pc.getProjectFiles(project);
    if (confirm('Would you like to download project '+project.projectname+'?')){
      setTimeout( function () {pc.downloadProject(pc.code.list)},3000);
    }
  };

  //function to delete project, all project files and then to refresh get projects
  pc.deleteProject = ProjectService.deleteProject;


  

}]);
