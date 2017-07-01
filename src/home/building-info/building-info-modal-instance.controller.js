/**
 * Created by alex on 17-7-1.
 */


(function () {
    'use strict';
    angular.module('archimap')
        .controller('BuildingInfoModalInstanceController',BuildingInfoModalInstanceController);

    BuildingInfoModalInstanceController.$inject = ['$uibModalInstance','$scope','$state'];
    function BuildingInfoModalInstanceController($uibModalInstance,$scope,$state){
        var $ctrl = this;
        $ctrl.$onInit = function(){
            $ctrl.building = $scope.$resolve.building;
            $ctrl.building.build_history = _.orderBy($ctrl.building.build_history, function(item){
                return item.year
            },['desc']);
        };
        $ctrl.close = function () {
            $uibModalInstance.close(false);
        };
        $uibModalInstance.result.then(function() {
            $state.go('^')
        }, function() {
            console.log('Modal closing error')
        });

    }
})();