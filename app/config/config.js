(function () {
    'use strict';

    function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider) {
        console.log('run config');

        $stateProvider
                .state('map', {
                    url: '/map',
                    templateUrl: 'app/components/main/main.html',
                    controller: 'MainCtrl',
                    authenticate: false
                })
                .state('home', {
                    url: '/home',
                    controller: 'HomeCtrl',
                    templateUrl: 'app/components/homepage/home.html',
                    authenticate: false
                })
                .state('video', {
                    url: '/video',
                    controller: 'VideoCtrl',
                    templateUrl: 'app/components/videopage/video.html',
                    authenticate: false
                })
                .state('about', {
                    url: '/about',
                    controller: 'AboutCtrl',
                    templateUrl: 'app/components/aboutpage/about.html',
                    authenticate: false
                });

        $urlRouterProvider.otherwise('/home');

        $mdThemingProvider
                .definePalette('UASWebApp-one', {
                    '50': '1A80C1',
                    '100': '1A80C1',
                    '200': '1A80C1',
                    '300': '1A80C1',
                    '400': '1A80C1',
                    '500': '1A80C1',
                    '600': '1A80C1',
                    '700': '1A80C1',
                    '800': '1A80C1',
                    '900': '1A80C1',
                    'A100': '1A80C1',
                    'A200': '1A80C1',
                    'A400': '1A80C1',
                    'A700': '1A80C1',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': ['50', '100',
                        '200', '300', '400', 'A100'],
                    'contrastLightColors': undefined
                })
                .definePalette('UASWebApp-two', {
                    '50': '8cbf3f',
                    '100': '8cbf3f',
                    '200': '8cbf3f',
                    '300': '8cbf3f',
                    '400': '8cbf3f',
                    '500': '8cbf3f',
                    '600': '8cbf3f',
                    '700': '8cbf3f',
                    '800': '8cbf3f',
                    '900': '8cbf3f',
                    'A100': '8cbf3f',
                    'A200': '8cbf3f',
                    'A400': '8cbf3f',
                    'A700': '8cbf3f',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': ['50', '100',
                        '200', '300', '400', 'A100'],
                    'contrastLightColors': undefined
                })
                .theme('default')
                .primaryPalette('UASWebApp-one', {
                    'default': '500'
                })
                .accentPalette('UASWebApp-two', {
                    'default': '500'
                })
                .warnPalette('pink');

        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

    angular.module('UASWebApp')
            .config(config);
})();