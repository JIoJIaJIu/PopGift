(function (undefined) {
'use strict';

var app = angular.module('MomAndPop', []);

app.config(['$routeProvider', '$templateCache', function ($routeProvider, $templateCache) {

    $routeProvider.when('/', {
        controller: 'login',
        template: $templateCache.get('pages/login.html')
    });
}]);

})();
