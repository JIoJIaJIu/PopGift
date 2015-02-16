(function (undefined) {

angular.module('MomAndPop').service('user', [
    '$log',
    '$q',
    '$http',
    '$sessionStorage',
    'utils',
    'CONFIG',
function ($log, $q, $http, $storage, utils, CONFIG) {
    var LOGIN_URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'login');
    var ME_URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'users/me');

    var sessionToken = $storage.sessionToken || null;
    var user = null;

    /**
     * @param {String} email, required
     * @param {String} password, required
     * @param {Boolean} remember
     * @return {Object} promise
     *
     */
    this.loginWithPassword = function (email, password, remember) {
        var d = $q.defer();

        if (!email) {
            $log.warn('User service::loginWithPassword:: should point email');
            d.reject('Should point email');
            return d.promise;
        }

        if (!password) {
            $log.warn('User service::loginWithPassword:: should point password');
            d.reject('Should point password');
            return d.promise;
        }

        var credentials = btoa([email, password].join(':'));
        var authHeader = 'Basic ' + credentials;
        var q = $http.post(LOGIN_URL, null, {
            headers: {
                'Authorization': authHeader
            },
            params: {
                type: 'Password'
            }
        });

        q.success(function (data) {
            sessionToken = data.sessionToken;
            if (remember)
                $storage.sessionToken = sessionToken;
            d.resolve(data);
        });

        q.error(function (res) {
            d.reject(res && res.error);
        });

        return d.promise;
    };

    /**
     * @param {String} type, required ['Facebook', 'Twitter', 'LinkedIn']
     * @param {String} token, required, base64
     */
    this.loginWithSocial = function (type, token) {
        var d = $.defer();

        if (!~['Facebook', 'Twitter', 'LinkedIn'].indexOf(type)) {
            $log.warn('User service::loginWithSocial:: wrong type', type);
            d.reject('Wrong type ' + type);
            return d.promise;
        }

        if (!token) {
            $log.warn('User service::loginWithSocial:: should poind token');
            d.reject('Should point token');
            return d.promise;
        }

        var authHeader = 'Basic ' + token;
        var q = $http.post(LOGIN_URL, {
            type: type
        }, {
            headers: {
                'Authorization': authHeader
            }
        });

        q.success(function (data) {
            $http.defaults.headers.common.Authorization = authHeader; 
            d.resolve(data);
        });

        q.error(function (res) {
            d.reject(res && res.error);
        });

        return d.promise;
    };

    /**
     * logout
     */

    this.logout = function () {
        sessionToken = null;
        user = null;
        $http.defaults.headers.common.Authorization = null; 
        delete $storage.sessionToken;
    };

    /**
     * @return {String} sessionToken
     */
    this.getSessionToken = function () {
        return sessionToken;
    };

    /**
     * request user
     * @return {Object} promise
     */
    this.requestUser = function () {
        var d = $q.defer();
        if (!sessionToken) {
            $log.warn('Couldn\'t get user, no token');
            d.reject('Couldn\'t get user, no token');
            return d.promise;
        }

     
     var authHeader = 'Bearer ' + sessionToken;
        var q = $http.get(ME_URL, {
            headers: {
                'Authorization': authHeader
            }
        });

        q.success(function (data) {
            $http.defaults.headers.common.Authorization = authHeader; 
            user = new User(data);
            d.resolve(user);
        });

        q.error(function (resp) {
            $log.warn(resp && resp.error);
            d.reject(resp && resp.error);
        });

        return d.promise;
    }

    /**
     * @return {Object} getUser
     */
    this.getUser = function () {
        return user;
    }

    /**
     * User constructor
     * @param {Object} data
     *   @key {String} id
     *   @key {String} firstName
     *   @key {String} lastName
     *   @key {String} email
     *   @key {String} [picture];
     */
    function User (data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.name = [this.firstName, this.lastName].join(' ');
        this.avatar = data.picture;
    }
}]);

})();
