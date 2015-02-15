(function (undefined) {
'use strict';

angular.module('MomAndPop').controller('signUpChampionCtrl', [
    '$scope',
    '$location',
    '$rootScope',
    '$log',
    'formUtils',
    'signUp',
function ($scope, $location, $rootScope, $log, formUtils, signUp) {

    $scope.resetGlobal({
        headless: true
    });

    $scope.validateErrorMsg = '';

    $scope.requiredFields = {
        firstName: {
            fieldName: 'firstName',
            describeName: 'First Name'
        },
        lastName: {
            fieldName: 'lastName',
            describeName: 'Last Name'
        },
        mail: {
            fieldName: 'mail',
            describeName: 'Email Address'
        },
        password: {
            fieldName: 'password',
            describeName: 'Password'
        },
        confirmPassword: {
            fieldName: 'confirmPassword',
            describeName: 'Confirm Password'
        }
    };

    $scope.submit = function () {
        $log.debug('Submitting..');

        if (!validate()) {
            $log.warn('Form is not valid');
            return;
        }

        // See NOTICE #1
        var q = signUp.champion({
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.mail,
            password: $scope.password,
            interest: $scope.interest
        });

        q.then(function () {
            $log.debug('Successuf registered');
            $location.path('/');
        }, function (err) {
            $log.debug('Request error', err);
            $scope.validateErrorMsg = err;
            $scope.showError = true;
        });
    };

    $scope.toggleAcceptTerms = function () {
        $scope.isAcceptTerms = !$scope.isAcceptTerms;
    };

    $scope.matchPasswords = false;

    function validate () {
        var valid = formUtils.validateRequired($scope, $scope.signUpForm);
        if (!valid)
            return valid;

        $scope.matchPasswords = formUtils.matchPasswords($scope);
        valid = $scope.matchPasswords && valid;
        if (!valid)
            return valid;

        if ($scope.signUpForm.mail.$dirty && $scope.signUpForm.mail.$invalid) {
            $scope.validateErrorMsg = [$scope.validateErrorMsg, 'Email is invalid.'].join(' ');
            return false;
        }

        $scope.afterClickRegister = true;
        return true;
    };
    $scope.looseFocus = formUtils.looseFocus;

    // TODO: move
    $scope.focusInput = function () {
        // if just right after click register, clear error message.
        if ($scope.afterClickRegister) {
            $scope.showError = false;
            $scope.validateErrorMsg = "";
            $scope.afterClickRegister = false;
            // clear all warning border
            $("input").removeClass('invalid');
        }
    };
}]);

})();
