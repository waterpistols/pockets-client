
(function(app) {
    'use strict';

    app.constant("Config", {
        url: "http://localhost:8100/v1",
        //url: "https://192.168.145.21/v1"
        ionic: {
            // The App ID (from apps.ionic.io) for the server
            app_id: '7fce942c',
            // The public API key all services will use for this app
            api_key: 'fd199eb2e0ef3e898727404bc31fa1f1a9902550bb51e8ea',
            // Set the app to use development pushes
            dev_push: false
        }
    });

    app.constant("Colors", {
       '1': '#8BB943',
       '2': '#DC576B',
       '3': '#299AB1'
    })

}(angular.module("pockets")));
