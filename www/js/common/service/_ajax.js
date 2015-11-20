
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
                    // return $http({
                    //     method: "GET",
                    //     url: Config.url + "/history",
                    //     headers: {
                    //         "X-apikey": $rootScope.authInfo.token
                    //     }
                    // });
                    return $q.resolve({ data: [{
                        id: 123,
                        date: 1448024416244,
                        pocketId: 222,
                        name: "some fancy transaction",
                        amount: 1000
                    },{
                        id: 124,
                        date: 1448024316244,
                        pocketId: 222,
                        name: "some fancy transaction",
                        amount: 1000
                    }]});
                },
                getPockets: function() {
                    return $http({
                        method: "GET",
                        url: Config.url + "/pockets"
                    });
                }
            };
        }
    );

}(angular.module("pockets")));
