
(function(app) {
    'use strict';

    app.constant("Config", {
        //url: "http://localhost:8100/v1",
        url: "http://192.168.145.21/v1",
        ionic: {
            // The App ID (from apps.ionic.io) for the server
            app_id: '7fce942c',
            // The public API key all services will use for this app
            api_key: 'fd199eb2e0ef3e898727404bc31fa1f1a9902550bb51e8ea',
            // Set the app to use development pushes
            dev_push: false
        },
        pockets: {
            color: {
                '0': '#8FB9C9',
                '1': '#F6B286',
                '2': '#7293EB',
                '3': '#EE9891',
                '4': '#8BE6AA',
                '5': '#E16437'
           },
           icon: {
               0: "pkt-icon-rent",
               1: "pkt-icon-utilities",
               2: "pkt-icon-groceries",
               3: "pkt-icon-fun",
               4: "pkt-icon-shopping"
           }
        }
    });

    app.constant("Colors", {
        '0': '#8FB9C9',
        '1': '#F6B286',
        '2': '#7293EB',
        '3': '#EE9891',
        '4': '#8BE6AA',
        '5': '#E16437'
    })

}(angular.module("pockets")));
