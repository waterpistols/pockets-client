(function(app) {
    'use strict';

    app.directive("pocketBar",
        function() {
            return {
                restrict   : 'E',
                transclude : true,
                replace    : true,
                templateUrl: 'js/settings/directives/pocketBar.html',
                scope: {
                    pockets: '=',
                    total: '=',
                    onMoved: '='
                },
                controller : function() {

                },
                link       : function(scope, element, attrs, controller) {
                    if (attrs.fixed === '') {
                        controller.fixed = true;
                    }
                    controller.scope = scope;
                }
            }
        })
        .directive("pocketBarRegions", function() {
            return {
                restrict: 'C',
                replace : true,
                require : '^pocketBar',
                link: function(scope, element, attrs) {

                }
            }
        })
        .directive("pocketBarSeparator", function() {
            return {
                restrict: 'C',
                replace : true,
                require : '^pocketBar',
                link    : function(scope, element, attrs, pocketBar) {
                    var getHeight = function() {
                        var value;

                        if (typeof scope.pocket.share !== 'undefined') {
                            value = (scope.total / 100) * scope.pocket.share;
                        } else if (typeof scope.pocket.amount !== 'undefined') {
                            value = (scope.total / 100) * (scope.pocket.amount / scope.total * 100);
                        }

                        if (value < 0) {
                            value = 10;
                        }
                        return value;
                    };

                    if (!pocketBar.fixed) {
                        element.addClass('trigger');
                        element.draggabilly({
                            axis: 'y',
                            containment: element.parent()
                        });
                    }
                }
            }
        });

}(angular.module("pockets")));
