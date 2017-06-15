(function () {
    'use strict';

    function AppCtrl($rootScope, $scope, $mdMedia, $window) {
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
                            $scope.height = $window.innerHeight - 200;
                            console.log($scope.width);
                            console.log($scope.height);
                        });
                    });
    }
    ;

    angular.module('UASWebApp')
            .controller('AppCtrl', AppCtrl);

})();