(function (undefined) {
'use strict';

appControllers.controller('signUpChampionCtrl', [
    '$scope',
    '$location',
    '$rootScope',
    '$log',
    'formUtils',
function ($scope, $location, $rootScope, $log, formUtils) {

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

    $scope.submit = function () {
        $log.log('Submitting..');

        if (!validate()) {
            $log.log('Form is not valid');
            return;
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
