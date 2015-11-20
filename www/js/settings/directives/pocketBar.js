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
        .filter('percentShow', function() {

            return function(input) {
                if (typeof input === 'undefined') {
                    return '';
                }
                return (input * 100).toFixed(0) + '%';
            };
        })
        .directive("pocketBarFree", function($timeout) {
            return {
                restrict: 'C',
                link: function(scope, element, attrs) {
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
        .directive("pocketBarSeparator", function($rootScope) {
            Draggabilly.prototype.containDrag = function( axis, drag, grid ) {
                return drag;
                console.log('aaa');
            };

            return {
                restrict: 'C',
                replace : true,
                require : '^pocketBar',

                link    : function(scope, element, attrs, pocketBar) {
                    var parent      = element.parent();

                    scope.pocket.realShare = scope.pocket.percent;

                    var getSiblingsShare = function() {
                        var total = 0;


                        if (!scope.pockets[scope.$index + 1]) {
                            return 0;
                        }

                        for (var i = scope.$index + 1; i < scope.pockets.length; i++) {
                            total += scope.pockets[i].percent;
                        }


                        return total;
                    };
                    var getPosition = function(pocket) {
                        var value;

                        if (pocket.category === 'Percentage') {
                            value = (1 - pocket.percent - getSiblingsShare());
                        } else {
                            value = (1 - pocket.amount / scope.total);
                        }

                        if (value < 0) {
                            value = 0;
                        }
                        return value;
                    };

                    var updateRealShare = function() {
                        scope.pocket.position = element.position().top;
                        scope.pocket.percent = 1 - scope.pocket.position / parent.height() - getSiblingsShare();
                        scope.pocket.percent = Math.round(scope.pocket.percent * 100) / 100;
                        scope.$apply();
                    };
                    scope.pocket.position = getPosition(scope.pocket);



                    if (pocketBar.zoomed) {
                        scope.$watch('pocket.percent', function(newValue) {

                            element.css({
                                'top': getPosition(scope.pocket) * 100 + '%'
                            });
                        });
                    }



                    if (!pocketBar.fixed) {
                        element.addClass('trigger');
                        element.draggabilly({
                            axis       : 'y',
                            containment: parent
                        })

                            .on('dragMove', function(event, pointer, moveVector) {
                                $rootScope.$broadcast('updateShare');
                            })
                            .on('dragEnd', function() {
                                pocketBar.scope.onMoved();
                            });
                    }
                    element.css({
                        'top': (scope.pocket.position) * parent.height() + 'px'
                    });


                    scope.$on('updateShare', updateRealShare);

                }
            }
        });

}(angular.module("pockets")));
