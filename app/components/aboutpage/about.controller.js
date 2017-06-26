(function () {
    'use strict';

    function AboutCtrl($rootScope, $scope, $timeout, $mdSidenav) {

        console.log('AboutCtrl started.');
        $scope.title = 'UAS Webapp';

    };


    angular.module('UASWebApp')
        .controller('AboutCtrl', AboutCtrl);


})();
