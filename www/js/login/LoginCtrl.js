
(function(app) {
    'use strict';

    app.controller("LoginCtrl", function($rootScope, $scope, $state, $ionicPopup, User, Util) {
            $scope.data = {};
            $scope.login = function() {
                if ( ! ($scope.data.user && $scope.data.password) ) {
                    $ionicPopup.alert({
                       title: 'Error!',
                       template: 'Please supply username & password'
                   });
                   return;
                }
                $rootScope.loadingClass = true;
                User.login($scope.data).then(function(success) {
                    if (success) {
                        Util.syncAll();
                        $state.go("tab.cashboard");
                    } else {
                        $rootScope.loadingClass = false;
                        $ionicPopup.alert({
                           title: 'Error!',
                           template: 'Login failed'
                       });
                    }
                }, function() {
                    $rootScope.loadingClass = false;
                    $ionicPopup.alert({
                        title: 'Error!',
                        template: 'Login failed'
                    });
                });
            };
        }
    );

}(angular.module("pockets")));
