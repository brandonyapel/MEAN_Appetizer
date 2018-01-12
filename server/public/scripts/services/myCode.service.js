
myApp.service('CodeService', ['$http', function ($http) {
    console.log('CodeService Loaded');

    var self = this;

    self.projectName

    self.currentProject = {};

    self.code = { list: '' };

    //function to get blank MVP project code
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

    //function to get Base project Template from db and to replace placeholders with forminputs
    self.getBaseCode = function (formInputs) {
        console.log("getBaseCode");
        console.log('formInputs',formInputs);
        $http({
            method: 'GET',
            url: '/code/base'
        }).then(function (response) {
            console.log('response', response);
            self.code.list = response.data;
            //sets projectName for zip file
            self.projectName = formInputs.projectName;
            //asides method returns to create codes strings to be placed in base template
            var tableSchema = formInputs.tableSchema();
            var tableFormInputsHTML = formInputs.tableFormInputsHTML();
            var tableDOMHeaderHTML = formInputs.tableDOMHeaderHTML();
            var tableDataHTML = formInputs.tableDataHTML();
            var deleteRowControllerJS = formInputs.deleteRowControllerJS();
            var deleteRowServiceJS = formInputs.deleteRowServiceJS();
            var deleteRowRouteJS = formInputs.deleteRowRouteJS();
            //for loop to replace all the replacement placeholders fileNames and codestrings
            for (let codeListIndex = 0; codeListIndex < self.code.list.length; codeListIndex++) {
                console.log(codeListIndex)
                console.log(self.code.list[codeListIndex].fileName)
                console.log(formInputs.tableName)
                //cannot replace null to avoid error only replace filenames that are not null
                if(self.code.list[codeListIndex].fileName != null){
                    console.log('in if filename statement')
                    self.code.list[codeListIndex].fileName = self.code.list[codeListIndex].fileName.replace(/xxtableNamexx/g,formInputs.tableName);
                    self.code.list[codeListIndex].fileName = self.code.list[codeListIndex].fileName.replace(/xxprojectNamexx/g,formInputs.projectName);
                };
                //cannot replace null to avoid error only replace codestrings that are not null
                if(self.code.list[codeListIndex].codestring != null){
                    console.log('in if codestring statement')
                    self.code.list[codeListIndex].codestring = self.code.list[codeListIndex].codestring.replace(/xxtableNamexx/g,formInputs.tableName);
                    self.code.list[codeListIndex].codestring = self.code.list[codeListIndex].codestring.replace(/xxprojectNamexx/g,formInputs.projectName);
                    self.code.list[codeListIndex].codestring = self.code.list[codeListIndex].codestring.replace(/xxtableSchemaxx/g,tableSchema);
                    self.code.list[codeListIndex].codestring = self.code.list[codeListIndex].codestring.replace(/xxtableFormInputsxx/g,tableFormInputsHTML);
                    self.code.list[codeListIndex].codestring = self.code.list[codeListIndex].codestring.replace(/xxtableDOMHeaderHTMLxx/g,tableDOMHeaderHTML);
                    self.code.list[codeListIndex].codestring = self.code.list[codeListIndex].codestring.replace(/xxtableDataHTMLxx/g,tableDataHTML);
                    self.code.list[codeListIndex].codestring = self.code.list[codeListIndex].codestring.replace(/xxdeleteRowControllerxx/g,deleteRowControllerJS);
                    self.code.list[codeListIndex].codestring = self.code.list[codeListIndex].codestring.replace(/xxdeleteRowServicexx/g,deleteRowServiceJS);
                    self.code.list[codeListIndex].codestring = self.code.list[codeListIndex].codestring.replace(/xxdeleteRowRoutexx/g,deleteRowRouteJS);
                }


            }
        });
    }

    
    //function to copy code string in each code block
    self.copyCode = function (codeID) {
        var copyText = document.getElementById(codeID);
        copyText.select();
        document.execCommand('Copy');
        alert("Copied")
    };

    //function to download code block
    self.downloadCodeBlock = function (code) {
        console.log('downloadCodeBlock()')
        var zip = new JSZip();
        var filename = code.fileName + code.filetype
        zip.file(filename, 'codestring');
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, filename + '.zip');
            });
    };

    //function to download Project using filesaver and jszip
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
            nameOfFile = currentFile.fileName + currentFile.filetype;

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
                saveAs(content, self.projectName+".zip");
            });
    };

    //function to save New Project to database
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
            self.getProjectFiles(self.currentProject);

        };

        //get all files for Current Project using Join request of Files and Projects Table 
        self.getProjectFiles = function (/* self.currentProject */ currentProject) {
            console.log("getProjectFiles()");
            self.code.list = {};
            $http({
                method: 'GET',
                url: '/project/files',
                params: { projectID: currentProject.id }
            }).then(function (response) {
                console.log('response', response);
                self.code.list = response.data;
            });
        };
        //Assign values of files get request too self.code.list


        self.postNewProject(projectName);
    };

    self.getProjectFiles = function (/* self.currentProject */ currentProject) {
        console.log("getProjectFiles()");
        self.code.list = {};
        $http({
            method: 'GET',
            url: '/project/files',
            params: { projectID: currentProject.id }
        }).then(function (response) {
            console.log('response', response);
            self.code.list = response.data;
        });
    };


}]);