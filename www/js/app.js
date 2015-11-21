angular.module('pockets', [
        'ionic',
        'ionic.service.core',
        'ionic.service.push',
        'ngAnimate',
        'ksSwiper',
        'LocalStorageModule',
        'nvd3ChartDirectives'
    ])
    .run(function($ionicPlatform, $rootScope, User, Notification) {
        User.sync();

        $rootScope.$on('$stateChangeStart', function() {
            $rootScope.loadingClass = true;
        });
        $rootScope.$on('$stateChangeSuccess', function() {
            $rootScope.loadingClass = false;
        });
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            Notification.register();
        });
    })
    .config(function($stateProvider, $ionicAppProvider, $urlRouterProvider, Config) {
        $ionicAppProvider.identify({
            app_id: Config.ionic.app_id,
            api_key: Config.ionic.api_key,
            dev_push: Config.ionic.dev_push
        });


        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                resolve: {
                    auth: function($state, User) {
                        return User.sync().catch(
                            function() {
                                $state.go('login');
                                return false;
                            });
                    }
                }
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
                },
                resolve: {
                    pocketData: function(auth, Pocket) {
                        return Pocket.getPockets();
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
                    pocket: function(auth, Pocket) {
                        return Pocket.sync();
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
                    history: function(auth, History) {
                        return History.getHistory();
                    },
                    pockets: function(auth, Pocket) {
                        return Pocket.getById();
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
                    percentages: function(auth, Percentages) {
                        return Percentages.sync();
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/cashboard');
    });
