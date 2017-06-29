/**
 * Created by alex on 17-6-29.
 */

(function () {
    'use strict';
    angular.module('archimap')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                component:'home',
                resolve:{
                    buildings:['BuildingsService', function(BuildingsService){
                        return BuildingsService.getAll().then(function(response){
                            console.log('Buildings success', response.data);
                            return response.data
                        }, function (response) {
                            console.log('Buildings error', response.data);
                        })
                    }]
                }
            })
    }

})();
