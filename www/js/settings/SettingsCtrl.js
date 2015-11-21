(function(app) {
    'use strict';
    app.controller("SettingsCtrl",
        function($scope, $state, Percentages, $interval, localStorageService, Notifications, Colors) {

          $interval(function() {
              Notifications.get().then(function(notifications) {
                if(notifications.length) {
                  localStorageService.set('notifications', notifications);
                  $state.go('tab.pockets');
                }
              });
          }, 2000);

            var percentages = Percentages.getPercentages();

            //$scope.fluidPockets = {
            //    total: 100,
            //    items: [
            //        {
            //            id: 2,
            //            percent: 0.3,
            //            category: 'Percentage',
            //            label: 'Groceries',
            //            color: '#8BB943'
            //        },
            //
            //        {
            //            id: 3,
            //            percent: 0.3,
            //            category: 'Percentage',
            //            label: 'Shopping',
            //            color: '#DC576B'
            //        },
            //        {
            //            id: 4,
            //            percent: 0.2,
            //            category: 'Percentage',
            //            label: 'Fun Stuff',
            //            color: '#299AB1'
            //        }
            //    ]
            //};

            $scope.fluidPockets = percentages.filter(function(item) {
                item.percent /= 100;
                return item.category === 'Percentage';
            });

            $scope.fixedPockets = {
                total: 1200,
                items: percentages.filter(function(item) {
                    item.color = Colors[item.color];

                    return item.category === 'Fixed Rate';
                })
            };

            $scope.onMoved = function() {
                var payload = angular.copy($scope.fluidPockets);
                payload = payload.filter(function(item) {
                    item.percent *= 100;
                    return true;
                });
                Percentages.save(payload);
            };
        }
    );

}(angular.module("pockets")));
