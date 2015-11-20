(function(app) {
    'use strict';

    app.factory("_ajax", function($http, $rootScope, Config, $q) {

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
            getHistory: function() {
                return $http({
                    method: "GET",
                    url: Config.url + "/transactions",
                    headers: { "X-apikey": $rootScope.authInfo.token  }
                });
            },
            getPockets: function() {
                return $http({
                    method: "GET",
                    url: Config.url + "/pockets",
                    headers: { "X-apikey": $rootScope.authInfo.token }
                });
            },
            updatePocket: function(transaction, pocket) {
                return $http({
                    method:"PUT",
                    url: Config.url + "/transactions/" + transaction + "/pocket",
                    headers: { "X-apikey": $rootScope.authInfo.token },
                    data: { pocketId: pocket }
                })
            }
        };
    });

}(angular.module("pockets")));
