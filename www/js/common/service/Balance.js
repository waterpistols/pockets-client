(function(app) {
    'use strict';

    app.factory("Balance", function(_ajax, localStorageService, $q) {
        var _keys = {
            balance: "balance"
        };

        return {
            sync: function() {
                return _ajax.getBalance().then(
                    function success(res) {
                        if (res.data) {
                            return localStorageService.set(_keys.balance, res.data);
                        } else {
                            $q.reject(new Error('No data received'));
                        }
                    }
                );
            },
            getBalance: function() {
                return localStorageService.get(_keys.balance);
            }
        };
    });

}(angular.module("pockets")));
