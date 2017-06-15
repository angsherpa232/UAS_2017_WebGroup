(function() {

    function uasHome() {
        return {
            restrict: 'EA',
            templateUrl: './app/components/homepage/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        };
    }

    angular.module('UASWebApp')
        .directive('uasHome', uasHome);
})();