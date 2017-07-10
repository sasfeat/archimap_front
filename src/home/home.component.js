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
                buildings:'<',
                archis:'<',
                styles: '<'
            }

        });
    HomeController.$inject = [];
    function HomeController() {
        var $ctrl = this;
        $ctrl.$onInit = function () {
            console.log($ctrl.buildings);
            //todo: перенести на бэкэнд
            $ctrl.archis = _.map($ctrl.archis, function(archi) {
                return _.extend({}, archi, {name: archi.first_name + ' ' + archi.second_name});
            });
            
        }
    }
})();