(function (undefined) {
'use strict';

angular.module('MomAndPop').controller('signUpChampionCtrl', [
    '$scope',
    '$location',
    '$rootScope',
    '$log',
    'formUtils',
    'signUp',
    'facebookAPI',
    'twitterAPI',
function ($scope, $location, $rootScope, $log, formUtils, signUp, facebookAPI, twitterAPI) {

    $scope.resetGlobal({
        headless: true
    });

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

    $scope.authFb = function () {
        $log.info('login');
        facebookAPI.connect();
        $log.info('finished');
    }

    $scope.authTw = function () {
        $log.info('Twitter login');
        twitterAPI.connect();
        $log.info('login success')
    }

    $scope.submit = function () {
        $log.info('Submitting..');

        if (!validate()) {
            $log.warn('Form is not valid');
            return;
        }

        var q = signUp.champion({
           name: formUtils.getFullName($scope),
           email: $scope.email,
           password: $scope.password,
        });

        q.success = function () {
        }

        q.error = function () {
        }
    };

    $scope.toggleAcceptTerms = function () {
        $scope.isAcceptTerms = !$scope.isAcceptTerms;
    };

    function validate () {
        var valid = formUtils.validateRequired($scope, $scope.signUpForm);
        if (!valid)
            return valid;

        valid = formUtils.matchPasswords($scope) && valid;
        if (!valid)
            return valid;

        if ($scope.signUpForm.mail.$dirty && $scope.signUpForm.mail.$invalid) {
            $scope.validateErrorMsg += 'Email is invalid.';
            return false;
        }

        $scope.afterClickRegister = true;
        return false;
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
