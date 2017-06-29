(function () {
    'use strict';
    angular.module('UASWebApp', [
        'ui.router',
        'ui-leaflet',
        'ngMaterial',
        'ngAnimate',
        'ngCookies',
        'rzModule'])
            //.value("UASBaseUrl", "https://ad-boxx.de")
            .run(function($rootScope){
                console.log("app started.");
        });
})();