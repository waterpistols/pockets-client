
(function(app) {
    'use strict';
    app.controller("SettingsCtrl",
        function($scope, $log) {



            $scope.fluidPockets = {
                total: 1000,
                items: [
                    {
                        id: 2,
                        share: 0.5,
                        color: 'yellow'
                    },
                    {
                        id: 3,
                        share: 0.1,
                        color: 'blue'
                    },
                    {
                        id: 4,
                        share: 0.15,
                        color: 'green'
                    }
                ]
            };

            $scope.fixedPockets = {
                total: 500,
                items: [
                    {
                        id: 1,
                        amount: 50,
                        color: 'red'
                    },
                    {
                        id: 2,
                        amount: 150,
                        color: 'blue'
                    }
                ]
            };

            $scope.onMoved = function() {
                console.log(mainPockets);
            };
        }
    );

}(angular.module("pockets")));
