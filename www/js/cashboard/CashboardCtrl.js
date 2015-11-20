
(function(app) {
    'use strict';

    app.controller("CashboardCtrl", function($scope, $state, $rootScope) {
        if ( ! $rootScope.authInfo ) {
            $state.go("login");
        }
        $scope.exampleData = [
            {
                "key": "Series 1",
                "values": [
                    [ 0 , 0],
                    [ 2 , 4],
                    [ 4 , 1],
                    [ 6 , -6] ,
                    [ 8 , -3] ,
                    [ 10, 12]
                ]
            }];
    });

}(angular.module("pockets")));
