(function (undefined) {
'use strict';

angular.module('MomAndPop').service('utils', function () {
    this.pathJoin = function () {
        var components = [];
        components = components.concat(components, _.map(arguments, function (node) {
            return node.split('/');
        }));

        return components.join('/');
    };
});

})();
