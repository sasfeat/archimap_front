/**
 * Created by alex on 17-6-29.
 */

(function () {
    'use strict';
    angular.module('archimap')
        .component('map', {
            templateUrl:'src/home/map/map.template.html',
            controller:MapController,
            controllerAs:'$ctrl',

        })
    MapController.$inject = ['MapService'];
    function MapController(MapService){
        var $ctrl = this;
        MapService.renderMap()
    }
})();