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

        $scope.replaceAll = function (str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        }

        $scope.createMap = function () {

            L.Control.Layers.include({
                getActiveOverlays: function () {

                    // Create array for holding active layers
                    var active = [];
                    var context = this;
                    // Iterate all layers in control
                    context._layers.forEach(function (obj) {

                        // Check if it's an overlay and added to the map
                        if (obj.overlay && context._map.hasLayer(obj.layer)) {

                            // Push layer to active array
                            active.push(obj);
                        }
                    });

                    // Return array
                    return active;
                }
            });

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
            });

            var DSM = L.esri.tiledMapLayer({
                url: "http://tiles.arcgis.com/tiles/W47q82gM5Y2xNen1/arcgis/rest/services/River_Aa_DSM/MapServer",
                zIndex: 200
            }).addTo(map);

            $scope.flightPlanOnEachFeature = function (feature,layer) {
                // console.log(feature.properties.Altitude)
                var popupContent = "Altitude: "+ feature.properties.Altitude;
                layer.bindPopup(popupContent);
            }

            $scope.getColor = function(x) {
                return x < 46     ?    '#ffeda0':
                     x < 48.1     ?   '#feb24c':
                     x < 50.8     ?   '#f03b20':
                                      '#f01010' ;
            };
            $scope.getColors = function() {
                return ['#ffeda0', '#feb24c', '#f03b20', '#f01010'] ;
            };

            var flightPlanLayer = L.esri.featureLayer({
                url: "https://services1.arcgis.com/W47q82gM5Y2xNen1/arcgis/rest/services/FightPath/FeatureServer/1",
                style: function (feature) {
                    return {
                        "color": $scope.getColor(feature.properties.Altitude),
                        "opacity": 1,
                    }
                },
                onEachFeature: $scope.flightPlanOnEachFeature
            });



            var descriptionBox = L.control({position: 'bottomleft'});
            var legendDEM = L.control({position: 'bottomright'});
            var legendCenterButton = L.control({position: 'bottomright'});
            var flightPlanLegend = L.control({position: 'bottomright'});

            $scope.loadLegends = function() {
                /*Layers Legend*/
                descriptionBox.onAdd = function () {
                    var div = L.DomUtil.create('UAaSLayers', 'layers-description');

                    var overlayLayers = $scope.ctrl.getActiveOverlays();
                    var mosaicDisplayValue = "none";
                    var demDisplayValue = "none";
                    var floatingPointsDisplayValue = "none";
                    var hillshadeDisplayValue = "none";
                    var slopeDisplayValue = "none";
                    var ndviDisplayValue = "none";
                    var flightPlanDisplayValue = "none";

                    for (var overlayId in overlayLayers) {
                        // console.log(overlayLayers[overlayId].name);
                        var layerName = overlayLayers[overlayId].name;
                        if (layerName === 'Mosaic Layer') {
                            mosaicDisplayValue = "";
                        }
                        if (layerName === 'DSM Layer') {
                            demDisplayValue = "";
                        }
                        if (layerName === "Floating Points Layer") {
                            floatingPointsDisplayValue = "";
                        }
                        if (layerName === "Flight Plan Layer") {
                            flightPlanDisplayValue = "";
                        }
                        if (layerName === 'Hillshade Layer') {
                            hillshadeDisplayValue = "";
                        }
                        if (layerName === 'Slope Layer') {
                            slopeDisplayValue = "";
                        }
                        if (layerName === "NDVI Layer") {
                            ndviDisplayValue = "";
                        }
                    }

                    div.innerHTML = '<span class="layer-description-title">Layers description:</span> <br>';
                    var valuesTable = '<div class="layer-description-container">';

                    valuesTable += '<div id="Mosaic" style="display: ' + mosaicDisplayValue + '"><span>';
                    valuesTable += '<b>Mosaic:</b> Orthomosaic of RGB and Multispectral images of the project area composed by five bands Green, Red, Red Edge, NIR 1 and NIR2 respectively.';
                    valuesTable += '</span></div>';

                    valuesTable += '<div id="DSM" style="display: ' + demDisplayValue + '"><span>';
                    valuesTable += '<b>DSM:</b> Surface model of project area derived from overlaped images taken by the drone. This layer contains of elevation data represented as point cloud.';
                    valuesTable += '</span></div>';

                    valuesTable += '<div id="FloatingPoints" style="display: ' + floatingPointsDisplayValue + '"><span>';
                    valuesTable += '<b>Floating Points:</b> Three floating objects means to measure stream velocity of River Aa which its movement captured by thermal camera.';
                    valuesTable += '</span></div>';

                    valuesTable += '<div id="FlightPlan" style="display: ' + flightPlanDisplayValue + '"><span>';
                    valuesTable += '<b>Fligh Plan:</b> Path followed by the Unmanned Areal Vehicle displaying the route and the altitude of the flight.';
                    valuesTable += '</span></div>';

                    valuesTable += '<div id="Hillshade" style="display: ' + hillshadeDisplayValue + '"><span>';
                    valuesTable += '<b>Hillshade:</b> Hillshade file showing project area with sun\'s angle as a prespective.';
                    valuesTable += '</span></div>';

                    valuesTable += '<div id="Slope" style="display: ' + slopeDisplayValue + '"><span>';
                    valuesTable += '<b>Slope:</b> Derived from DSM, this slope layer contains slope angle of project area topographic situation.';
                    valuesTable += '</span></div>';

                    valuesTable += '<div id="NDVI" style="display: ' + ndviDisplayValue + '"><span>';
                    valuesTable += '<b>NDVI:</b> Normalized Difference Vegetation Index (NDVI) of the project area depicting health condition of surrounding vegetation.';
                    valuesTable += '</span></div>';

                    valuesTable += '</div>';

                    div.innerHTML += valuesTable;

                    return div;
                };
                descriptionBox.addTo(map); //Added by default
                /*End DEM Legend*/

                /*DEM Legend*/
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

                /*Flight Plan Legend*/
                flightPlanLegend.onAdd = function () {
                    var div = L.DomUtil.create('fligthPlandLegend', 'flight-plan-legend');

                    div.innerHTML= '<b>Flight Plan Altitude (m): </b>' +'<br>';

                    var colors = $scope.getColors();

                    var grades = [0, 46, 48.1, 50.8];

                    for(var i = 0; i < colors.length; i++){
                        div.innerHTML +=
                        '<i style="background:' + colors[i] + '"></i> ' +
                        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                    }

                    return div;
                };

                /*Zoom button*/
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
            }

            $scope.activateDescription = function (layerName) {
                if (layerName === 'Mosaic Layer') {
                    $("#Mosaic").css("display","");
                }
                if (layerName === 'DSM Layer') {
                    $("#DSM").css("display","");
                }
                if (layerName === "Floating Points Layer") {
                    $("#FloatingPoints").css("display","");
                }
            }

            $scope.deactivateDescription = function (layerName) {
                if (layerName === 'Mosaic Layer') {
                    $("#Mosaic").css("display","none");
                }
                if (layerName === 'DSM Layer') {
                    $("#DSM").css("display","none");
                }
                if (layerName === "Floating Points Layer") {
                    $("#FloatingPoints").css("display","none");
                }
            }

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
                "Floating Points Layer": markersDummyLayer,
                "Flight Plan Layer": flightPlanLayer
            }


            $scope.ctrl = L.control.layers(baseLayers, $scope.overlays);
            //$scope.ctrl = L.control.activeLayers(baseLayers, $scope.overlays);
            $scope.ctrl.addTo(map);

            $scope.showMarkers();
            $scope.unloadMarkers();
            $scope.loadLegends();

            $scope.onOverlayAdd = function (e) {
                console.log(e);
                if (e.name === 'Mosaic Layer') {
                    $("#Mosaic").css("display","");
                }
                if (e.name === 'DSM Layer') {
                    map.removeControl(legendDEM);
                    legendDEM.addTo(map);
                    $("#DSM").css("display","");
                }
                if (e.name === "Floating Points Layer") {
                    // 1. add all markers
                    $scope.loadMarkers();

                    // 2. make slider available
                    $scope.my.slidershow = true;

                    // 3. change size of map
                    $rootScope.sliderheight = 60;

                    $("#FloatingPoints").css("display","");
                }

                if (e.name === "Flight Plan Layer") {
                    $("#FlightPlan").css("display","");
                    flightPlanLegend.addTo(map);
                }

                map.removeControl(legendCenterButton);
                legendCenterButton.addTo(map);

                var overlayLayers = $scope.ctrl.getActiveOverlays();
                for (var overlayId in overlayLayers) {
                    console.log(overlayLayers[overlayId].name);
                    $scope.activateDescription(overlayLayers[overlayId].name);
                }
                if(overlayLayers.length > 0){
                    descriptionBox.addTo(map);
                }

                // 4. update window:
                $timeout(function () {
                    window.dispatchEvent(new Event('resize'));
                },
                        200);

            };
            $scope.onOverlayRemove = function (e) {
                console.log(e);
                if (e.name === 'Mosaic Layer') {
                    $("#Mosaic").css("display","none");
                }
                if (e.name === 'DSM Layer') {
                    map.removeControl(legendDEM);
                    $("#DSM").css("display","none");
                }
                if (e.name === "Floating Points Layer") {
                    // 1. remove all markers
                    $scope.unloadMarkers();

                    // 2. make slider unavailable
                    $scope.my.slidershow = false;

                    // 3. change size of map
                    $rootScope.sliderheight = 0;
                    $("#FloatingPoints").css("display","none");
                }

                if (e.name === "Flight Plan Layer") {
                    map.removeControl(flightPlanLegend);
                    $("#FlightPlan").css("display","none");
                }

                map.removeControl(legendCenterButton);
                legendCenterButton.addTo(map);

                var overlayLayers = $scope.ctrl.getActiveOverlays();
                if(overlayLayers.length == 0){
                    map.removeControl(descriptionBox);
                }

                // 4. update window:
                $timeout(function () {
                    window.dispatchEvent(new Event('resize'));
                },
                        200);
            };
            
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
