(function(app) {
    'use strict';

    app.controller("PocketsCtrl",
        function($scope, $log, pockets) {
            $log.debug(pockets);
        }
    );

}(angular.module("pockets")));
