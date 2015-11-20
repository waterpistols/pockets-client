(function(app) {
    'use strict';

    app.factory("Util", function(_ajax, localStorageService, $q, $rootScope, User, Pocket) {

        return {
            syncAll: function() {
                Pocket.sync();
            }
        };
    });

}(angular.module("pockets")));
