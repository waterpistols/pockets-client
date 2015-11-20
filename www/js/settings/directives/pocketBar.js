(function(app) {
    'use strict';

    app.directive("pocketBar",
        function() {
            return {
                restrict   : 'E',
                transclude : true,
                replace    : true,
                templateUrl: 'js/settings/directives/pocketBar.html',
                controller : function() {
                },
                link       : function(scope, element, attrs) {
                    console.log(element);
                }
            }
        })
        .directive("pocketBarSeparator", function() {
            return {
                restrict: 'E',
                replace : true,
                require : '^pocketBar',
                link    : function(scope, element, attrs, pocketBar) {
                    element.draggabilly({
                        axis: 'y'
                    });
                }
            }
        });

}(angular.module("pockets")));
