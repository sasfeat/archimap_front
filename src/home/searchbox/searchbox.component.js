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
                buildings:'<',
                archis:'<',
                styles:'<'
            }

        });
    SearchboxController.$inject = ['$rootScope'];
    function SearchboxController($rootScope) {
        var $ctrl = this;

        $ctrl.selectedObject = undefined;
        // $ctrl.styles = [{name:'Барокко'},{name:'Роккоко'}];
        // $ctrl.archis = [{name:'Тризини'},{name:'Растрелли'}];

        $ctrl.$onInit = function () {
            // $ctrl.objectsToSearch
            console.log($ctrl.buildings);
            console.log($ctrl.archis);
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
            var buildings = [];
            if ($ctrl.selectedFilter === 'Арх.сооружение'){
                buildings = [$item]
            }else if ($ctrl.selectedFilter === 'Стиль'){
                _.forEach($ctrl.buildings, function (build) {

                    var styles = _.filter(build.build_styles, function (style) {
                        return style.id === $item.id;
                    });
                    if (styles.length) {
                        buildings.push(build);
                    }
                })
            }else if ($ctrl.selectedFilter === 'Архитектор'){

                _.forEach($ctrl.buildings, function (build) {

                    var archis = _.filter(build.build_archi, function (archi) {
                        return archi.id === $item.id;
                    });
                    if (archis.length) {
                        buildings.push(build);
                    }
                })
            }
            $rootScope.$broadcast('buildings:updateSelection',{
                buildings:buildings
            });

        }


    }
})();