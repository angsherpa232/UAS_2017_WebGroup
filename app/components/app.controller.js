(function() {
    'use strict';
    
    function AppCtrl($rootScope, $scope, $mdMedia){
        $scope.message = 'Initial Setup';
        $scope.screenIsXS = $mdMedia('xs');
        $scope.screenIsSM = $mdMedia('sm');
        $scope.screenIsMD = $mdMedia('md');
        $scope.screenIsGTMD = $mdMedia('gt-md');

        $scope.$watch(function () {
            return $mdMedia('xs');
        }, function (size) {
            console.log("screen is XS:" + size);
            $scope.screenIsXS = size;
        });
        
        $scope.$watch(function () {
            return $mdMedia('sm');
        }, function (size) {
            console.log("screen is SM:" + size);
            $scope.screenIsSM = size;
        });
        
        $scope.$watch(function () {
            return $mdMedia('md');
        }, function (size) {
            console.log("screen is MD:" + size);
            $scope.screenIsMD = size;
        });
        
        $scope.$watch(function () {
            return $mdMedia('gt-md');
        }, function (size) {
            console.log("screen is gt-MD:" + size);
            $scope.screenIsGTMD = size;
        });
        
        $scope.mapHeight = window.innerHeight - 80;
    };
    
    angular.module('UASWebApp')
            .controller('AppCtrl', AppCtrl);
    
})();