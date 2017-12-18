myApp.service('LeaderService', function($http, $location){
    console.log('LeaderService Loaded');
    let self = this;
    self.leaderArray = {list: []};

    setInterval(self.getLeaders = function () {
        // YOUR CODE HERE
        $http({
            method: 'GET',
            url: '/market/leaderboard'
        }).then(function (response) {
            self.leaderArray.list = response.data;
        });
    },10000);

    self.getLeaders();
    

});