(function(app) {
    'use strict';

    app.controller("PocketsCtrl",
        function($scope, $log, pocket, Pocket) {
            $scope.pockets = [];
            Pocket.sync().then(function() {
                $scope.pockets = Pocket.getPockets();
            });

            $scope.pockets.push({
                name: "Add"
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
                        return "pocket-default";
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
                        return "default";
                }
            };
        }
    );

}(angular.module("pockets")));
