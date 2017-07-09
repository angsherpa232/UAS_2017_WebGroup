(function () {
    'use strict';

    function VideoCtrl($scope) {

        console.log('VideoCtrl started.');
        $scope.title = 'UAS Webapp';

        $scope.play = false;
        $scope.UAVVideos = [
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


        $scope.currentVideo = function (index) {
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


    angular.module('UASWebApp')
        .controller('VideoCtrl', VideoCtrl)
        .filter("trustUrl", ['$sce',
            function ($sce) {
                return function (recordingUrl) {
                    return $sce.trustAsResourceUrl(recordingUrl);
                };
            }
        ]);
})();
