
(function(app) {
    'use strict';

    app.controller("HistoryCtrl", function($scope, history) {
        $scope.history = history;
    });

}(angular.module("pockets")));
