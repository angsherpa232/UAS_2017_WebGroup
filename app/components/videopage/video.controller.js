(function () { // video controller page
    'use strict';

    function VideoCtrl($scope) {

        console.log('VideoCtrl started.');
        $scope.title = 'UAS Webapp';
        $scope.play = false;//variable to avoid videos auto play
        $scope.videoshow=false;
        $scope.videoContent="+ Video";
        $scope.imageshow=false;
        $scope.imageContent="+ Images";
        $scope.conversionshow=false;
        $scope.conversionContent="+ Conversion";
        $scope.UAVVideos = [ //  array of videos  with its three attributes
            {
                Video: '/app/components/assets/videos/RGB.mp4',
                Description: 'Video captured using RGB sensor',
                Info: 'June 2017,Aa river,Muenster Germany'
            },
            {
                Video: '/app/components/assets/videos/Thermal.webm',
                Description: 'Video captured using thermal sensor',
                Info: 'June 2017,Aa river,Münster Germany'
            },
            {
                Video: '/app/components/assets/videos/RGB_sta.mp4',
                Description: 'Video captured using thermal sensor(after stabilization)',
                Info: 'June 2017,Aa river,Münster Germany'
            },
            {
                Video: '/app/components/assets/videos/Thermal_sta.webm',
                Description: 'Video Captured Using Thermal Sensor (After Stabilization)',
                Info: 'June 2017,Aa river,Münster Germany'
            },
            {
                Video: '/app/components/assets/videos/RGB_obj.webm',
                Description: 'Object(Float) detection in video using template matching algorithm in openCV captured by RGB sensor',
                Info: 'June 2017,Aa river,Münster Germany'
            },
            {
                Video: '/app/components/assets/videos/Thermal_obj.webm',
                Description: 'Object(Float) detection in video using image processing tool in matlab captured by thermal sensor',
                Info: 'June 2017,Aa river,Münster Germany'
            },
            {
                Video: '/app/components/assets/videos/RGB_matlab.mp4',
                Description: 'Object(Float) detection in video using template matching algorithm in openCV captured by RGB sensor',
                Info: 'June 2017,Aa river,Münster Germany'
            },
            {
                Video: '/app/components/assets/videos/Thermal_matlab.webm',
                Description: 'Object(Float) detection in video using image processing tool in matlab captured by thermal sensor',
                Info: 'June 2017,Aa river,Münster Germany'
            }
        ]

        $scope.currentVideo = function (index) {//get unique index then help to play the video after the user clicks
           if($scope.imageshow==true)
           {
               $scope.imageshow=false;
               $scope.imageContent="+ Image";

           }
           else if($scope.conversionshow==true)
           {
               $scope.conversionshow=false;
               $scope.conversionContent="+ Conversion";
           }
           else if($scope.videoshow==true)
           {
               $scope.videoshow=false;
               $scope.videoContent="+ Video";
           }
            $scope.play = true;
            $scope.current_video = $scope.UAVVideos[index];
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
        $scope.toggleimage=function()
        {
            if($scope.imageshow==false) {
                $scope.imageContent="- Image";
                $scope.imageshow=true;
            }
            else
            {
                $scope.imageContent="+ Image";
                $scope.imageshow=false;
            }
        }
        $scope.toggleconversion=function()
        {
            if($scope.conversionshow==false) {
                $scope.conversionContent="- Conversion";
                $scope.conversionshow=true;
            }
            else
            {
                $scope.conversionContent="+ Conversion";
                $scope.conversionshow=false;
            }
        }
        $scope.search = function ()// this function filter the list items on text change condition
        {
            $scope.UAVVideos = $scope.UAVVideos.filter(
                x => x.Video.slice(x.Video.lastIndexOf("/") + 1)
                    .toLowerCase().startsWith($scope.video) == true
            )
            ;
        }
    };


    angular.module('UASWebApp')//the name of the angular application
        .controller('VideoCtrl', VideoCtrl)//the name of the controller found in video.html
        .filter("trustUrl", ['$sce',//helps to filter the url videos to check the integrity
            function ($sce) {
                return function (recordingUrl) {
                    return $sce.trustAsResourceUrl(recordingUrl);
                };
            }
        ]);
})();
