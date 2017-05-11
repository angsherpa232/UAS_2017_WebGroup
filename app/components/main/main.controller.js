(function () {
    'use strict';
    function MainCtrl($scope, $timeout) {

        angular.extend($scope, {
            map: {
                center: {
                    lat: 51.95,
                    lng: 7.6,
                    zoom: 12
                },
                bounds: {
                },
                layers: {
                    baselayers: {
                        osm: {
                            name: 'OpenStreetMap',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            type: 'xyz'
                        },
                        mapbox_light: {
                            name: 'Mapbox Light',
                            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                            type: 'xyz',
                            layerOptions: {
                                apikey: 'pk.eyJ1IjoibmF2ZWVuamFmZXIiLCJhIjoiY2lsYnVmamE0MDA1MXdnbHpvNGZianRuOCJ9.5KqDlJGBKr7ZF9Rdg6j_yQ',
                                mapid: 'naveenjafer.0n3ooo76'
                            }
                        }
                    }
                },
                defaults: {
                    scrollWheelZoom: true,
                    zoomControl: true,
                    doubleClickZoom: true,
                    dragging: true
                }
            }
        });
        $timeout(function () {
            window.dispatchEvent(new Event('resize'))
        },
                200);
    }
    ;
    angular.module('UASWebApp')
            .controller('MainCtrl', MainCtrl);
})();
