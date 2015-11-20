
(function(app) {
    'use strict';

    app.controller("LoginCtrl", [
        "$scope",
        "$rootScope",
        "$state",
        "$ionicPopup",
        function($scope, $rootScope, $state, $ionicPopup) {
            $scope.data = {};

            $scope.login = function() {

            }
        }
    ]);

}(angular.module("pockets")));