
(function(app) {
    'use strict';

    app.controller("HistoryCtrl", function($scope, history, pockets, $ionicModal) {
        $scope.history = history;
        $scope.pockets = pockets;

        $ionicModal.fromTemplateUrl('pockets-list.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.addToPocket = function() {
            console.log("add to pockets")
            $scope.modal.show();
        }

        $scope.selectPocket = function() {
            $scope.modal.hide();
        };
    });

}(angular.module("pockets")));
