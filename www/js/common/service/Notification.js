(function(app) {
    'use strict';

    app.factory("Notification", function($ionicUser, $log, $rootScope, $ionicPush, User) {
        return {
            register: function() {
                var user = $ionicUser.get();

                if( ! user.user_id) {
                    var deviceInfo = User.getDeviceInfo();
                    if (deviceInfo!== null && deviceInfo.hasOwnProperty('deviceId'))  {
                        user.user_id = deviceInfo.deviceId;
                    }
                    else
                    {
                        user.user_id = Math.random().toString();
                    }
                }
               // if(!$rootScope.auth.ionic.push.token) {
                    //only need to register once
                    $ionicUser.identify(user).then((function () {
                        $log.debug('Identified user ' + user.user_id);
                        $ionicPush.register({
                            canShowAlert: true, //Can pushes show an alert on your screen?
                            canSetBadge: true, //Can pushes update app icon badges?
                            canPlaySound: true, //Can notifications play a sound?
                            canRunActionsOnWake: true //Can run actions outside the app,
                        }, {
                            user_id: user.user_id
                        });
                    }).bind(this));
                //}
                //
                // Handle incoming push notifcations
                //
                $rootScope.$on('$cordovaPush:notificationReceived', this.handleNotification.bind(this));
                //
                // Handles incoming device tokens
                //
                $rootScope.$on('$cordovaPush:tokenReceived', this.handleToken.bind(this));
            },
            handleNotification: function(event, notification) {
                $log.debug(JSON.stringify(notification) + "---------------------------------------------------------");
                //
                // Get documents based on platform
                //
                var documents, pushId;
                if (ionic.Platform.isAndroid() ) {
                    if (notification.payload && notification.payload.payload) {

                    }
                } else if ( ionic.Platform.isIOS() ) {
                    if (notification.documents) {

                    }
                }
            },
            handleToken: function(event, data) {
                $log.debug('Ionic Push: Got token ' + data.token);
                User.registerPushToken(data.token);
            }
        }
    }
);

}(angular.module("pockets")));
