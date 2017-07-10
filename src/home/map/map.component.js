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
    MapController.$inject = ['MapService','$rootScope'];
    function MapController(MapService,$rootScope){
        var $ctrl = this;
        var listeners = [];
        $ctrl.$onInit = function () {
            var map = MapService.renderMap();
            map.addMarkers($ctrl.buildings);
            $rootScope.$on('buildings:updateSelection', function (e,data) {
                console.log(data.buildings);
                var buildingsIds = _.map(data.buildings, 'id');
                map.updateSelection(buildingsIds);
            })
        };


    }
})();