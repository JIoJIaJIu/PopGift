(function (undefined) {

angular.module('MomAndPop').service('User', [
    '$log',
    '$q',
    'utils',
    'CONFIG',
function ($log, $q, utils, CONFIG) {
    var LOGIN_URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'login');

    /**
     * @param {String} username, required
     * @param {String} password, required
     * @return {Object} promise
     *
     */
    this.loginWithPassword = function (username, password) {
        var d = $q.defer();

        if (!username) {
            $log.warn('User service::loginWithPassword:: should point username');
            d.reject('Should point username');
            return d.promise;
        }

        if (!password) {
            $log.warn('User service::loginWithPassword:: should point password');
            d.reject('Should point username');
            return d.promise;
        }

        var credentials = utils.base64encode([username, password].join(':'));
        var q = $http.post(LOGIN_URL, {
            type: 'Password'
        }, {
            headers: {
                'Authorization': 'Basic ' + credentials
            }
        });

        q.success(function (data) {
            d.resolve(data);
        });

        q.error(function (res) {
            d.reject(res.error);
        });

        return d;
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

        var q = $http.post(LOGIN_URL, {
            type: type
        }, {
            headers: {
                'Authorization': 'Basic ' + token
            }
        });

        q.success(function (data) {
            d.resolve(data);
        });

        q.error(function (res) {
            d.reject(res.error);
        });

        return d.promise;
    };
}]);

})();
