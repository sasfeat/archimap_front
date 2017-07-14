/**
 * Created by alex on 17-7-12.
 */


(function () {
    'use strict';
    angular.module('archimap')
        .component('newBuilding',{
            templateUrl:'src/home/new-building/new-building.template.html',
            controller:NewBuildingController,
            controllerAs:'$ctrl',
            bindings:{
                buildings:"<",
                archis:"<",
                styles:"<"
            }
        })
        .controller('NewBuildingModalInstanceController',NewBuildingModalInstanceController);
    NewBuildingController.$inject = ['$uibModal'];
    function NewBuildingController($uibModal){
        var $ctrl = this;
        $ctrl.openNewBuildingForm = function(){
            $uibModal.open({
                templateUrl: "src/home/new-building/new-building-modal.template.html",
                controller: 'NewBuildingModalInstanceController',
                controllerAs: '$ctrl',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                size: 'lg',
                backdrop: 'static',
                resolve:{
                    archis:function(){
                        return $ctrl.archis
                    },
                    styles:function () {
                        return $ctrl.styles
                    },
                    buildings:function () {
                        return $ctrl.buildings
                    }
                }
            });

        };

    }
    NewBuildingModalInstanceController.$inject = ['$uibModalInstance','archis','styles','buildings'];
    function NewBuildingModalInstanceController($uibModalInstance,archis,styles,buildings) {
        var $ctrl = this;
        $ctrl.json = {
            name:undefined,
            link:undefined,
            lat:undefined,
            lon:undefined,
            photos:[],
            archis:[],
            newArchis:[],
            styles:[],
            newStyles:[],

            history:{
                year_from:undefined,
                year_to:9999,
                events:[]
            }
        };


        $ctrl.data = {
            archi:{
                all:[],
                current:""
            },
            photo:{
                all:[],
                current:""
            },
            style:{
                all:[],
                current:""
            },
            events:{
                all:[],
                current:{
                    name:"",
                    year:"",
                    yearAcc:0
                }
            }
        };


        $ctrl.methods = {};
        $ctrl.close = function () {
            $uibModalInstance.close(false);
        };
        $ctrl.archi = "";
        $ctrl.photo = "";
        $ctrl.styles = "";

        $ctrl.noArchi = "";
        $ctrl.newArchi= {
            id:-1,
            first_name:"",
            second_name:"",
            link:""
        };

        $ctrl.history = {
            yearFrom:undefined,
            yearFromAcc:0,
            yearTo:undefined,
            yearToAcc:0,
            existsNow:true
        };

        $ctrl.noStyle = "";
        $ctrl.addNew = function (name) {
            if (name ==='archi') {
                if (!_.isEmpty($ctrl.data.archi.current)) {
                    console.log($ctrl.data.archi.current);
                    if (!$ctrl.noArchi){
                        $ctrl.data.archi.all.push($ctrl.data.archi.current);
                    }else{
                        //todo: проверка что все поля заполнены
                        $ctrl.newArchi.name = $ctrl.newArchi.first_name + ' ' + $ctrl.newArchi.second_name; //todo: та же функция в home.components
                        $ctrl.data.archi.all.push($ctrl.newArchi);
                        $ctrl.newArchi= {
                            id:-1,
                            first_name:"",
                            second_name:"",
                            link:""
                        };
                        $ctrl.noArchi = "";
                    }

                    $ctrl.data[name].current = "";

                }
            }else if (name === 'photo'){
                if ($ctrl.data.photo.current.length) {
                    //todo: проверить есть ли в массиве такие же
                    $ctrl.data.photo.all.push({
                        id:$ctrl.data.photo.all.length,
                        url:$ctrl.data.photo.current,
                        deletable:true
                    });

                    $ctrl.data[name].current = "";
                }

            }else if (name ==='style'){
                if (!_.isEmpty($ctrl.data.style.current)){
                    console.log($ctrl.data.style.current);
                    if (!$ctrl.noStyle){
                        $ctrl.data.style.all.push($ctrl.data.style.current);
                    }else{
                        $ctrl.data.style.all.push({
                            id:-1,
                            name:$ctrl.data.style.current
                        });
                        $ctrl.noStyle = "";
                    }

                    $ctrl.data[name].current = "";
                }
            }else if (name === 'events'){
                if ($ctrl.data.events.current.name.length && $ctrl.data.events.current.year) {
                    $ctrl.data.events.all.push($ctrl.data.events.current);
                    $ctrl.data.events.current = {
                        name:"",
                        year:"",
                        yearAcc:""
                    }
                }
            }

        };
        $ctrl.removeValue = function (name,$index) {
            if (name ==='photo'){
                $ctrl.methods.close();
            }
            $ctrl.data[name].all.splice($index,1);
        };

        $ctrl.$onInit = function () {
            $ctrl.buildings = buildings;
            $ctrl.styles = styles;
            $ctrl.archis = archis;
        };

        $ctrl.submit = function () {
             $ctrl.json.photos = _.map($ctrl.data.photo.all, 'url');
            _.forEach($ctrl.data.archi.all, function (archi) {
                if (archi.id === -1){
                    $ctrl.json.newArchis.push(archi);
                }else{
                    $ctrl.json.archis.push(archi.id)
                }
            });
            _.forEach($ctrl.data.style.all, function (style) {
                if (style.id === -1){
                    $ctrl.json.newStyles.push(style);
                }else{
                    $ctrl.json.styles.push(style.id)
                }
            });
            console.log($ctrl.json);
        }

    }

})();
