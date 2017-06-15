(function() {

    function uasSidenav() {
        return {
            restrict: 'EA',
            templateUrl: './app/components/sidenav/sidenav.html',
            controller: 'SidenavCtrl',
            controllerAs: 'vm'
        };
    }

    angular.module('UASWebApp')
        .directive('uasSidenav', uasSidenav);
})();