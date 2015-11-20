(function(app) {
    'use strict';

    app.controller("CashboardCtrl", function($scope, $state, $rootScope) {
        if (!$rootScope.authInfo) {
            $state.go("login");
        }
    });
}(angular.module("pockets")));
