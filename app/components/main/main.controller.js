(function () {
    'use strict';
    function MainCtrl($scope, $timeout, $mdSidenav) {


        var imageLayer;
        var executed = false;
        var ctrl = new L.LayerGroup();
        var map;

        $scope.createMap = function () {

            var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

            var grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
                    streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr}),
                    outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors', attribution: mbAttr}),
                    satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
                    dark = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr}),
                    light = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
                    satellitestreets = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', attribution: mbAttr});

            map = L.map('mapid', {
                center: [51.943703, 7.573759], /*Default location */
                zoom: 16, /*Default Zoom, Higher = Closer) */
                layers: [satellite] // Default basemaplayer on startrup, can also give another layer here to show by default)
            });

            var baseLayers = {
                "Grayscale": grayscale,
                "Streets": streets,
                "Outdoors": outdoors,
                "Satellite": satellite,
                "Satellite Streets": satellitestreets,
                "Dark Map": dark,
                "Light Map": light
            };


            var MosaicLayer = L.esri.tiledMapLayer({
                url: "http://tiles.arcgis.com/tiles/W47q82gM5Y2xNen1/arcgis/rest/services/River_Aa_orthophoto/MapServer",
                zIndex: 200
            }).addTo(map);

            var DSM = L.esri.tiledMapLayer({
                url: "http://tiles.arcgis.com/tiles/W47q82gM5Y2xNen1/arcgis/rest/services/River_Aa_DSM/MapServer",
                zIndex: 200
            }).addTo(map);

//592111	2327493
//554271	2450917
//607836	8283419
//605632	7560675
//599842	5691754
//610445	5316151
//530263	7777930
//605673	5784182
//664177	7750054

            $scope.points = [
                L.marker([51.945125, 7.571998]).bindPopup('Time: 0.5'),
                L.marker([51.945135, 7.572260]).bindPopup('Time: 1.0'),
                L.marker([51.945306, 7.572462]).bindPopup('Time: 1.5'),
                L.marker([51.945230, 7.572771]).bindPopup('Time: 2.0')
            ];
            
            var markers = L.layerGroup($scope.points);

            var overlays = {
                "Mosaic Layer": MosaicLayer,
                "DSM Layer": DSM,
                markers
            };

            ctrl = L.control.layers(baseLayers, overlays).addTo(map);

        }; //end of createMap Function

        $scope.createMap();

        $scope.zoomRiver = function () {
            map.setView([51.943703, 7.573759], 16);
        };

        $scope.slider = {
            value: 0,
            options: {
                floor: 0,
                ceil: 3
                
            }
        };

        $scope.sliderheight = 60;

        $timeout(function () {
            window.dispatchEvent(new Event('resize'));
        },
                200);
    }
    ;
    angular.module('UASWebApp')
            .controller('MainCtrl', MainCtrl)
            ;
})();
