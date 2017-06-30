/**
 * Created by alex on 17-6-29.
 */

(function () {
    'use strict';
    angular.module('archimap')
        .service('MapService', MapService);

    function MapService(){
        var service = this;
        service.renderMap = function(){
            var mapBoxAttribution = 'Map data &copy;<a href="http://osm.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery &copy <a href="http://mapbox.com">Mapbox</a>,' +
                'Countries &copy; <a href="http://naturalearthdata.com/">NaturalEarth</a>';

            var mapboxToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
            var mapboxBL = L.tileLayer(
                'http://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token='+mapboxToken
                ,{
                    maxZoom: 18,
                    minZoom:2,
                    attribution: mapBoxAttribution
                });
            var osmBL = L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                    maxZoom: 18,
                    minZoom:2,
                    // attribution:mapBoxAttribution
                }
            );
            var sputnikBL = L.tileLayer(
                'http://tiles.maps.sputnik.ru/tiles/kmt2/{z}/{x}/{y}.png',{
                    maxZoom: 19,
                    minZoom:2,
                    // attribution:mapBoxAttribution
                }
            )
            var center = L.latLng(30,0);
            var map = L.map('map',{
                center:center,
                zoom:3,
                layers:[sputnikBL]
            });
            function addMarkers(buildings){
                var markers = [];
                _.forEach(buildings, function (building) {
                    var marker = L.marker(new L.latLng(building.lat,building.lon));

                    var photos = building.photo.split(';');
                    if (photos.length>0){
                        // assume that main photo is the first one
                        var main_photo_url = photos[0]
                    }

                    marker.bindPopup(
                        '<a ui-sref="home.building_info"><h4>' + building.name +
                        '</h4></a><img class="popup_photos" src=' + main_photo_url+ '>'
                    );

                    markers.push(marker);
                });
                map.addLayer(L.layerGroup(markers));
            }
            return {
                addMarkers: function (buildings) {
                    addMarkers(buildings)
                }
            }
        }



    }
})();