(function () {
    'use strict';

    angular.module('lazyLoadProof', [])

    .directive('colorBlock',[
        'loadTracker',
        function (
            loadTracker
        ) {

            return {
                restrict: 'E',
                template: '<div class="color-block"><div class="message">Here is lazy loaded content</div></div>',
                link: function (scope, iElem) {
                    var thisClass = loadTracker.getClass();

                    iElem.children().addClass(thisClass);

                    // TO DO - track if this one is in view, add the next one
                }
            };
    }])

    .factory('loadTracker', [
        function () {
            var service = {};

            service.classes = [
                'top',
                'middle',
                'bottom'
            ];

            service.count = 0;

            service.getClass = function () {
                var currCount = service.count;

                service.count++;

                return service.classes[currCount];
            };

            return service;
    }]);
})();
