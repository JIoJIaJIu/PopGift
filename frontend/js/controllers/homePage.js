(function (undefined) {

angular.module('MomAndPop').controller('homePage', [
    '$scope',
    '$http',
    '$location',
    '$log',
    'user',
function ($scope, $http, $location, $log, user) {
    var me = user.getUser();

    if (!me) {
        $log.debug('No user');
        $location.path('/')
        return;
    }

    $scope.resetGlobal({
        title: 'My Founder$hares',
        userProfile: me
    });

    $http.get('data/businesses.json').success(function (data) {
        $scope.businesses = data.businesses;
    });

    $scope.setOrder = function (order) {
        $scope.order = order;
        var field, orderMore = 1;
        switch (order.type) {
            case 'name-asc':
                field = 'name';
                break;
            case 'name-desc':
                field = 'name';
                orderMore = -1;
                break;
            case 'amount':
                field = 'amount';
                break;
        }

        $scope.businesses.sort(function (b1, b2) {
            if (b1[field] < b2[field]) { return -orderMore; }
            if (b1[field] > b2[field]) { return orderMore; }
            return '';
        });
    };
}]);

})();
