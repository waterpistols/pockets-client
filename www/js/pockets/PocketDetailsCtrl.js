(function(app) {
    'use strict';

    app.controller("PocketDetailsCtrl",
        function($scope, Pocket, Card) {
            $scope.pocket = Pocket.getPocket();

            $scope.selectedTab       = 'history';
            $scope.setTab            = function(tabName) {
                $scope.selectedTab = tabName;
            };
            $scope.pocket.percentage = ($scope.pocket.remaining * 100) / $scope.pocket.amount;

            $scope.getCardType = Card.getCardType;
            $scope.getCardIcon = Card.getCardIcon;
            $scope.removeLocation = function(item) {
                var index = $scope.pocket.locations.indexOf(item);
                if (index !== -1) {
                    $scope.pocket.locations.splice(index, 1);
                }
                Pocket.removeLocation(item._id);
            };

            $scope.timeframes = [];

            if ($scope.pocket.timeFrequency) {
                $scope.timeframes.push({
                    timeFrequency : $scope.pocket.timeFrequency,
                    timeFrom : $scope.pocket.timeFrom,
                    timeTo : $scope.pocket.timeTo
                })
            }


            $scope.removeTimeframe = function(item) {
                var index = $scope.timeframes.indexOf(item);
                if (index !== -1) {
                    $scope.timeframes.splice(index, 1);
                }
                Pocket.removeLocation(item._id);
            };


        }
    ).filter('transactionDateFirstLine', function() {
        return function(input) {
            var str = moment(input).format('DD MMM');

            return str;
        }
    })
    .filter('transactionDateSecondLine', function() {
        return function(input) {
            var str = moment(input).format('hh:mm');

            return str;
        }
    });

}(angular.module("pockets")));
