
(function(app) {
    'use strict';

    app.constant("Config", {
        url: "http://localhost:8100/v1",
        //url: "https://pockets-server.herokuapp.com/v1"
        ionic: {
            // The App ID (from apps.ionic.io) for the server
            app_id: '7fce942c',
            // The public API key all services will use for this app
            api_key: 'fd199eb2e0ef3e898727404bc31fa1f1a9902550bb51e8ea',
            // Set the app to use development pushes
            dev_push: false
        }
    });

}(angular.module("pockets")));
