
(function(app) {
    'use strict';

    app.factory("Users", [
        "_ajax",
        "localStorageNotification",
        function(_ajax, localStorageNotification) {
            var _keys = {
                users: "users"
            };

            return {
                sync: function() {
                    _ajax.getUsers().then(
                        function success(res) {
                            if (res.data) {
                                localStorageNotification.save(_keys.users, res.data);
                            }
                        }
                    )
                },
                getUsers: function() {
                    return localStorageNotification.get(_keys.users);
                }
            }
        }
    ]);

}(angular.module("pockets")));