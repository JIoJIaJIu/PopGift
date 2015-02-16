(function (undefined) {

angular.module('MomAndPop').controller('logoutCtrl', [
    '$location',
    '$log',
    'user',
function ($location, $log, user) {
    user.logout();
    $location.path('/');
}]);

})();
