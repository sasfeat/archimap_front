/**
 * Created by alex on 17-6-29.
 */

(function(){
    'use strict';
    angular.module('archimap',[
        'ui.router'
    ])
        .config(config)
        .constant('ApiPath_local', 'http://localhost:5000/api')
        .constant('ApiPath_heroku', 'http://archimap.herokuapp.com/api');
    config.$inject = ['$urlRouterProvider'];
    function config($urlRouterProvider) {
        // If user goes to a path that doesn't exist, redirect to public root
        $urlRouterProvider.otherwise('/');
    }

})();