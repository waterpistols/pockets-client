(function(app) {
    'use strict';

    app.factory("Util", function(Pocket, History) {
        return {
            syncAll: function() {
                Pocket.sync();
                History.sync();
            }
        };
    });

}(angular.module("pockets")));
