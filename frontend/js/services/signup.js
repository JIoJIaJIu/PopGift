(function (undefined) {

angular.module('MomAndPop').service('signUp', [
    '$http',
    'MomAndPop.config',
function ($resource, config) {
    var URL = [config.REST_SERVICES_BASE_URL, 'register'].join('/');

    this.champion = function (params) {
        var q = request({
           accoutType: ''
           name: params.name,
           email: params.email
        });

        q.success(function () {
        });

        q.error(function () {
        });
    };

    this.founder = function (username, password) {
        var q = requiest({
            accoutType; '',
            name: params.name,
            email: params.email
        });
    };

    /**
     * @param {Object} params
     *   @key {String} accountType
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
});

})();
