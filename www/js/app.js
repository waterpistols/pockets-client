angular.module('pockets', [
    'ionic',
    'LocalStorageModule'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'js/login/login.html',
            controller: 'LoginCtrl'
        })
        .state('tab.cashboard', {
            url: '/cashboard',
            views: {
                'tab-cashboard': {
                    templateUrl: 'js/cashboard/cashboard.html',
                    controller: 'CashboardCtrl'
                }
            }
        })
        .state('tab.pockets', {
            url: '/pockets',
            views: {
                'tab-pockets': {
                    templateUrl: 'js/pockets/pockets.html',
                    controller: 'PocketsCtrl'
                }
            },
            resolve: {
                pockets: function(Pocket, $state, $log) {
                    return Pocket.getPockets().catch(function(error) {
                        $log.debug(error);
                    });
                }
            }
        })
        .state('tab.pocket-details', {
            url: '/pocket/:pocketId',
            views: {
                'tab-pockets': {
                    templateUrl: 'js/pockets/pocket-details.html',
                    controller: 'PocketDetailsCtrl'
                }
            }
        })
        .state('tab.history', {
            url: '/history',
            views: {
                'tab-history': {
                    templateUrl: 'js/history/history.html',
                    controller: 'HistoryCtrl'
                }
            },
            resolve: {
                history: function(History) {
                    return true;
                }
            }
        })
        .state('tab.settings', {
            url: '/settings',
            views: {
                'tab-settings': {
                    templateUrl: 'js/settings/settings.html',
                    controller: 'SettingsCtrl'
                }
            },
            resolve: {
                userData: function(User, $state, $log) {
                    return User.sync().catch(function(error) {
                        $log.debug(error);
                    });
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/cashboard');

});
