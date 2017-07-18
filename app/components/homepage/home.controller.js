(function () {
    'use strict';

    function HomeCtrl($rootScope, $scope, $timeout, $mdSidenav) {

        console.log('HomeCtrl started.');
        $scope.title = 'UAS Webapp';
        $scope.show=false;
        $scope.mapContent="+ Map";
        $scope.videoshow=false;
        $scope.threeDContent="+ 3D";
        $scope.threeDshow=false;
        $scope.videoContent="+ Video";
        $scope.aboutContent="+ About";
        $scope.aboutshow=false;
        $scope.toggle=function()// a function for show and hiding the content of map menu in the home page
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
        $scope.toggleThreeD=function()
        {
            if($scope.threeDshow==false) {
                $scope.threeDContent="- 3D";
                $scope.threeDshow=true;
            }
            else
            {
                $scope.threeDContent="+ 3D";
                $scope.threeDshow=false;
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

        function FirstMove() {
            var elem = document.getElementById("drone");
            var pos = 0;
            var id = setInterval(frame, 1);

            function frame() {
                if (pos == 1000) {
                    clearInterval(id);
                    SecondMove(pos);
                } else {
                    pos++;
                    elem.style.top = pos + 'px';
                    elem.style.left = pos + 'px';
                }
            }

        }

        function SecondMove(pos) {
            var elem = document.getElementById("drone");
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
            //var pos=0
            var id = setInterval(frame, 1);

            function frame() {
                if (pos == 0) {
                    clearInterval(id);
                    FirstMove();
                } else {
                    pos--;
                    elem.style.top = pos + 'px';
                    elem.style.left = pos + 'px';
                }
            }
        }

        FirstMove();
    };


    angular.module('UASWebApp')
        .controller('HomeCtrl', HomeCtrl);


})();
