(function(app) {
    'use strict';

    app.factory("User", function(_ajax, localStorageService, $q, $rootScope) {
            var _keys = {
                authInfo: "authInfo"
            };

            return {
                sync: function() {
                    var auth = localStorageService.get(_keys.authInfo);
                    $rootScope[_keys.authInfo] = auth;
                },
                login: function(data) {
                    return _ajax.login(data).then(
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
