(function () {
    'use strict';
    function MainCtrl($scope, $timeout, $mdSidenav) {

		var imageLayer; //This is Jeison's repository if you are not me f*ck you
		var executed = false;
		var ctrl = new L.LayerGroup();
		var map;
		
		$scope.createMap = function (){

			var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
						'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
						'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

			var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
				streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
				outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors', attribution: mbAttr}),
				satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
				dark = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr}),
				light = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
				satellitestreets = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', attribution: mbAttr});

			map = L.map('mapid', {
				center: [51.943703,7.573759], /*Default location */
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
			    zIndex:200
			}).addTo(map);

			var DSM = L.esri.tiledMapLayer({
			    url: "http://tiles.arcgis.com/tiles/W47q82gM5Y2xNen1/arcgis/rest/services/River_Aa_DSM/MapServer",
			    zIndex:200
			}).addTo(map);

			var overlays = {
				"Mosaic Layer": MosaicLayer,
				"DSM Layer": DSM
			};


			ctrl = L.control.layers(baseLayers, overlays).addTo(map);
		    

			}; //end of createMap Function

			$scope.createMap();
			
			$scope.zoomRiver=function (){
				map.setView([51.943703,7.573759], 16);
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
