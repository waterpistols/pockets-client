
(function(app) {
    'use strict';
    app.controller("SettingsCtrl",
        function($scope, $log) {



            $scope.fluidPockets = {
                total: 1000,
                items: [
                    {
                        id: 2,
                        share: 0.3,
                        label: 'Groceries',
                        color: '#8BB943'
                    },

                    {
                        id: 3,
                        share: 0.3,
                        label: 'Shopping',
                        color: '#DC576B'
                    },
                    {
                        id: 4,
                        share: 0.2,
                        label: 'Fun Stuff',
                        color: '#299AB1'
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
                console.log($scope.fluidPockets);
            };
        }
    );

}(angular.module("pockets")));
