(function() {

    function uasAbout() {
        return {
            restrict: 'EA',
            templateUrl: './app/components/aboutpage/about.html',
            controller: 'AboutCtrl',
            controllerAs: 'vm'
        };
    }

    angular.module('UASWebApp')
        .directive('uasAbout', uasAbout);
})();