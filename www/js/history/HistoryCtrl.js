
(function(app) {
    'use strict';

    app.controller("HistoryCtrl", function($scope, history, pockets, $ionicModal, History) {
        $scope.history = history;
        $scope.pockets = pockets;

        $ionicModal.fromTemplateUrl('pockets-list.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.addToPocket = function(id) {
            $scope.transactionId = id;
            $scope.modal.show();
        }

        $scope.selectPocket = function( pocketId ) {
            History.addPocket($scope.transactionId, pocketId);

            $scope.modal.hide();
            //
            // reload transactions
            //
            $scope.history = History.getHistory();
        };

        $scope.cancel = function() {
            $scope.modal.hide();
        }
    });

}(angular.module("pockets")));
