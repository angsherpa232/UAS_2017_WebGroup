(function () {
    'use strict';
    angular.module('adBoxx', [
        'ui.router',
        'ngMaterial',
        'ngAnimate',
        'pascalprecht.translate',
        'translations'])
            .value("aBBaseUrl", "https://ad-boxx.de")
            .run(function($rootScope){
                console.log("app started.");
        });
})();