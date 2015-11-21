(function(app) {
    'use strict';

    app.controller("PocketDetailsCtrl",
        function($scope, Pocket, Card) {
            $scope.pocket = Pocket.getPocket();

            $scope.pocket.percentage = ($scope.pocket.remaining * 100) / $scope.pocket.amount;


            $scope.getCardType = Card.getCardType;
            $scope.getCardIcon = Card.getCardIcon;


        }
    );

}(angular.module("pockets")));
