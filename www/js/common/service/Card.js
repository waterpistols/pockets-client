(function(app) {
    'use strict';

    app.service('Card', function() {
        this.getCardType = function(pocket) {
            switch (pocket.color) {
                case 0:
                    return "pocket-rent";
                case 1:
                    return "pocket-utilities";
                case 2:
                    return "pocket-groceries";
                case 3:
                    return "pocket-funstuff";
                default:
                    return "pocket-new";
            }
        };

        this.getCardIcon = function(icon) {
            switch (icon) {
                case 0:
                    return "rent";
                case 1:
                    return "utilities";
                case 2:
                    return "groceries";
                case 3:
                    return "funstuff";
                default:
                    return "new";
            }
        };
    });
}(angular.module("pockets")));
