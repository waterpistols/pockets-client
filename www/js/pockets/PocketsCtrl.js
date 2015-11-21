(function(app) {
    'use strict';

    app.controller("PocketsCtrl",
        function($scope, $log, pocket, Card, Pocket, $state, $interval, $timeout) {
            $scope.pockets = Pocket.getPockets();

            setPercentage($scope.pockets);

            $scope.drawPercentage = function(percentage) {
                $interval(function(percentage) {
                    return percentage * 3;
                }, 100);
            };

            $scope.refresh = function() {
                $scope.pockets = [];
                $scope.$apply();

                $timeout(function() {
                    Pocket.sync().finally(function() {
                        $scope.pockets = Pocket.getPockets();
                        setPercentage($scope.pockets);
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                }, 1200);
            };

            $scope.addNew = function() {
                $state.go();
            };

            $scope.details = function(id) {
                $state.go("tab.pocket-details", {
                    pocketId: id
                });
            };

            $scope.getCardType = Card.getCardType;
            $scope.getCardIcon = Card.getCardIcon;

            function setPercentage(pockets) {
                angular.forEach(pockets, function(item) {
                    item.percentage = 0;
                    $timeout(function() {
                        item.percentage = (item.remaining * 100) / item.amount;
                    }, 1000);
                });
            }
        }
    );

}(angular.module("pockets")));
