myApp.service('ProjectService', function($http, $location){
    console.log('ProjectService Loaded');
    let self = this;

    //contains a list of project objects for the current user
    self.myProjects = {list: ''};

    //gets all of the users projects as an array of objects and assigns them to sel.myProjects.list
    self.getMyProjects = function (project) {
        console.log("getMyProjects()");
        $http({
            method: 'GET',
            url: '/project/allMyProjects',
        }).then(function (response) {
            console.log('response', response);
            self.myProjects.list = response.data;
        });
    };

    //view project code on function on click of view button
    
    //download project code on click of download button
    self.downloadProject = function (project)
    //delete project on click of delete button




    //calls getMyProjects on load so user can view all their projects.
    self.getMyProjects();

  });