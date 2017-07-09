(function () {
    'use strict';

    function VideoCtrl($scope) {

        console.log('VideoCtrl started.');
        $scope.title = 'UAS Webapp';

        $scope.play = false;
        $scope.UAVVideos = [
            {
                Video: '../assets/videos/UAV_Video_2.mp4',
                Description: 'This is mp4 Video',
                Info: 'date, place and by whom'
            },
            {
                Video: 'http://images.all-free-download.com/footage_preview/webm/horse_riding_205.webm',
                Description: 'This is the first web video',
                Info: 'date, place and by whom'
            },
            {
                Video: 'http://images.all-free-download.com/footage_preview/webm/flower_124.webm',
                Description: 'This is the second web video',
                Info: 'date, place and by whom'
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
