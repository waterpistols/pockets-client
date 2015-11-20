
(function(app) {
    'use strict';

    app.factory("_ajax", [
        "$http",
        "Config",
        function($http, Config) {

            return {
                getUsers: function() {
                    return $http({
                        method: "GET",
                        url: Config.url + "/pockets"
                    });
                },
                login: function(data) {
                    return $http({
                        method: "POST",
                        url: Config.url + "/login",
                        data: data
                    });
                },
                getPockets: function() {
                    return $http({
                        method: "GET",
                        url: Config.url + "/pockets"
                    });
                }
            };
        }
    ]);

}(angular.module("pockets")));
