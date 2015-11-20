(function(app) {
    'use strict';

    app.directive("pocketBar",
        function() {
            return {
                restrict   : 'E',
                transclude : true,
                replace    : true,
                templateUrl: 'js/settings/directives/pocketBar.html',
                scope      : {
                    total  : '=',
                    pockets: '=',
                    onMoved: '='
                },
                controller : function() {

                },
                link       : function(scope, element, attrs, controller) {
                    if (attrs.fixed === '') {
                        controller.fixed = true;
                    }
                    if (attrs.zoomed === '') {
                        controller.zoomed = true;
                    }
                    controller.scope = scope;
                }
            }
        })
        .directive("pocketBarFree", function($timeout) {
            return {
                restrict: 'C',
                link: function(scope, element, attrs) {
                    var parent      = element.parent();
                    scope.height = 0;

                    var getHighestPosition = function() {
                        var siblings = element.siblings();
                        var max = 5000;
                        siblings.each(function() {
                            var top = $(this).position().top;
                            if (top < max) {
                                max = top;
                            }
                        });
                        return max;
                    };
                    $timeout(function() {
                        var height = getHighestPosition();

                        element.height(height);
                    });
                }
            };
        })
        .directive("pocketBarSeparator", function($timeout) {
            return {
                restrict: 'C',
                replace : true,
                require : '^pocketBar',

                link    : function(scope, element, attrs, pocketBar) {
                    var parent      = element.parent();
                    var getPosition = function(pocket) {
                        var value;



                        if (typeof pocket.share !== 'undefined') {
                            value = (1 - pocket.share);
                        } else if (typeof pocket.amount !== 'undefined') {
                            value = (1 - pocket.amount / scope.total);
                        }

                        if (value < 0) {
                            value = 10;
                        }
                        return value;
                    };

                    scope.pocket.position = getPosition(scope.pocket);

                    if (pocketBar.zoomed) {
                        scope.$watch('pocket.position', function(newValue) {
                            console.log(scope.pocket);
                        });
                    }



                    if (!pocketBar.fixed) {
                        element.addClass('trigger');
                        element.draggabilly({
                            axis       : 'y',
                            containment: parent
                        })
                            .on('dragMove', function(event, pointer, moveVector) {
                                scope.pocket.position = element.position().top;
                                scope.$apply();
                            });
                    }
                    element.css({
                        'top': (scope.pocket.position * 100) + '%',
                    });

                }
            }
        });

}(angular.module("pockets")));