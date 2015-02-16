(function (undefined) {

angular.module('MomAndPop').controller('signInCtrl', [
    '$scope',
    '$log',
    '$location',
    '$rootScope',
    'user',
function ($scope, $log, $location, $rootScope, user) {
    console.log('sess', user.getSessionToken());
    if (user.getSessionToken()) {
        $log.debug('User has been authorized');
        loadUser();
        return;
    }

    $scope.resetGlobal({
        headless: true,
    });

    $scope.submit = function () {
        if (!validate()) {
            $log.warn('Form is not valid');
            $scope.showError = true;
            return;
        }

        var q = user.loginWithPassword($scope.email, $scope.password);
        q.then(function () {
            loadUser();
        }, function (error) {
            $scope.showError = true;
        });
    };

    function loadUser () {
        user.requestUser().then(function () {
            $location.path('/individual-home');
        }, function () {
            user.logout();
            $location.path('/');
        });
    }

    function validate () {
        if (!$scope.email) {
            $log.debug('Should point email');
            return false;
        }

        if (!$scope.password) {
            $log.debug('Should point password');
            return false;
        }

        return true;
        /*
            $rootScope.login = $scope.username === 'buz' ? 'employee.json' : 'user.json';
            $location.path($scope.username === 'buz' ? '/business-home' : '/individual-home');
            */
    }

    $scope.clearValidateError = function () {
        $scope.showError = false;
    };

    $scope.toggleRememberMe = function () {
        if ($scope.isRememberMe) {
            $scope.isRememberMe = false;
        } else {
            $scope.isRememberMe = true;
        }
    };
}]);

})();
