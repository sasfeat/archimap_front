/**
 * Created by alex on 17-6-29.
 */

(function () {
    'use strict';
    angular.module('archimap')
        .component('home',{
            templateUrl:'src/home/home.template.html',
            controller:HomeController,
            controllerAs:'$ctrl',
            bindings:{
                buildings:'<'
            }

        });
    HomeController.$inject = [];
    function HomeController() {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            console.log($ctrl.buildings);
        }
    }
})();