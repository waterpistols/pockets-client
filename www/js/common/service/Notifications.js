(function(app) {
    'use strict';

    app.factory("Notifications", function(_ajax, localStorageService, $q) {
        var _keys = {
            notifications: "notifications"
        };

        return {
            get: function() {
                return _ajax.getNotifications().then(
                    function success(res) {
                        return res.data;
                    }
                );
            }
        };
    });

}(angular.module("pockets")));
