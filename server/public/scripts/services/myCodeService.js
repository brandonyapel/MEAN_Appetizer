myApp.service('CodeService', ['$http', function ($http) {
    console.log('CodeService Loaded');

    var self = this;

    self.projectName

    self.currentProject = {};

    self.code = { list: '' };


    self.getCode = function () {
        console.log("getCode()");
        $http({
            method: 'GET',
            url: '/code'
        }).then(function (response) {
            console.log('response', response);
            self.code.list = response.data;
        });
    };

    self.getCode();

    self.copyCode = function (codeID) {
        var copyText = document.getElementById(codeID);
        copyText.select();
        document.execCommand('Copy');
        alert("Copied")
    };

    self.downloadCodeBlock = function (code) {
        console.log('downloadCodeBlock()')
        var zip = new JSZip();
        var filename = code.filename + code.filetype
        zip.file(filename, 'codestring');
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, filename + '.zip');
            });
    };

    self.downloadProject = function (/* self.code.list */codeList) {
        console.log('downloadCodeProject()')
        //create new zip
        var zip = new JSZip();
        //directories in master directory
        var server = zip.folder('server');

        //directories in the server folder
        var models = server.folder('models');
        var modules = server.folder('modules');
        var public = server.folder('public');
        var routes = server.folder('routes');

        //directories in the public folder
        var scripts = public.folder('scripts');
        var styles = public.folder('styles');
        var vendors = public.folder('vendors');
        var views = public.folder('views');

        //directories in the scripts folder
        var controllers = scripts.folder('controllers');
        var services = scripts.folder('services');

        //directories in the views folder
        var partials = views.folder('partials');
        var templates = views.folder('templates');

        for (let saveFileIndex = 0; saveFileIndex < codeList.length; saveFileIndex++) {
            currentFile = codeList[saveFileIndex];
            nameOfFile = currentFile.filename + currentFile.filetype;

            //check to see if file should be put in master directory
            if (currentFile.directory == 'zip') {
                zip.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be put in server directory
            else if (currentFile.directory == 'server') {
                server.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be put in models directory
            else if (currentFile.directory == 'models') {
                models.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in modules directory
            else if (currentFile.directory == 'modules') {
                modules.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in public directory
            else if (currentFile.directory == 'public') {
                public.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in routes directory
            else if (currentFile.directory == 'routes') {
                routes.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in scripts directory
            else if (currentFile.directory == 'scripts') {
                scripts.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file shoud be in styles directory
            else if (currentFile.directory == 'styles') {
                styles.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in vendors directory
            else if (currentFile.directory == 'vendors') {
                vendors.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in views directory
            else if (currentFile.directory == 'views') {
                views.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in controllers directory
            else if (currentFile.directory == 'controllers') {
                controllers.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in services directory
            else if (currentFile.directory == 'services') {
                services.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in partials directory
            else if (currentFile.directory == 'partials') {
                partials.file(nameOfFile, currentFile.codestring);
            }
            //check to see if file should be in templates directory
            else if (currentFile.directory == 'templates') {
                templates.file(nameOfFile, currentFile.codestring);
            }
            //catch all to put files not matching in master directory
            else {
                zip.file(nameOfFile, currentFile.codestring);
            };
        };
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "public.zip");
            });
    };

    self.saveNewProject = function (/* self.projectName */projectName,/* self.code.list */codeList) {
        //post new project using user_id and projectName to Projects
        self.postNewProject = function (projectName) {
            $http({
                method: 'POST',
                url: '/project',
                data: { projectname: projectName },
            }).then(function (response) {
                console.log('response:', response);
                self.getProject(projectName)
            })
        };


        //get project and assign to self.projectName
        self.getProject = function (project) {
            console.log("getProject()");
            $http({
                method: 'GET',
                url: '/project',
                params: { projectname: project }
            }).then(function (response) {
                console.log('response', response);
                self.currentProject = response.data[0];
                self.postProjectFiles(self.currentProject, self.code.list)
            });
        };

        //loop post all files in self.code.list add the project_id from get project request
        self.postProjectFiles = function (/* self.currentProject */ currentProject,/* self.code.list */ codeList) {
            for (let codeListIndex = 0; codeListIndex < codeList.length; codeListIndex++) {
                $http({
                    method: 'POST',
                    url: '/project/files',
                    data: { currentProject: currentProject, file: codeList[codeListIndex] },
                }).then(function (response) {
                    console.log('response:', response);
                    
                })
            }

        };


        self.postNewProject(projectName);
    };




    //get all files for Current Project using Join request of Files and Projects Table 

    //Assign values of files get request too self.code.list

}]);