
(function(app) {
    'use strict';

    app.factory("History",
        function($q, _ajax, localStorageService) {
            var _keys = {
                history: "hist"
            };
            return {
                sync: function() {
                    return _ajax.getHistory().then(
                        function success(res) {
                            debugger
                            if (res.data) {
                                return localStorageService.set(_keys.history, res.data);
                            } else {
                                $q.reject(new Error('No data received'));
                            }
                        }
                    );
                },
                getHistory: function() {
                    return localStorageService.get(_keys.history) || [];
                }
            }
        }
    );

}(angular.module("pockets")));
