(function () {
    'use strict';

    angular.module('lazyLoadProof', [])

    .controller('mainController', [
        '$scope',
         function (
             $scope
         ) {
            var _this = this;

            $scope.showOptions = {
                top: false,
                middle: false,
                bottom: false
            };

            _this.toggleColorBlock = function (key) {

                if (!$scope.showOptions[key]) {

                    $scope.showOptions[key] = true;
                }

                $scope.$apply();
            };
        }
    ])

    .directive('waypoint',[
        '$parse',
        function (
            $parse
        ) {

            return {
                restrict: 'AE',
                link: function (scope, iElem, attrs) {
                    var callback = $parse(attrs.callback)(scope);

                    var waypoint = new Waypoint({
                        element: iElem[0],
                        handler: function () {

                            callback(attrs.position);
                        }
                    });
                }
            };
        }
    ])

    .directive('colorBlock',[
        'loadTracker',
        function (
            loadTracker
        ) {

            return {
                restrict: 'E',
                template:
                    '<div class="color-block">' +
                        '<div class="message">Here is lazy loaded content</div>' +
                    '</div>',
                link: function (scope, iElem) {

                    iElem.children().addClass(loadTracker.getClass());
                }
            };
        }
    ])

    .factory('loadTracker', [
        function () {
            var factory = {};

            factory.classes = [
                'top',
                'middle',
                'bottom'
            ];

            factory.count = 0;

            factory.getClass = function () {
                var currCount = factory.count;

                factory.count++;

                return factory.classes[currCount];
            };

            return factory;
        }
    ]);
})();
