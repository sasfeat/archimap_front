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
            console.log(ApiPath);
            return $http({
                type:'GET',
                url:ApiPath + '/build_meta'
            })
        }
    }

})();