(function(app) {
    'use strict';

    app.factory("Pocket", function(_ajax, localStorageService, $q) {
        var _keys = {
            pockets: "pockets"
        };

        return {
            sync: function() {
                return _ajax.getPockets().then(
                    function success(res) {
                        if (res.data) {
                            return localStorageService.set(_keys.pockets, res.data);
                        } else {
                            $q.reject(new Error('No data received'));
                        }
                    }
                );
            },
            getPockets: function() {
                return localStorageService.get(_keys.pockets);
            }
        };
    });

}(angular.module("pockets")));
