
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
                    //
                    //{
                    //    id: 4,
                    //    share: 0.15,
                    //    color: 'green'
                    //},
                    {
                        id: 3,
                        share: 0.3,
                        color: 'cyan'
                    }
                ]
            };

            $scope.fixedPockets = {
                total: 500,
                items: [

                    {
                        id: 2,
                        amount: 150,
                        color: 'blue'
                    },
                    {
                        id: 1,
                        amount: 50,
                        color: 'red'
                    },
                ]
            };

            $scope.onMoved = function() {
                console.log(mainPockets);
            };
        }
    );

}(angular.module("pockets")));
