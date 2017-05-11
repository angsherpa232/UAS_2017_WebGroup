(function(){
    'use strict';

    function ToolbarCtrl($rootScope, $scope){
        
        console.log('ToolbarCtrl started.');
        $scope.title = 'UAS Webapp';
        
    };


    angular.module('UASWebApp')
        .controller('ToolbarCtrl', ToolbarCtrl);
})();
