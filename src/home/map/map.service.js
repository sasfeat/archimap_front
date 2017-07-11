/**
 * Created by alex on 17-6-29.
 */

(function () {
    'use strict';
    angular.module('archimap')
        .service('MapService', MapService);
    MapService.$inject = ['$state'];
    function MapService($state){
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
                    attribution:'<a href="http://maps.sputnik.ru/">Спутник</a> | &copy; Ростелеком | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }
            );
            var center = L.latLng(30,0);
            var map = L.map('map',{
                center:center,
                zoom:3,
                layers:[sputnikBL],
                zoomControl:false
            });
            L.control.zoom({
                position:'topright'
            }).addTo(map);

            var markers = [];
            var colors = {
                selected:'red',
                unselected: 'grey'
            };
            var initialBounds = map.getBounds();
            function addMarkers(buildings){

                _.forEach(buildings, function (building) {
                    // var marker = L.marker(new L.latLng(building.lat,building.lon));
                    var marker = L.circleMarker(new L.latLng(building.lat,building.lon), {
                        radius:5,
                        // title:inst.name,
                        id:building.id,
                        color:colors.selected,
                        fillColor:colors.selected,
                        fillOpacity:'0.8'
                    });

                    var photos = building.photo.split(';');
                    if (photos.length>0){
                        // assume that main photo is the first one
                        var mainPhotoUrl = photos[0]
                    }
                    var container = $('<div />');
                    container.on('click', '.buildDescription', function() {
                        $state.go('home.buildingInfo',{"id":building.id, "building":building});
                    });

                    container.html("<a class='buildDescription'><h4>" + building.name +"</h4></a>")
                    container.append("<img class='popupPhotos' src=" + mainPhotoUrl+ ">");

                    marker.bindPopup(container[0]);

                    markers.push(marker);
                });
                map.addLayer(L.layerGroup(markers));
            }


            function updateSelection(markersIds) {
                /*
                 change color of selected markers
                 */
                var selected = [];

                if (markersIds.length) {
                    _.forEach(markers, function (marker) {

                        if (markersIds.includes(marker.options.id)) {
                            console.log("selected inst on map", marker);
                            selected.push(marker);
                            marker.setStyle({
                                color: colors.selected,
                                fillColor: colors.selected
                            });
                        } else {
                            marker.setStyle({
                                color: colors.unselected,
                                fillColor: colors.unselected
                            });
                        }
                    });
                }else {
                    _.forEach(markers, function (marker) {
                        marker.setStyle({
                            color: colors.selected,
                            fillColor: colors.selected
                        });
                    });
                }
                if (selected.length!==0){
                    zoomToMarkers(selected);
                }else{
                    map.fitBounds(initialBounds)
                }
            }

            function zoomToMarkers(markers) {
                var latlngs = [];
                console.log(markers);
                _.forEach(markers,function(marker){
                    latlngs.push(marker._latlng);
                });
                var bounds = new L.latLngBounds(latlngs);
                map.fitBounds(bounds);
            }


            return {
                addMarkers: function (buildings) {
                    addMarkers(buildings)
                },
                updateSelection: function (markersIds) {
                    updateSelection(markersIds);
                }
            }
        }



    }
})();