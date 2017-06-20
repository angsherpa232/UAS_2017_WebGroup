(function () {
    'use strict';

    function AppCtrl($rootScope, $state, $scope, $mdMedia, $window) {
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
        
        angular.element($window).bind('resize', function () {
                        $scope.$apply(function () {
                            $scope.width = $window.innerWidth;
                            $scope.height = $window.innerHeight - 62;
                            console.log($scope.height);
                        });
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
    }
    ;

    angular.module('UASWebApp')
            .controller('AppCtrl', AppCtrl);

})();