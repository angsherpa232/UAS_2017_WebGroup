(function() {

    function uasToolbar() {
        return {
            restrict: 'EA',
            templateUrl: './app/components/toolbar/toolbar.directive.html',
            controller: 'ToolbarCtrl',
            controllerAs: 'vm'
        }
    }

    angular.module('UASWebApp')
        .directive('uasToolbar', uasToolbar);
})();
