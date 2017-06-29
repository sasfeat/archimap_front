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
            bindings:{
                buildings:'<'
            }

        });
    MapController.$inject = ['MapService'];
    function MapController(MapService){
        var $ctrl = this;
        $ctrl.$onInit = function () {
            var map = MapService.renderMap();
            map.addMarkers($ctrl.buildings);
        }

    }
})();