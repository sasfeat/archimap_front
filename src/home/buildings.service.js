/**
 * Created by alex on 17-6-29.
 */

(function () {
    'use strict';
    angular.module('archimap')
        .service('BuildingsService', BuildingsService);
    BuildingsService.$inject = ['$http', 'ApiPath'];

    function BuildingsService($http, ApiPath){
        var service = this;

        service.getAll = function () {
            return $http({
                type:'GET',
                url:ApiPath + '/build_meta'
            })
        };
        service.getOne = function(id){
            return $http({
                type:'GET',
                url:ApiPath + '/build_meta/'+id
            })
        };
        service.getStyles = function () {
            return $http({
                type:'GET',
                url:ApiPath + '/styles'
            })
        };
        service.getArchis = function () {
            return $http({
                type:'GET',
                url:ApiPath + '/archi'
            })
        }
    }

})();
