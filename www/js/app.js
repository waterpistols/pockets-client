angular.module('pockets', [
        'ionic', 'ionic.service.core',

        'ionic.service.push',

        'LocalStorageModule',
        'nvd3ChartDirectives'
    ])
    .run(function($ionicPlatform, User, Notification) {
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

            User.sync();
            Notification.register();
        });
    })
    .config(function($stateProvider, $ionicAppProvider, $urlRouterProvider, $animateProvider, Config) {
        $animateProvider.classNameFilter(/^((?!col-md).)*$/);

        $ionicAppProvider.identify({
            app_id: Config.ionic.app_id,
            api_key: Config.ionic.api_key,
            dev_push: Config.ionic.dev_push
        });

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
                    pocket: function(Pocket) {
                        return true;
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
                        return History.getHistory();
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
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/cashboard');
    });
