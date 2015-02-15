(function (undefined) {

angular.module('MomAndPop').service('signUp', [
    '$http',
    'utils',
function ($http, utils) {
    var config = angular.module('MomAndPop.config');
    var URL = utils.pathJoin(config.REST_SERVICES_BASE_URL, 'register');

    this.champion = function (params) {
        var q = request({
           accoutType: 'CHAMPION',
           name: params.name,
           email: params.email
        });

        return q;

        q.success(function () {
        });

        q.error(function () {
        });
    };

    this.founder = function (username, password) {
        var q = requiest({
            accoutType: 'FOUNDER',
            name: params.name,
            email: params.email
        });

        return q;
    };

    /**
     * @param {Object} params
     *   @key {String} accountType ['CHAMPION', 'FOUNDER']
     *   @key {String} name
     *   @key {String} password
     *   @key {String} interestedOfferCategory
     *   @key {String} linkedSocialNetwork
     *   @key {String} linkedSocialNetworkAccessToken
     *   @key {String} linkedSocialNetworkUserId
     *   @key {Bussiness} business
     *   @key [ { "email" : {string}, "password" : {string} ] additionalUsers
     */
    function request (params) {
        return $http.post(URL, params);
    }
}]);

})();
