
(function(app) {
    'use strict';
    app.controller("SettingsCtrl",
        function($scope, $log, userData) {
            $log.debug(userData);
        }
    );

}(angular.module("pockets")));
