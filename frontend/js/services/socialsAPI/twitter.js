(function (undefined) {

angular.module('MomAndPop').service('twitterAPI', [
	'$log',
function ($log) {
	$log.info('Twitter oauth service');
	this.connect = function () {
		$log.info('oauth tw starting');
		var xhr = new XMLHttpRequest();
		var params = '';
		var body = 'grant_type=client_credentials';
		xhr.open('POST', 'https://api.twitter.com/oauth2/token', true);
		xhr.setRequestHeader('Authorization', 'Basic%20dFJ6anIzZGcyUGdDUXcyNUMwVXBramIxdTp3N2xlWlR1RmVBdzZ1MUZzWkRoTDFzd1BvNmxqb1ZTWW9xNFFkZDdLcEdNbU9mR1lMQQ==')
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
		xhr.send(body);
		$log.info('oauth tw ending');
	}
}]);

})();