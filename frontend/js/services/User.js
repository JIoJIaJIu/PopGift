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

        q.error(function (err) {
            d.reject(err);
        });

        return d;
    };
}]);

})();
