(function(app) {
    'use strict';

    app.factory("User", function(_ajax, localStorageService, $q) {
            var _keys = {
                users: "users"
            };

            return {
                sync: function() {
                    return _ajax.getUsers().then(
                        function success(res) {
                            if (res.data) {
                                return localStorageService.set(_keys.users, res.data);
                            } else {
                                $q.reject(new Error('No data received'));
                            }
                        }
                    )
                },
                getUsers: function() {
                    return localStorageService.get(_keys.users);
                }
            }
        }
    );

}(angular.module("pockets")));
