(function () { // video controller page
    'use strict';

    function VideoCtrl($scope) {

        console.log('VideoCtrl started.');
        $scope.title = 'UAS Webapp';
        $scope.play = false;//variable to avoid videos auto play
        $scope.UAVVideos = [ //  array of videos  with its three attributes
            {
                Video: '/app/components/assets/videos/UAV_Video_1.mp4',
                Description: 'Object (Float) detection to Measure stream velocity using UAV and OpenCV',
                Info: 'June 2017,Aa river,Muenster Germany'
            },
            {
                Video: '/app/components/assets/videos/UAV_Video_2.mp4',
                Description: 'Stabilized Video obtained from UAV for velocity determination of stream using OpenCV',
                Info: 'June 2017,Aa river,Muenster Germany'
            }
        ]

        $scope.currentVideo = function (index) {//get unique index then help to play the video after the user clicks
            $scope.play = true;
            $scope.current_video = $scope.UAVVideos[index];
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
