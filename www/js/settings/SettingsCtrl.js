
(function(app) {
    'use strict';
    app.controller("SettingsCtrl",
        function($scope, $log, userData) {
            $log.debug(userData);

            $scope.sideTotal = 1000;
            $scope.sidePockets = [
                {
                    id: 1,
                    amount: 500,
                    color: 'red'
                }
            ];

            $scope.mainTotal = 500;
            $scope.mainPockets = [
                {
                    id: 2,
                    share: 30,
                    color: 'yellow'
                },
                {
                    id: 2,
                    share: 40,
                    color: 'blue'
                }
            ];

            $scope.onMoved = function() {
                console.log(mainPockets);
            };
        }
    );

}(angular.module("pockets")));
