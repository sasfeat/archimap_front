/**
 * Created by alex on 17-7-10.
 */

(function () {
    angular.module('archimap')
        .component('searchbox', {
            templateUrl:'src/home/searchbox/searchbox.template.html',
            controller:SearchboxController,
            controllerAs:'$ctrl',
            bindings:{
                buildings:'<'
            }

        });
    SearchboxController.$inject = ['$scope'];
    function SearchboxController($scope) {
        var $ctrl = this;

        $ctrl.selectedObject = undefined;
        $ctrl.styles = [{name:'Барокко'},{name:'Роккоко'}];
        $ctrl.archis = [{name:'Тризини'},{name:'Растрелли'}];

        $ctrl.$onInit = function () {
            // $ctrl.objectsToSearch
            console.log($ctrl.buildings);
            $ctrl.filters = [
                {
                    name:"Арх.сооружение",
                    objects:$ctrl.buildings
                },
                {
                    name:'Архитектор',
                    objects:$ctrl.archis
                },
                {
                    name:'Стиль',
                    objects:$ctrl.styles
                }
            ];
            // по умолчанию ищем архитектурное сооружение
            $ctrl.selectedFilter = 'Арх.сооружение';
            $ctrl.objectsToSearch = $ctrl.buildings;

            $ctrl.getObjectsToSearch = function(newFilter){
                $ctrl.selectedFilter = newFilter.name;
                $ctrl.objectsToSearch = newFilter.objects;
            };
        };
        $ctrl.selectBuildings = function ($item, $label) {
            console.log($item, $label);
        }


    }
})();