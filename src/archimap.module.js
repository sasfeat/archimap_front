/**
 * Created by alex on 17-6-29.
 */

(function(){
    'use strict';
    var app = angular.module('archimap',[
        'ui.router',
        'ui.bootstrap',
        'thatisuday.ng-image-gallery'
    ])
        .config(config);

    var host = window.location.hostname;
    var apipath;
    if (host === 'localhost'){
        apipath = '//localhost:5000/api'
    }else if (host === 'sasfeat.github.io'){
        apipath = '//archimap.herokuapp.com/api'
    }else{
        throw 'unknown api host'
    }
    app.constant('ApiPath', apipath);

    config.$inject = ['$urlRouterProvider'];
    function config($urlRouterProvider) {
        // If user goes to a path that doesn't exist, redirect to public root
        $urlRouterProvider.otherwise('/');
    }

})();