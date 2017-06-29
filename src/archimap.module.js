/**
 * Created by alex on 17-6-29.
 */

(function(){
    'use strict';
    angular.module('archimap',[
        'ui.router'
    ])
        .config(config)
        .constant('ApiPath', 'http://localhost:5000/api')
        // .run(run)
        .filter('capitalize', function() {
            return function(input) {
                return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            }
        });

    config.$inject = ['$urlRouterProvider'];
    function config($urlRouterProvider) {

        // If user goes to a path that doesn't exist, redirect to public root
        $urlRouterProvider.otherwise('/');
    }
    // run.$inject = ['$transitions','$rootScope'];
    // function run($transitions,$rootScope) {
    //     var toRoute;
    //     $transitions.onSuccess({ }, function($transition$) {
    //         toRoute = $transition$.$to().name.split('.')[1];
    //         console.info('transition to:',toRoute);
    //         if (toRoute){
    //             $rootScope.$broadcast('transition:started',{
    //                 state:toRoute
    //             })
    //         }
    //
    //     });
    // }
})();