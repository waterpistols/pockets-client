(function(app) {
    'use strict';

    app.factory("Pocket", function(_ajax, localStorageService, $q) {
        var _keys = {
            pockets: "pockets",
            pocket: "pocket"
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
            syncById: function(id) {
                return _ajax.getPockets(id).then(
                    function success(res) {
                        if (res.data) {
                            return localStorageService.set(_keys.pocket, res.data);
                        } else {
                            $q.reject(new Error('No data received'));
                        }
                    }
                );
            },

            getPockets: function() {
                return localStorageService.get(_keys.pockets);
            },
            getPocket: function() {
                return localStorageService.get(_keys.pocket);
            },
            removeLocation: function(id) {
                return _ajax.removeLocation(id);
            },
            getById: function() {
                var pockets = localStorageService.get(_keys.pockets);
                var result = {};

                for (var i = 0 ; i < pockets.length; i++ ) {
                    result[ pockets[i]._id ] = pockets[i];
                }
                return result;
            }
        };
    });

}(angular.module("pockets")));
