(function(app) {
    'use strict';

    app.factory("User", function(_ajax, localStorageService, $q, $rootScope, $ionicUser) {
            var _keys = {
                authInfo: "authInfo",
                deviceInfo: "device"
            };

            return {
                sync: function() {
                    var auth = localStorageService.get(_keys.authInfo);
                    $rootScope[_keys.authInfo] = auth;

                    var deviceInfo = localStorageService.get(_keys.deviceInfo);

                    if ( ! deviceInfo ) {
                        //
                        // Mobile devices (iOS and android)
                        //
                        if( ionic.Platform.isAndroid() || ionic.Platform.isIOS()){
                            document.addEventListener("deviceready", function () {
                                localStorageService.set(_keys.deviceInfo, {
                                    deviceId: device.uuid,
                                    deviceName: device.model
                                });

                            }, false);
                        } else {
                            //
                            // All other
                            //
                            localStorageService.set(_keys.deviceInfo, {
                                deviceId: $ionicUser.generateGUID(),
                                deviceName: "Not mobile"
                            });
                        }
                    }
                },
                login: function(data) {
                    var deviceInfo = localStorageService.get(_keys.deviceInfo);

                    angular.extend(data, deviceInfo);

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
                },
                registerToken: function(token) {
                    var deviceInfo = localStorageService.get(_keys.deviceInfo);
                    deviceInfo.pushToken = token;
                    localStorageService.set(_keys.deviceInfo, deviceInfo);
                },
                getDeviceInfo: function() {
                    return localStorageService.get(_keys.deviceInfo);
                }
            }
        }
    );

}(angular.module("pockets")));
