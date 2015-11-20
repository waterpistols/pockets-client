(function(app) {
    'use strict';

    app.factory("User", function(_ajax, localStorageService, $q, $rootScope) {
            var _keys = {
                users: "users",
                authInfo: "auth"
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
                    );
                },
                getUsers: function() {
                    return localStorageService.get(_keys.users);
                },
                login: function() {
                    return _ajax.login().then(
                        function success(res) {
                            if (res.data) {
                                $rootScope.authInfo = res.data;
                                return localStorageService.set(_keys.authInfo, res.data);
                            } else {
                                $q.reject(new Error('No data received'));
                            }
                        }
                    );
                }
            }
        }
    );

}(angular.module("pockets")));
