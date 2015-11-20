
(function(app) {
    'use strict';

    app.controller("HistoryCtrl", function($scope, history, History) {
        History.sync().then(function() {
            $scope.history =  History.getHistory();
            console.log($scope.history)
        });
            // $scope.history = history;
        }
    );

}(angular.module("pockets")));
