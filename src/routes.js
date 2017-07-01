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
            .state('home.buildingInfo',{
                url:'building/{id}',
                // params:{
                //     building:null
                // },


                onEnter: ['$uibModal','$stateParams', function($uibModal,$stateParams) {
                    var id = $stateParams.id;
                    $uibModal.open({
                        templateUrl: "src/home/building-info/building-info-modal.template.html",
                        controller: 'BuildingInfoModalInstanceController',
                        controllerAs: '$ctrl',
                        ariaLabelledBy:'modal-title',
                        ariaDescribedBy:'modal-body',
                        size:'lg',
                        backdrop: 'static',
                        // scope:$scope
                        resolve:{
                            building:['BuildingsService', function(BuildingsService){
                                return BuildingsService.getOne(id).then(function(response){
                                    console.log('Building get success', response.data);
                                    return response.data
                                }, function (response) {
                                    console.log('Building get error', response.data);
                                })
                            }]
                        }
                    })
                }]
            })
    }

})();
