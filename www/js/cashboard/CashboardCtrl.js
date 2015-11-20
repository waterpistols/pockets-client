(function(app) {
    'use strict';

    app.controller("CashboardCtrl", function($scope, $state, $rootScope) {
        if (!$rootScope.authInfo) {
            $state.go("login");
        }

        $scope.refresh = function() {
            $scope.$broadcast('scroll.refreshComplete');
        };

    });
}(angular.module("pockets")));
