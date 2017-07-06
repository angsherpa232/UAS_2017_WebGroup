(function () {
    'use strict';
    function MainCtrl($rootScope, $scope, $timeout) {

        var imageLayer;
        var executed = false;
        $scope.ctrl = new L.LayerGroup();
        var map;
        $scope.my = {slidershow: false};
        $rootScope.sliderheight = 0;
        $scope.numberPoints = 0;

        $scope.onOverlayAdd = function (e) {
            console.log(e);
            if (e.name === "floating experiment") {
                // 1. add all markers
                $scope.loadMarkers();

                // 2. make slider available
                $scope.my.slidershow = true;

                // 3. change size of map
                $rootScope.sliderheight = 60;

                // 4. update window:
                $timeout(function () {
                    window.dispatchEvent(new Event('resize'));
                },
                        200);
            }
        };
        $scope.onOverlayRemove = function (e) {
            console.log(e);
            if (e.name === "floating experiment") {
                // 1. remove all markers
                $scope.unloadMarkers();

                // 2. make slider unavailable
                $scope.my.slidershow = false;

                // 3. change size of map
                $rootScope.sliderheight = 0;

                // 4. update window:
                $timeout(function () {
                    window.dispatchEvent(new Event('resize'));
                },
                        200);
            }
        };

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

            // all available markers
            $scope.markerpts = [
            ];

            $scope.markerpts[0] = new L.marker([51.945125, 7.571998]).bindPopup('Time: 0.5');
            $scope.markerpts[1] = new L.marker([51.945135, 7.572260]).bindPopup('Time: 1.0');
            $scope.markerpts[2] = new L.marker([51.945306, 7.572462]).bindPopup('Time: 1.5');
            $scope.markerpts[3] = new L.marker([51.945321, 7.572707]).bindPopup('Time: 2.0');
            $scope.markerpts[4] = new L.marker([51.945230, 7.572771]).bindPopup('Time: 2.4');
            $scope.markerpts[5] = new L.marker([51.945300, 7.572744]).bindPopup('Time: 2.7');
            $scope.markerpts[6] = new L.marker([51.945180, 7.572772]).bindPopup('Time: 3.6');
            $scope.markerpts[7] = new L.marker([51.945023, 7.572755]).bindPopup('Time: 4.8');
            $scope.numberPoints = $scope.markerpts.length - 1;

            // those markers, being currently on map:
            $scope.addedMarkers = {};
            for (var i = 0; i <= $scope.markerpts.length; i++)
                $scope.addedMarkers[i] = false;

            $scope.slider.value = 0;

            $scope.showMarkers = function () {
                for (var i = 0; i <= $scope.slider.value; i++) {
                    $scope.markerpts[i].addTo(map);
                    $scope.addedMarkers[i] = true;
                }
                for (var i = $scope.slider.value + 1; i <= $scope.markerpts.length; i++) {
                    if ($scope.addedMarkers[i]) {
                        $scope.markerpts[i].remove(map);
                        $scope.addedMarkers[i] = false;
                    }
                }
            };

            $scope.unloadMarkers = function () {
                for (var i = 0; i <= $scope.markerpts.length; i++) {
                    if ($scope.addedMarkers[i])
                        $scope.markerpts[i].remove(map);
                }
                ;
            };
            $scope.loadMarkers = function () {
                for (var i = 0; i <= $scope.markerpts.length; i++) {
                    if ($scope.addedMarkers[i])
                        $scope.markerpts[i].addTo(map);
                }
                ;
            };

            var markersDummyLayer = L.layerGroup([]);

            $scope.overlays = {
                "Mosaic Layer": MosaicLayer,
                "DSM Layer": DSM,
                "floating experiment": markersDummyLayer
            };

            $scope.ctrl = L.control.layers(baseLayers, $scope.overlays).addTo(map);

            $scope.showMarkers();
            $scope.unloadMarkers();

            map.on('overlayadd', $scope.onOverlayAdd);
            map.on('overlayremove', $scope.onOverlayRemove);


        }; //end of createMap Function

        $scope.slider ={value:0};

        $scope.createMap();

        $scope.slider = {
            id: 'slider-id',
            value: 0,
            options: {
                floor: 0,
                ceil: $scope.numberPoints,
                id: 'slider-id',
                onStart: function (id) {
                    console.log('on start ' + id); // logs 'on start slider-id'
                },
                onChange: function (id) {
                    console.log('on change ' + id); // logs 'on change slider-id'
                    $scope.showMarkers();
                },
                onEnd: function (id) {
                    console.log('on end ' + id); // logs 'on end slider-id'
                }
            }
        };

        $scope.slider.value = 0;

        $scope.zoomRiver = function () {
            map.setView([51.943703, 7.573759], 16);
        };

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
