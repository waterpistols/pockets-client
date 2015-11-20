(function(app) {
    'use strict';

    app.controller("PocketsCtrl",
        function($scope, $log, pocket, Pocket, $state, $interval) {
            $scope.pockets = [];
            Pocket.sync().then(function() {
                $scope.pockets = Pocket.getPockets();
                console.log($scope.pockets)
                $scope.pockets.push({
                    id: 124,
                    date: 1448024316244,
                    pocketId: 223,
                    name: "New",
                    type: "Percentage - 20%",
                    balance: 30,
                    percentage: 90,
                    amount: 150
                });
            });

            $scope.drawPercentage = function (percentage) {
                $interval(function (percentage) {
                    return percentage*3;
                }, 100);
            };

            $scope.refresh = function() {
                Pocket.sync().then(function() {
                    $scope.pockets = Pocket.getPockets();
                }).finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            $scope.addNew = function() {
                $state.go();
            };

            $scope.details = function(id) {
                $state.go("tab.pocket-details", {
                    pocketId: id
                });
            };

            $scope.getCardType = function(pocket) {
                switch (pocket.color) {
                    case 0:
                        return "pocket-rent";
                    case 1:
                        return "pocket-utilities";
                    case 2:
                        return "pocket-groceries";
                    case 3:
                        return "pocket-funstuff";
                    default:
                        return "pocket-new";
                }
            };

            $scope.getCardIcon = function(icon) {
                switch (icon) {
                    case 0:
                        return "rent";
                    case 1:
                        return "utilities";
                    case 2:
                        return "groceries";
                    default:
                        return "new";
                }
            };
        }
    );

}(angular.module("pockets")));
