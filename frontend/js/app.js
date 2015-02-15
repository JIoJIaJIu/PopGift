(function () {
'use strict';

var app = angular
    .module('MomAndPop', [
        'ngRoute',
        'ngTouch',
        'ngResource',
        'ngStorage',
        'ui.bootstrap',
        'MomAndPop.controllers',
        'MomAndPop.config'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'views/login.html',
                controller: 'signInCtrl'
            })
            .when('/home', {
                redirectTo: '/individual-home'
            })
            .when('/search/:query', {
                templateUrl: 'views/search.html',
                controller: 'searchPage'
            })
            .when('/details/:id', {
                templateUrl: 'views/details.html',
                controller: 'detailsPage'
            })
            .when('/redeem/:id/:redeemId', {
                templateUrl: 'views/redeem.html',
                controller: 'redeemPage'
            })
            .when('/privacy', {
                templateUrl: 'views/textinfo.html',
                controller: 'privacyPage'
            })
            .when('/terms', {
                templateUrl: 'views/textinfo.html',
                controller: 'termsPage'
            })
            .when('/abuse', {
                templateUrl: 'views/abuse.html',
                controller: 'abusePage'
            })
            .when('/individual-home',{
                templateUrl: 'views/individual-home.html',
                controller: 'homePage'
            })
            .when('/business-home',{
                templateUrl: 'views/business-home.html',
                controller: 'businessHomePage'
            })
            .when('/business-step-1',{
                templateUrl: 'views/business-step-1.html',
                controller: 'businessStep1Page'
            })
            .when('/business-step-2',{
                templateUrl: 'views/business-step-2.html',
                controller: 'businessStep2Page'
            })
            .when('/business-step-3', {
                templateUrl: 'views/business-step-3.html',
                controller: 'businessStep3Page'
            })
            .when('/sign-up-choose-account-type',{
                templateUrl: 'views/sign-up-choose-account-type.html',
                controller: 'signUpChooseAccountPage'
            })
            .when('/sign-up-champion',{
                templateUrl: 'views/sign-up-champion.html',
                controller:'signUpChampionCtrl'
            })
            .when('/sign-up-founder',{
                templateUrl: 'views/sign-up-founder.html',
                controller:'signUpFounderCtrl'
            })
            .when('/reset-password',{
                templateUrl: 'views/reset-password-step-1.html',
                controller:'resetPasswordCtrl'
            })
            .when('/reset-password-step2',{
                templateUrl: 'views/reset-password-step-2.html',
                controller:'resetPasswordStepTwoCtrl'
            })
            .when('/logout',{
                template: '',
                controller:'logoutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);


// Initialize the main module
app.run(['$rootScope', '$location', '$window', '$log', function ($rootScope, $location, $window, $log) {
    var config = angular.module('MomAndPop.config');
    $log.info('FB init');
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '319366818273535',
            xfbml      : true,
            version    : 'v2.1'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
/*
    $rootScope.location = $location;
    $rootScope.goto = function (path) {
        $rootScope.isExpand = false;
        if (path === 'back') { // Allow a 'back' keyword to go to previous page
            $window.history.back();
        }else { // Go to the specified path
            $location.path(path);
        }
    };
*/
}]);


// Global page controller
app.controller('page', [
    '$rootScope',
    '$scope',
    '$http',
    '$modal',
    '$location',
    'user',
function ($rootScope, $scope,  $http, $modal, $location, user) {
    document.body.setAttribute('ontouchstart', '');

    $scope.global = {
        title: 'Mom & Pop Project',
        headless: true
    };

    $scope.loggedIn = function () {
        return !!user.getUser();
    };

    $scope.resetGlobal = function (options) {
        options = options || {};

        $scope.global.headless = options.headless || false;
        $scope.global.showHeader = !$scope.global.headless;
        $scope.global.back = options.back || '';
        $scope.global.menuOpened = false;

        $scope.global.user = user.getUser();

        if (options.title) {
            $scope.global.title = options.title;
        }
        dismissModal();
    };

    $scope.getHome = function () {
        var profile = $scope.global.user || {};
        return profile.home || '/';
    };

    $scope.openMenu = function () {
        if (!$scope.global.headless && $rootScope.loggedIn()) {
            $scope.global.menuOpened = true;
        }
    };

    $rootScope.showMenu = false;

    var modalInstance = null;
    function dismissModal() {
        if (modalInstance) {
            modalInstance.dismiss();
        }
    }

    $rootScope.showInformation = function (text) {
        dismissModal();
        modalInstance = $modal.open({
            templateUrl: 'partials/modal.html',
            controller: 'modalCtrl',
            resolve: {
                text: function () { return text; }
            }
        });
        modalInstance.result.then(function () { modalInstance = null; }, function () { modalInstance = null; });
        return modalInstance;
    };

    $rootScope.showConfirmation = function (text) {
        dismissModal();
        modalInstance = $modal.open({
            templateUrl: 'partials/modal-confirm.html',
            controller: 'modalCtrl',
            resolve: {
                text: function () { return text; }
            }
        });
        modalInstance.result.then(function () { modalInstance = null; }, function () { modalInstance = null; });
        return modalInstance;
    };

    // reset modal
    $scope.cancelRedeem = function () {
        $rootScope.showConfirmation('Are you sure you want to cancel this process?')
            .result.then(function () {
                $location.path('/business-home');
            });
    };

    // fix for safari mobile height 100% issue.
    // First check to see if the platform is an iPhone or iPod
    if(/iP/.test(navigator.platform) && /Safari/i.test(navigator.userAgent)){
        var mobileSafari = "Safari";
    }

    // Set the div height
    function setHeight($rightSidebar) {
        var new_height = $(this).height();
        // if mobileSafari add +60px
        if (typeof mobileSafari === 'string'){ new_height += 60; }
        $rightSidebar.css('height', new_height);
    }

    setHeight($('body'));
    $(window).resize(function() {
        setHeight.call(this, $('body'));
    });
}]);

})();
