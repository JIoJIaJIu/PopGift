(function (undefined) {
/**
 * http data keys:
 *   @key {String} accountType ['CHAMPION', 'FOUNDER'], required
 *      See Notice #1
 *      //@key {String} name, required
 *      @key {String} firstName
 *      @key {String} lastName
 *   @key {String} password, required
 *   @key {String} interestedOfferCategory
 *   @key {String} linkedSocialNetwork
 *   @key {String} linkedSocialNetworkAccessToken
 *   @key {String} linkedSocialNetworkUserId
 *   @key {Bussiness} business
 *   @key [ { "email" : {string}, "password" : {string} ] additionalUsers
 */

angular.module('MomAndPop').service('signUp', [
    '$http',
    'utils',
    '$log',
    '$q',
    'CONFIG',
    'formUtils',
function ($http, utils, $log, $q, config, formUtils) {
    var URL = utils.pathJoin(config.REST_SERVICE_BASE_URL, 'register');

    /**
     * @param {Object} params
     * @param {Object} image
     *   @key {String} fileName
     *   @key {Blob} blob
     */
    this.champion = function (params, image) {
        var d = $q.defer();

        if (!validate(params)) {
            $log.warn('signUp service:: data is not valid');
            d.reject();
            return;
        }

        var boundary = 'MomAndPopBoundary81765';
        var q = $http.post(URL, {
            accountType: 'CHAMPION',
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            password: params.password,
            //interestedOfferCategory: params.interest || null
        }, {
            transformRequest: function (params) {
                x = image;

                var data = [{
                    headers: [
                        'Content-Type: application/json; charset=utf-8',
                        'Content-Disposition: form-data; name="registration"'
                    ],

                    data: JSON.stringify(params)
                }]

                if (image) {
                    data.push({
                        headers: [
                            'Content-Type: image/jpeg',
                            'Content-Disposition: form-data; name="profileImage"; filename="' + image.fileName + '"'
                        ],

                        data: image.blob
                    });
                }
                return formUtils.generateMultipartPayload(boundary, data);
            },
            headers: {
                'Content-type': 'multipart/form-data; boundary=' + boundary,
            }
        });

        q.success(function (data) {
            d.resolve(data);
        });

        q.error(function (resp) {
            d.reject(resp.error);
        });

        return d.promise;
    };

    this.founder = function (username, password) {
        var q = requiest({
            accoutType: 'FOUNDER',
            name: params.name,
            email: params.email
        });

        return q;
    };

    function request (params) {
        return $http.post(URL, params);
    }

    /**
     * See NOTICE.md #1
     * @param {Object} params
     *   @key {String} firstName
     *   @key {String} lastName
     *   @key {String} email
     *   @key {String} password
     */
    function validate (params) {
        if (!params.firstName) {
            $log.log('signUp service:: should point firstName');
            return false;
        }

        if (!params.lastName) {
            $log.log('signUp service:: should point lastName');
            return false;
        }

        if  (!params.email) {
            $log.log('signUp service:: should point email');
            return false;
        }

        if  (!params.password) {
            $log.log('signUp service:: should point password');
            return false;
        }

        return true;
    }

}]);

})();
