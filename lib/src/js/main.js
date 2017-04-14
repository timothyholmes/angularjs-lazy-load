(function () {
    'use strict';

    angular.module('lazyLoadProof', [])

    .directive('lazyLoader',[
        '$window',
        function (
            $window
        ) {

            return {
                restrict: 'A',
                link: function (scope, iElement, attrs) {

                }
            };
    }]);
})();
