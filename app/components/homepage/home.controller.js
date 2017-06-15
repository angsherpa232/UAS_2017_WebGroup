(function () {
    'use strict';

    function HomeCtrl($rootScope, $scope, $timeout, $mdSidenav) {

        console.log('HomeCtrl started.');
        $scope.title = 'UAS Webapp';

    };


    angular.module('UASWebApp')
        .controller('HomeCtrl', HomeCtrl);


})();
