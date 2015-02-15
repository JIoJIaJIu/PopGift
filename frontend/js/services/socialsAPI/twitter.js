(function (undefined) {

angular.module('MomAndPop').service('twitterAPI', [
    '$log',
    '$http',
function ($log, $http) {
    $log.info('Twitter oauth service');
    this.connect = function () {
        $log.info('oauth tw starting');
        var req = {
            method: 'POST',
            url: 'https://api.twitter.com/oauth2/token',
            headers: [
                {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }, {
                    'Authorization': 'Basic dFJ6anIzZGcyUGdDUXcyNUMwVXBramIxdTp3N2xlWlR1RmVBdzZ1MUZzWkRoTDFzd1BvNmxqb1ZTWW9xNFFkZDdLcEdNbU9mR1lMQQ=='
                }
            ],
            data: {
                body: 'grant_type=client_credentials'
            }
        };
        $http(req).success(function () { $log.info('twitter loging success'); }).error(function () { $log.info('twitter loging error'); });
        /*
        var url = 'https://api.twitter.com/oauth2/token';
        var data = 'grant_type=client_credentials';
        var config = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic dFJ6anIzZGcyUGdDUXcyNUMwVXBramIxdTp3N2xlWlR1RmVBdzZ1MUZzWkRoTDFzd1BvNmxqb1ZTWW9xNFFkZDdLcEdNbU9mR1lMQQ=='
        }
        $http.post(url, data, config)
        */
        /*
        var xhr = new XMLHttpRequest();
        var params = '';
        var body = 'grant_type=client_credentials';
        xhr.open('POST', 'https://api.twitter.com/oauth2/token', true);
        xhr.setRequestHeader('Authorization', 'Basic dFJ6anIzZGcyUGdDUXcyNUMwVXBramIxdTp3N2xlWlR1RmVBdzZ1MUZzWkRoTDFzd1BvNmxqb1ZTWW9xNFFkZDdLcEdNbU9mR1lMQQ==')
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        xhr.send(body);
        $log.info('oauth tw ending');
        */
    };
}]);

})();