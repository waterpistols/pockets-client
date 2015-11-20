
(function(app) {
    'use strict';

    app.controller("LoginCtrl", [
        "$scope",
        "$state",
        "$ionicPopup",
        "User",
        function($scope, $state, $ionicPopup, User) {
            $scope.data = {}
            $scope.login = function() {
                if ( ! ($scope.data.username && $scope.data.password) ) {
                    $ionicPopup.alert({
                       title: 'Error!',
                       template: 'Please suply username & password'
                   });
                   return;
                }
                User.login($scope.data).then(function(success) {
                    if (success) {
                        $state.go("tab.cashboard");
                    } else {
                        $ionicPopup.alert({
                           title: 'Error!',
                           template: 'Login failed'
                       });
                    }
                });
            }
        }
    ]);

}(angular.module("pockets")));
