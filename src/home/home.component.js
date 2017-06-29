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

        });
    HomeController.$inject = [];
    function HomeController() {
        var $ctrl = this;
        console.log('hi');

    }
})();