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
            .run(function ($rootScope, $window) {
                console.log("app started.");

                $rootScope.height = $window.innerHeight - 62 - $rootScope.sliderheight;

                angular.element($window).bind('resize', function () {
                    $rootScope.$apply(function () {
                        $rootScope.width = $window.innerWidth;
                        $rootScope.height = $window.innerHeight - 62 - $rootScope.sliderheight;
                    });
                });
            });
})();