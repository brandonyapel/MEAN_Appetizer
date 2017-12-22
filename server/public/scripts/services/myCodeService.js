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

}]);
