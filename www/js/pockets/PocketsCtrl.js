(function(app) {
    'use strict';

    app.controller("PocketsCtrl",
        function($scope, $log, pocket, Card, Pocket, $state, $interval, $timeout) {
            $scope.pockets = Pocket.getPockets();


            angular.forEach($scope.pockets, function(item) {
                item.percentage = 0;
                $timeout(function() {
                    item.percentage = (item.remaining * 100) / item.amount;
                }, 1000);
            });

            //
            //$scope.pockets.push({
            //    id: 124,
            //    date: 1448024316244,
            //    pocketId: 223,
            //    name: "New",
            //    type: "Percentage - 20%",
            //    balance: 30,
            //    percentage: 90,
            //    amount: 150
            //});

            $scope.drawPercentage = function(percentage) {
                $interval(function(percentage) {
                    return percentage * 3;
                }, 100);
            };

            $scope.refresh = function() {
                syncPockets().finally(function() {
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

            $scope.getCardType = Card.getCardType;
            $scope.getCardIcon = Card.getCardIcon;

            function syncPockets() {
                return Pocket.sync().then(function() {
                    var items = Pocket.getPockets();
                    angular.forEach(items, function(item) {
                        if (!item.percent) {
                            item.percentage = (item.amount - item.remaining) / 100;
                        } else {
                            item.percentage = item.percent;
                        }
                    });

                    $scope.pockets = items;

                    $scope.pockets.push({
                        id        : 124,
                        date      : 1448024316244,
                        pocketId  : 223,
                        name      : "New",
                        type      : "Percentage - 20%",
                        balance   : 30,
                        percentage: 90,
                        amount    : 150
                    });
                });
            }
        }
    );

}(angular.module("pockets")));
