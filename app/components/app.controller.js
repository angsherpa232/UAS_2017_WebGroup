(function () {
    'use strict';

    function AppCtrl($state, $scope, $mdMedia) {
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
        
        $scope.home = function(){
            $state.go('home', {
            });
        };
        
        $scope.map = function(){
            $state.go('map', {
            });
        };
        
        $scope.video = function(){
            $state.go('video', {
            });
        };
        
        $scope.about = function(){
            $state.go('about', {
            });
        };

        $scope.threed = function(){
            $state.go('3D', {
            });
        };
    }
    ;

    angular.module('UASWebApp')
            .controller('AppCtrl', AppCtrl);

})();