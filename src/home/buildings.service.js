/**
 * Created by alex on 17-6-29.
 */

(function () {
    'use strict';
    angular.module('archimap')
        .service('BuildingsService', BuildingsService);
    BuildingsService.$inject = ['$http', 'ApiPath_local'];

    function BuildingsService($http, ApiPath_local){
        var service = this;

        service.getAll = function () {
            return $http({
                type:'GET',
                url:ApiPath_local + '/build_meta'
            })
        }
    }

})();