myApp.service('CodeService', ['$http', function ($http) {
    console.log('CodeService Loaded');

    var self = this;

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
    }
    self.getCode();

    self.copyCode = function (codeID) {
        var copyText = document.getElementById(codeID);
        copyText.select();
        document.execCommand('Copy');
        alert("Copied")
    }

    self.downloadCodeBlock = function (code) {
        console.log('downloadCodeBlock()')
        var zip = new JSZip();
        var filename = code.filename+code.filetype
        zip.file(filename, 'codestring');
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, filename+'.zip');
            });
    }

}]);
