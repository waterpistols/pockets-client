(function(app) {
    'use strict';

    app.controller("HistoryCtrl", function($scope, history, pockets, $ionicModal, History, Config) {
        $scope.history = history;
        $scope.pockets = pockets;

        $ionicModal.fromTemplateUrl('pockets-list.html', {
            scope: $scope,
            animation: 'scale-in'
        }).then(function(modal) {
            $scope.modal = modal;
        });


        $scope.refresh = function() {
            History.sync().finally(function() {
                $scope.history = History.getHistory();
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.addToPocket = function(id) {
            $scope.transactionId = id;
            $scope.modal.show();
        }

        $scope.selectPocket = function(pocketId) {
            History.addPocket($scope.transactionId, pocketId);

            $scope.modal.hide();
            //
            // reload transactions
            //
            $scope.history = History.getHistory();
        };

        $scope.cancel = function() {
            $scope.modal.hide();
        };

        $scope.getIcon = function(id) {
            return Config.pockets.icon[id];
        }

        $scope.getColor = function(id) {
            return {
                'background-color': Config.pockets.color[id]
            };
        }
    });

}(angular.module("pockets")));
