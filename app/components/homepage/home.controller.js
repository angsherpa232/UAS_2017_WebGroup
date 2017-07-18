(function () {
    'use strict';

    function HomeCtrl($rootScope, $scope, $timeout) {

        console.log('HomeCtrl started.');
        $scope.title = 'UAS Webapp';
        $scope.show = false;
        $scope.mapContent = "+ Map";
        $scope.videoshow = false;
        $scope.threeDContent = "+ 3D";
        $scope.threeDshow = false;
        $scope.videoContent = "+ Video";
        $scope.aboutContent = "+ About";
        $scope.aboutshow = false;
        $scope.toggle = function ()// a function for show and hiding the content of map menu in the home page
        {
            if ($scope.show == false) {
                $scope.mapContent = "- Map";
                $scope.show = true;
            } else
            {
                $scope.mapContent = "+Map";
                $scope.show = false;
            }
        }
        $scope.toggleThreeD = function ()
        {
            if ($scope.threeDshow == false) {
                $scope.threeDContent = "- 3D";
                $scope.threeDshow = true;
            } else
            {
                $scope.threeDContent = "+ 3D";
                $scope.threeDshow = false;
            }
        }
        $scope.togglevideo = function ()
        {
            if ($scope.videoshow == false) {
                $scope.videoContent = "- Video";
                $scope.videoshow = true;
            } else
            {
                $scope.videoContent = "+ Video";
                $scope.videoshow = false;
            }
        }
        $scope.toggleabout = function ()
        {

            if ($scope.aboutshow == false) {
                $scope.aboutContent = "- About";
                $scope.aboutshow = true;
            } else
            {
                $scope.aboutContent = "+ About";
                $scope.aboutshow = false;
            }
        }


        var limitMax = 550; //550
        var limitMin = 50;  //100
        var imageSize = 600; //650

        function FirstMove() {
            $("#drone").css("display", "");
            var elem = document.getElementById("drone");
            var pos = 50;
            var id = setInterval(frame, 10);

            function frame() {
                if (pos == limitMax) { //Ending position for the function 0-imageSize
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
            //var pos=0
            var id = setInterval(frame, 10);

            function frame() {
                if (pos == limitMin) { //Ending position for the function / imageSize-0
                    clearInterval(id);
                    ThirdMove(pos);
                } else {
                    pos--;
                    //console.log(pos);
                    //elem.style.top = pos + 'px'; 
                    elem.style.left = pos + 'px';
                }
            }
        }

        function ThirdMove(pos) {
            var elem = document.getElementById("drone");
            //var pos=0
            var id = setInterval(frame, 10);

            function frame() {
                if (pos == limitMax) { //Ending position for the function / 0-imageSize
                    clearInterval(id);
                    FourthMove(pos);
                } else {
                    pos++;
                    //console.log(pos);
                    elem.style.top = (imageSize - pos) + 'px';
                    elem.style.left = pos + 'px';
                }
            }
        }

        function FourthMove(pos) {
            var elem = document.getElementById("drone");
            //var pos=0
            var id = setInterval(frame, 10);

            function frame() {
                if (pos == limitMin) { //Ending position for the function /imageSize-0
                    clearInterval(id);
                    FirstMove();
                } else {
                    pos--;
                    //console.log(pos);
                    //elem.style.top = (imageSize- pos) + 'px'; 
                    elem.style.left = pos + 'px';
                }
            }
        }

        $timeout(function () {
            if (!$rootScope.animating){
                FirstMove();
                $rootScope.animating = true;
            }
        },
                1000);
    }
    ;


    angular.module('UASWebApp')
            .controller('HomeCtrl', HomeCtrl);


})();
