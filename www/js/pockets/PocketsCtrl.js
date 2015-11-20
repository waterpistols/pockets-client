(function(app) {
    'use strict';

    app.controller("PocketsCtrl",
        function($scope, $log, pocket, Pocket) {
            $scope.pockets = [];
            Pocket.sync().then(function() {
                $scope.pockets = Pocket.getPockets();

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


            $scope.getCardType = function(pocket) {
                switch (pocket.category) {
                    case 0:
                        return "pocket-rent";
                    case 1:
                        return "pocket-utilities";
                    case 2:
                        return "pocket-groceries";
                    default:
                        return "pocket-new";
                }
            };

            $scope.getCardIcon = function(pocket) {
                switch (pocket.category) {
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
