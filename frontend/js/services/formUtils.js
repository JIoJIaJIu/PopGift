(function (undefined) {

angular.module('MomAndPop').service('formUtils', function () {
    /**
     * @param {Object] $scope
     *   @key {String} validateErrorMsg
     *   @key {Object} requiredFields
     *   @key {Boolean} showError
     * @param {Object} form
     * @return {Boolean} valid
     */

    this.validateRequired = function ($scope, form) {
        $scope.validateErrorMsg = null;

        var requiredFieldNotFilled = [];
        $.each($scope.requiredFields, function (index, item) {
            if (form[ item.fieldName ] && form[ item.fieldName ].$error.required) {
                    requiredFieldNotFilled.push(item.describeName);
                    $("input[name=" + item.fieldName + "]").addClass('invalid');
            }
        });

        if (requiredFieldNotFilled.length > 0) {
            $scope.showError = true;
            for (var i = 0; i < requiredFieldNotFilled.length; i++) {
                $scope.validateErrorMsg += requiredFieldNotFilled[i];
                // last element
                if (i == requiredFieldNotFilled.length - 1) {
                    if (requiredFieldNotFilled.length == 1) {
                        $scope.validateErrorMsg += ' is required. ';
                    } else {
                        $scope.validateErrorMsg += ' are required. ';
                    }
                } else {
                    $scope.validateErrorMsg += ', ';
                }
            }
        }

        return !!$scope.showError;
    };

    /**
     * @param {Object} $scope
     *   @key {String} password
     *   @key {String} configPassword
     *   @key {String} validateErrorMsg
     *   @key {Boolean} showError
     * @return {Boolean} match
     */
    this.matchPasswords = function ($scope) {
        $scope.checkConfirmPassword = function () {

            var match = $scope.password === $scope.confirmPassword &&
                ($scope.password !== undefined ) &&
                ($scope.confirmPassword !== undefined ) &&
                ( $scope.password.length > 0 && $scope.confirmPassword.length > 0 );

            if (!match) {
                $scope.validateErrorMsg += 'Confirm password is not same as password.';
                $scope.showError = true;
            }
        };
    };

    /**
     * Tool function for FormUtils, when loose focus, validate input value
     * @param {Object} $event - jQuery event
     * @param {Object} $scope
     *   @key {Boolean} showError
     *   @key {String} validateErrorMsg
     *   @key {Object} requiredFields
     * @param {Object} form 
     */
    this.looseFocus = function ($event, $scope, form) {
        var fieldName = $($event.target).attr('name');
        $scope.showError = false;

        // check required rule
        if ($scope.signUpForm[ fieldName ].$error.required) {
            $scope.showError = true;
            $scope.validateErrorMsg = $scope.requiredFields[fieldName].describeName + " is required";
            $("input[name=" + fieldName + "]").addClass('invalid');
        } else {
            $("input[name=" + fieldName + "]").removeClass('invalid');

            // mail input have values but not correct.
            if (!form.mail)
                return;

            if (form.mail.$dirty && form.mail.$invalid) {
                $scope.showError = true;
                $scope.validateErrorMsg = "Email address is invalid";
                $("input[name='mail']").addClass('invalid');
            } else if (form.mail.$valid) {
                $("input[name='mail']").removeClass('invalid');
            }
        }
    };
});

})();
