(function(app) {
    'use strict';

    app.factory("Percentages", function(_ajax, localStorageService, $q) {
        var _keys = {
            pockets: "percentages"
        };

        return {
            sync: function() {
                return _ajax.getPercentages().then(
                    function success(res) {
                        if (res.data) {
                            return localStorageService.set(_keys.pockets, res.data);
                        } else {
                            $q.reject(new Error('No data received'));
                        }
                    }
                );
            },
            save: function(payload) {
                return _ajax.savePercentages(payload);
            },
            getPercentages: function() {
                return localStorageService.get(_keys.pockets);
            },
            getById: function() {
                var pockets = localStorageService.get(_keys.pockets);
                var result = {};

                for (var i = 0 ; i < pockets.length; i++ ) {
                    result[ pockets[i].id ] = pockets[i];
                }
                return result;
            }
        };
    });

}(angular.module("pockets")));
