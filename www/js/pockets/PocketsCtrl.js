(function(app) {
    'use strict';

    app.controller("PocketsCtrl",
        function($scope, $log, pocketsData) {
            $log.debug(pocketsData);
        }
    );

}(angular.module("pockets")));
