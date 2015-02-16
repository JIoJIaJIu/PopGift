(function (undefined) {
'use strict';

angular.module('MomAndPop').service('utils', function () {
    this.pathJoin = function () {
        var url = '';
        _.forEach(arguments, function (str) {
            if(str.substr(-1) == '/') {
                str = str.substr(0, str.length - 1);
            }

            if (url)
                url += '/';

            url += str;
        });
        return url;
    };

    this.randomString = function () {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 25;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    };
});

})();
