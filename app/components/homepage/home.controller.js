(function () {
    'use strict';

    function HomeCtrl($rootScope, $scope, $timeout, $mdSidenav) {

        console.log('HomeCtrl started.');
        $scope.title = 'UAS Webapp';
        $scope.show=false;
        $scope.mapContent="+ Map";
        $scope.videoshow=false;
        $scope.videoContent="+ Video";
        $scope.aboutContent="+ About";
        $scope.aboutshow=false;
        $scope.toggle=function()
        {
            if($scope.show==false) {
                $scope.mapContent = "- Map";
                $scope.show = true;
            }
            else
            {
                $scope.mapContent = "+Map";
                $scope.show = false;
            }


        }
        $scope.togglevideo=function()
        {
            if($scope.videoshow==false) {
                $scope.videoContent="- Video";
                $scope.videoshow=true;
            }
            else
            {
                $scope.videoContent="+ Video";
                $scope.videoshow=false;
            }
        }
        $scope.toggleabout=function()
        {

            if($scope.aboutshow==false) {
                $scope.aboutContent = "- About";
                $scope.aboutshow=true;
            }
            else
            {
                $scope.aboutContent = "+ About";
                $scope.aboutshow=false;
            }
        }

    };


    angular.module('UASWebApp')
        .controller('HomeCtrl', HomeCtrl);


})();
