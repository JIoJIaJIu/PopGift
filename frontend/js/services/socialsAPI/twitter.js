(function (undefined) {

angular.module('MomAndPop').service('twitterAPI', [
    '$log',
    '$http',
    'utils',
function ($log, $http, utils) {
    $log.info('Twitter oauth service');
    this.connect = function () {
        $log.info('oauth tw starting');
        /* Creating a signature for Twitter API */
        var d = new Date();
        var timestamp = d.getTime() / 1000;
        timestamp = Math.round(timestamp);
        var nonce = utils.randomString();
        var oauth_token = '208190851-OmkDCd0K38aitHGmfm7ZRz0ergoBqor4xtjkdzMd';
        oauth_token = encodeURIComponent(oauth_token);
        nonce = btoa(nonce);
        nonce = encodeURIComponent(nonce);
        $log.info(nonce);
        $log.info(oauth_token);
        $log.info(timestamp);
        var config = {
            method: 'POST',
            url: 'https://api.twitter.com/1/statuses/update.json',
            params: {
                include_entities: 'true',
                oauth_consumer_key: 'tRzjr3dg2PgCQw25C0Upkjb1u',
                oauth_nonce: nonce,
                oauth_signature_method: 'HMAC-SHA1',
                oauth_timestamp: timestamp,
                oauth_token: oauth_token,
                oauth_version: '1.0'
            },
            headers: {
                'Access-Control-Allow-Origin': 'https://api.twitter.com/'
            }
        };

        $http(config).
            success(function (data, status, headers, config) {
                $log.info('Signature success');
            }).
            error(function (data, status, headers, config) {
                $log.info('Signature error');
            });
        /* Creating a authorizing request *
        url = '';
        data = '';
        var DST = 'OAuth oauth_consumer_key="tRzjr3dg2PgCQw25C0Upkjb1u", oauth_nonce="LQynlWCLwuVxExMdMOGN2d0TFSpNJrEp", oauth_signature="", oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + timestamp + '", oauth_token="208190851-OmkDCd0K38aitHGmfm7ZRz0ergoBqor4xtjkdzMd", oauth_version="1.0"';
        config = {
            headers: DST;
        };
        $http.post(url, data, config).
            success(function (data, status, headers, config) {
                $log.info('loging success');
            }).
            error(function (data, status, headers, config) {
                $log.info('logging error');
            });
        */
    };
}]);

})();