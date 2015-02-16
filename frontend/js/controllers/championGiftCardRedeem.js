(function (undefined) {

angular.module('MomAndPop').controller('championGiftCardRedeem', [
    '$scope',
    '$window',
    '$log',
    '$routeParams',
    'GiftCard',
function ($scope, $window, $log, $routeParams, GiftCard) {
    var rawQr = null;
    $scope.resetGlobal({
        title: 'Display QR'
    });

    var d = GiftCard.prepareForRedeem($routeParams.id);
    d.then(function (data) {
        $scope.qr = data.redeemQRCodePicture;
    }, function (err) {
        $window.history.back();
    });

    $scope.redeem = function () {
    }

}]);

})();
