(function(app) {
    'use strict';

    app.controller("PocketsCtrl",
        function($scope, $log, Pocket, pocketsData) {
            $scope.pockets = pocketsData;
            console.log($scope.pockets);
        }
    );

}(angular.module("pockets")));
