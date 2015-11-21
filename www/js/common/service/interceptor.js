(function(app) {
    'use strict';
    app.factory('HttpInterceptor', function($q) {
            return {
                'responseError': function(rejection) {
                    return $q.reject(rejection);
                }
            };
        });

})(angular.module("pockets"));
