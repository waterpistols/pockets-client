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
            getPockets: function(id) {
                id = id || '';

                return $http({
                    method: "GET",
                    url: Config.url + "/pockets/" + id,
                    headers: { "X-apikey": $rootScope.authInfo.token }
                });
            },
            updatePocket: function(transaction, pocket) {
                return $http({
                    method:"PUT",
                    url: Config.url + "/transactions/" + transaction + "/pocket",
                    headers: { "X-apikey": $rootScope.authInfo.token },
                    data: { pocketId: pocket }
                });
            },
            getPercentages: function() {
                return $http({
                    method: "GET",
                    url: Config.url + "/pockets/percent",
                    headers: {
                        "X-apikey": $rootScope.authInfo.token
                    }
                });
            },
            savePercentages: function(payload) {
                return $http({
                    method: "POST",
                    url: Config.url + "/pockets/percent",
                    data: payload,
                    headers: {
                        "X-apikey": $rootScope.authInfo.token
                    }
                });
            }
        };
    });

}(angular.module("pockets")));
