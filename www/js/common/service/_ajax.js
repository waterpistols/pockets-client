
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
                }
            }
        }
    ]);

}(angular.module("pockets")));
