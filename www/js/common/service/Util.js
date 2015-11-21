(function(app) {
    'use strict';

    app.factory("Util", function(Pocket, History, Balance) {
        return {
            syncAll: function() {
                Pocket.sync();
                History.sync();
                Balance.sync();
            }
        };
    });

}(angular.module("pockets")));
