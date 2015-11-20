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
                return $q.resolve({
                    data: [{
                        id: 123,
                        date: 1448024416244,
                        pocketId: 222,
                        name: "Profi rom-food SRL",
                        amount: 1000
                    }, {
                        id: 124,
                        date: 1447022316244,
                        pocketId: 222,
                        name: "Dante international",
                        amount: 901
                    },{
                        id: 125,
                        date: 1443022316244,
                        pocketId: 222,
                        name: "Filantropica SA",
                        amount: 22
                    },{
                        id: 126,
                        date: 1441022316244,
                        pocketId: 222,
                        name: "Gigi polasjk grup",
                        amount: 454
                    }
                ]
                });
            },
            getPockets: function() {
                // return $http({
                //     method: "GET",
                //     url: Config.url + "/pockets",
                //     headers: {
                //         "X-apikey": $rootScope.authInfo.token
                //     }
                // });
                return $q.resolve({
                    data: [{
                        id: 123,
                        date: 1448024416244,
                        pocketId: 222,
                        name: "Pocket 1",
                        amount: 1000,
                        balance: 10,
                        type: "Fixed Rate",
                        category: 0,
                        icon: 0
                    }, {
                        id: 124,
                        date: 1448024316244,
                        pocketId: 223,
                        name: "Pocket 2",
                        type: "Percentage - 20%",
                        balance: 30,
                        amount: 1000,
                        category: 1,
                        icon: 1
                    },{
                        id: 123,
                        date: 1448024416244,
                        pocketId: 222,
                        name: "Pocket 1",
                        amount: 1000,
                        balance: 10,
                        type: "Fixed Rate",
                        category: 2,
                        icon: 0
                    }]
                });
            }
        };
    });

}(angular.module("pockets")));
