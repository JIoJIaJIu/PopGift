(function (undefined) {

angular.module('MomAndPop').service('GiftCard', [
    '$log',
    '$q',
    '$http',
    'utils',
    'CONFIG',
function ($log, $q, $http, utils, CONFIG) {
    this.resell = function () {
    }

    /**
     * @param {String} qrCode
     * @return {Object} promise
     */
    this.redeem = function (qrCode) {
        $log.debug('Redeem gift card');
        var REDEEM_URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCards/redeem');

        var q = $http.post(REDEEM_URL, {
            qrCode: qrCode
        });

        q.success(function (data) {
            d.resolve(data);
        });

        q.error(function (resp) {
            $log.warn(resp && resp.error);
            d.reject(resp && resp.error);
        });
        return d.promise;
    }

    /**
     * @param {String} id
     * @param {Number} amount
     * @return {Object} promise
     *   @key {Number} amount
     *   @key {String} redeemQRCode
     *   @key {String} redeemQRCodePicture
     *   @key {Boolean} redeemed
     *   @key {Datetime} timestamp
     */
    this.prepareForRedeem = function (id, amount) {
        var d = $q.defer();
        //TODO: where is amount?
        var PREPARE_REDEEM_URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'users/me/giftCards', id, 'prepareForRedeem');

        $log.debug('Prepare for redeem', id);
        var q = $http.post(PREPARE_REDEEM_URL);

        q.success(function (data) {
            d.resolve(data);
        });

        q.error(function (resp) {
            $log.warn(resp && resp.error);
            d.reject(resp && resp.error);
        });

        return d.promise;
    }
}]);

angular.module('MomAndPop').service('GiftCardOffer', [
function () {
    this.getGiftCardOffers = function () {
    }
}]);

})();
