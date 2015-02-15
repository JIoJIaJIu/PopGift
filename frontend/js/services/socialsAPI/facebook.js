(function (undefined) {

angular.module('MomAndPop').service('facebookAPI', [
    '$log',
function ($log) {
    $log.info('Facebook oauth service');

    this.connect = function () {
    	FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('Logged in.');
            } else {
                FB.login();
            }
        });
    }
}]);

})();
