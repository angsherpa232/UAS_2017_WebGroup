(function () {
    'use strict';

    function MainCtrl($rootScope, $scope, $timeout, $compile) {

        var imageLayer;
        var executed = false;
        $scope.ctrl = new L.LayerGroup();
        var map;
        $scope.my = {slidershow: false};
        $rootScope.sliderheight = 0;
        $scope.numberPoints = 0;

        $scope.createMap = function () {

            var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

            var grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr, maxZoom: 22, maxNativeZoom: 18}),
                    streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr, maxZoom: 22, maxNativeZoom: 18}),
                    outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors', attribution: mbAttr, maxZoom: 22, maxNativeZoom: 18}),
                    satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr, maxZoom: 22, maxNativeZoom: 18}),
                    dark = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr, maxZoom: 22, maxNativeZoom: 18}),
                    light = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr, maxZoom: 22, maxNativeZoom: 18}),
                    satellitestreets = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', attribution: mbAttr, maxZoom: 22, maxNativeZoom: 18});


            map = L.map('mapid', {
                center: [51.943703, 7.573759], /*Default location */
                zoom: 16, /*Default Zoom, Higher = Closer) */
                layers: [satellite], // Default basemaplayer on startrup, can also give another layer here to show by default)
                maxZoom: 22,
                maxNativeZoom: 18
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
                zIndex: 200,
                maxZoom: 22,
                maxNativeZoom: 18
            });

            var DSM = L.esri.tiledMapLayer({
                url: "http://tiles.arcgis.com/tiles/W47q82gM5Y2xNen1/arcgis/rest/services/River_Aa_DSM/MapServer",
                zIndex: 200,
                maxZoom: 22,
                maxNativeZoom: 18
            }).addTo(map);


            /*DEM Legend*/
            var legendDEM = L.control({position: 'bottomright'});
            legendDEM.onAdd = function () {
                var div = L.DomUtil.create('DEM', 'DEM-legend');

                div.innerHTML = '<b>DEM Scale</b> <br>';
                var valuesTable = '<div class="">';
                valuesTable += '<table style=\"width: 100%;\">';
                valuesTable += '<tr>';
                valuesTable += '<td style=\"text-align: left;\">';
                valuesTable += '<span>0</span>';
                valuesTable += '</td>';
                valuesTable += '<td style=\"text-align: right;\">';
                valuesTable += '<span>17</span>';
                valuesTable += '</td>';
                valuesTable += '</tr>';
                valuesTable += '</table>';
                valuesTable += '</div>';

                div.innerHTML += valuesTable;
                div.innerHTML += '<div class="dem-rainbow"></div>';


                return div;
            };
            legendDEM.addTo(map); //Added by default
            /*End DEM Legend*/

            /*Zoom button*/
            var legendCenterButton = L.control({position: 'bottomright'});
            legendCenterButton.onAdd = function () {
                var div = L.DomUtil.create('center', 'center-button');

                var zooming = '<span ng-click="zoomRiver()">';
                zooming += '<img style="width: 24px; height: 24px;" src="app/components/assets/button_icons/meeting-point-32.png"/>';
                zooming += '</span>';
                div.innerHTML = zooming;

                var linkFunction = $compile(angular.element(div));
                var newScope = $scope.$new();

                return linkFunction(newScope)[0];
            };
            legendCenterButton.addTo(map); //Added by default
            /*End Zoom button*/

            // all available markers
            $scope.markerpts = [
                [], //straight 1
                [], //straight 2
                [] // straight 3
            ];

            // set of markers of current selected floating experiment
            $scope.selectedMarkers = [

            ];

            // load csv data for floating pts:
            $scope.dataAll = [];
            $scope.data;
            $scope.markerdata = [];
            $.ajax({
                url: "app/components/assets/floating/straight1.csv",
                async: false,
                success: function (csvd) {
                    $scope.data = $.csv.toArrays(csvd);
                },
                dataType: "text",
                complete: function () {
                    // call a function on complete 
                    for (var i = 0; i < $scope.data.length; i++) {
                        var partsOfStr = $scope.data[i][0].split(';');
                        var obj = {
                            lng: partsOfStr[0],
                            lat: partsOfStr[1],
                            time: partsOfStr[2],
                        };
                        $scope.markerdata.push(obj);
                        $scope.markerpts[0][i] = new L.marker(
                                [obj.lng, obj.lat]
                                ).bindPopup('Time: ' + obj.time);
                    }
                    $scope.dataAll.push($scope.markerdata);
                    $scope.markerdata = [];
                    $.ajax({
                        url: "app/components/assets/floating/straight2.csv",
                        async: false,
                        success: function (csvd) {
                            $scope.data = $.csv.toArrays(csvd);
                        },
                        dataType: "text",
                        complete: function () {
                            // call a function on complete 
                            for (var i = 0; i < $scope.data.length; i++) {
                                var partsOfStr = $scope.data[i][0].split(';');
                                var obj = {
                                    lng: partsOfStr[0],
                                    lat: partsOfStr[1],
                                    time: partsOfStr[2],
                                };
                                $scope.markerdata.push(obj);
                                $scope.markerpts[1][i] = new L.marker(
                                        [obj.lng, obj.lat]
                                        ).bindPopup('Time: ' + obj.time);
                            }
                            $scope.dataAll.push($scope.markerdata);
                            $scope.markerdata = [];
                            $.ajax({
                                url: "app/components/assets/floating/straight3.csv",
                                async: false,
                                success: function (csvd) {
                                    $scope.data = $.csv.toArrays(csvd);
                                },
                                dataType: "text",
                                complete: function () {
                                    // call a function on complete 
                                    for (var i = 0; i < $scope.data.length; i++) {
                                        var partsOfStr = $scope.data[i][0].split(';');
                                        var obj = {
                                            lng: partsOfStr[0],
                                            lat: partsOfStr[1],
                                            time: partsOfStr[2],
                                        };
                                        $scope.markerdata.push(obj);
                                        $scope.markerpts[2][i] = new L.marker(
                                                [obj.lng, obj.lat]
                                                ).bindPopup('Time: ' + obj.time);
                                    }
                                    $scope.dataAll.push($scope.markerdata);
                                    $scope.markerdata = [];
                                }
                            });
                        }
                    });
                }
            });

            $scope.numberPoints = $scope.markerpts[$scope.selectedFloatingData].length - 1;

            // those markers, being currently on map:
            $scope.addedMarkers = {};
            for (var i = 0; i <= $scope.markerpts[$scope.selectedFloatingData].length; i++)
                $scope.addedMarkers[i] = false;

            $scope.slider.value = 0;

            $scope.showMarkers = function () {
                var i = $scope.slider.value;
                // add current marker:
                $scope.markerpts[$scope.selectedFloatingData][i].addTo(map);
                $scope.addedMarkers[i] = true;
                // remove previous marker:
                for (var j = 0; j < i; j++)
                    if ($scope.addedMarkers[j]) {
                        $scope.markerpts[$scope.selectedFloatingData][j].remove(map);
                        $scope.addedMarkers[j] = false;
                    }
                for (var j = i + 1; j <= $scope.numberPoints; j++)
                    if ($scope.addedMarkers[j]) {
                        $scope.markerpts[$scope.selectedFloatingData][j].remove(map);
                        $scope.addedMarkers[j] = false;
                    }
            };

            $scope.unloadMarkers = function () {
                for (var i = 0; i <= $scope.markerpts[$scope.selectedFloatingData].length; i++) {
                    if ($scope.addedMarkers[i])
                        $scope.markerpts[$scope.selectedFloatingData][i].remove(map);
                }
                ;
            };
            $scope.loadMarkers = function () {
                for (var i = 0; i <= $scope.markerpts[$scope.selectedFloatingData].length; i++) {
                    if ($scope.addedMarkers[i])
                        $scope.markerpts[$scope.selectedFloatingData][i].addTo(map);
                }
                ;
            };

            var markersDummyLayer = L.layerGroup([]);

            $scope.overlays = {
                "Mosaic Layer": MosaicLayer,
                "DSM Layer": DSM,
                "Floating Points": markersDummyLayer
            };

            $scope.ctrl = L.control.layers(baseLayers, $scope.overlays).addTo(map);

            $scope.showMarkers();
            $scope.unloadMarkers();

            $scope.onOverlayAdd = function (e) {
                console.log(e);
                if (e.name === 'DSM Layer') {
                    map.removeControl(legendDEM);
                    legendDEM.addTo(map);
                }
                if (e.name === "Floating Points") {
                    // 1. add all markers
                    $scope.loadMarkers();

                    // 2. make slider available
                    $scope.my.slidershow = true;

                    // 3. change size of map
                    $rootScope.sliderheight = 60;

                    // 4. change viewport to current selected Experiment
                    $scope.playPressed = false;
                    // 1. unload previous markers
                    for (var i = 0; i <= $scope.markerpts[$scope.previousSelectedFloatingData].length; i++) {
                        if ($scope.addedMarkers[i]) {
                            $scope.markerpts[$scope.previousSelectedFloatingData][i].remove(map);
                            $scope.addedMarkers[i] = false;
                        }
                    }
                    // 2. load current markers
                    $scope.addedMarkers[0] = true; // run from start
                    for (var i = 0; i <= $scope.markerpts[$scope.selectedFloatingData].length; i++) {
                        if ($scope.addedMarkers[i]) {
                            $scope.markerpts[$scope.selectedFloatingData][i].addTo(map);
                        }
                    }
                    // 3. reload slider data
                    $scope.slider.value = 0;
                    // 4. zoom to map excerpt of selected experiment:
                    map.setView($scope.centerExperiments[$scope.selectedFloatingData], 21);

                    $timeout(function () {
                        window.dispatchEvent(new Event('resize'));
                    },
                            200);

                    $scope.previousSelectedFloatingData = $scope.selectedFloatingData;

                }
                map.removeControl(legendCenterButton);
                legendCenterButton.addTo(map);
                // 4. update window:
                $timeout(function () {
                    window.dispatchEvent(new Event('resize'));
                },
                        200);

            };
            $scope.onOverlayRemove = function (e) {
                console.log(e);
                if (e.name === "Floating Points") {
                    // 1. remove all markers
                    $scope.unloadMarkers();

                    // 2. make slider unavailable
                    $scope.my.slidershow = false;

                    // 3. change size of map
                    $rootScope.sliderheight = 0;


                }
                if (e.name === 'DSM Layer') {
                    map.removeControl(legendDEM);
                }

                map.removeControl(legendCenterButton);
                legendCenterButton.addTo(map);
                // 4. update window:
                $timeout(function () {
                    window.dispatchEvent(new Event('resize'));
                },
                        200);
            };

            map.on('overlayadd', $scope.onOverlayAdd);
            map.on('overlayremove', $scope.onOverlayRemove);

        }; //end of createMap Function

        function forwardSlider() {
            setTimeout(function () {
                var current = $scope.slider.value + 1;
                // recursion end?
                if ($scope.playPressed & (current < $scope.markerpts[$scope.selectedFloatingData].length)) {
                    // go next marker
                    $scope.slider.value = current;
                    $scope.markerpts[$scope.selectedFloatingData][current].addTo(map);
                    $scope.addedMarkers[current] = true;
                    // remove previous marker
                    $scope.markerpts[$scope.selectedFloatingData][current - 1].remove(map);
                    $scope.addedMarkers[current - 1] = false;
                    // recursive op:
                    forwardSlider();
                } else {
                    $scope.playPressed = false;
                }
                // update selection in slider:
                window.dispatchEvent(new Event('resize'));
            }, 20 * $scope.videoSpeed);// milliseconds timeout before show next:
        }

        $scope.playPressed = false;
        $scope.videoSpeed = 1;

        $scope.playSlider = function () {
            $scope.playPressed = !$scope.playPressed;
            if ($scope.playPressed) {
                if ($scope.slider.value >= $scope.numberPoints) {
                    $scope.slider.value = 0;
                    // undo markers:
                    for (var i = 1; i <= $scope.markerpts[$scope.selectedFloatingData].length; i++)
                        if ($scope.addedMarkers[i]) {
                            $scope.addedMarkers[i] = false;
                            $scope.markerpts[$scope.selectedFloatingData][i].remove(map);
                        }
                }
                forwardSlider();
            }
        };

        $scope.previousSelectedFloatingData = 0;
        $scope.selectedFloatingData = 0;
        $scope.centerExperiments = [
            [51.944671, 7.573111],
            [51.944698, 7.573128],
            [51.944716, 7.573150]
        ];
        $scope.vidDataChanged = function () {
            console.log($scope.selectedFloatingData);
            if ($scope.previousSelectedFloatingData !== $scope.selectedFloatingData) {
                $scope.playPressed = false;
                // 1. unload previous markers
                for (var i = 0; i <= $scope.markerpts[$scope.previousSelectedFloatingData].length; i++) {
                    if ($scope.addedMarkers[i]) {
                        $scope.markerpts[$scope.previousSelectedFloatingData][i].remove(map);
                        $scope.addedMarkers[i] = false;
                    }
                }
                // 2. load current markers
                $scope.addedMarkers[0] = true; // run from start
                for (var i = 0; i <= $scope.markerpts[$scope.selectedFloatingData].length; i++) {
                    if ($scope.addedMarkers[i]) {
                        $scope.markerpts[$scope.selectedFloatingData][i].addTo(map);
                    }
                }
                // 3. reload slider data
                $scope.slider.value = 0;
                // 4. zoom to map excerpt of selected experiment:
                map.setView($scope.centerExperiments[$scope.selectedFloatingData], 21);

                $timeout(function () {
                    window.dispatchEvent(new Event('resize'));
                },
                        200);

                $scope.previousSelectedFloatingData = $scope.selectedFloatingData;
            }
        };

        $scope.slider = {value: 0};

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
