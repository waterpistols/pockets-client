(function(app) {
    'use strict';

    app.controller("PocketsCtrl",
        function($scope, $log, pocket, Card, Pocket, localStorageService, Notifications, $state, $timeout, $interval) {
            $scope.pockets = Pocket.getPockets();

            setPercentage($scope.pockets);

            // Get notifications
            $interval(function() {
              if(localStorageService.get('notifications')) {
                var notifications = localStorageService.get('notifications');
                if(notifications.length) {
                  $scope.notification = notifications[0];
                } else {
                  $scope.notification = false;
                }
                localStorageService.remove('notifications');
              } else {
                Notifications.get().then(function(notifications) {
                  if(notifications.length) {
                    $scope.notification = notifications[0];
                  } else {
                    $scope.notification = false;
                  }
                });
              }
            }, 7000);

            $scope.drawPercentage = function(percentage) {
                $interval(function(percentage) {
                    return percentage * 3;
                }, 100);
            };

            $scope.refresh = function() {
                $scope.pockets = [];
                $scope.$apply();

                $timeout(function() {
                    Pocket.sync().finally(function() {
                        $scope.pockets = Pocket.getPockets();
                        setPercentage($scope.pockets);
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                }, 1200);
            };

            $scope.addNew = function() {
                $state.go("tab.pocketWizard");
            };

            $scope.details = function(id) {
                $state.go("tab.pocket-details", {
                    pocketId: id
                });
            };

            $scope.getCardType = Card.getCardType;
            $scope.getCardIcon = Card.getCardIcon;

            function setPercentage(pockets) {
                angular.forEach(pockets, function(item) {
                    item.percentage = 0;
                    $timeout(function() {
                        item.percentage = (item.remaining * 100) / item.amount;
                    }, 1000);
                });
            }
        }
    );

}(angular.module("pockets")));
