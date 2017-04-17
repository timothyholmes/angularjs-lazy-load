(function () {
    'use strict';

    angular.module('lazyLoadProof', [])

    .controller('mainController', [
        '$scope',
         function (
             $scope
         ) {
            var _this = this,
                initialized = false;

            $scope.showOptions = {
                upperMiddle: false,
                lowerMiddle: false,
                bottom: false
            };

            function turnBlockOn (key) {

                $scope.showOptions[key] = true;
            }

            function initializeBlocks (key) {
                var keys = Object.keys($scope.showOptions),
                    index,
                    i = 0;

                index = keys.findIndex(function (element) {
                    return element === key;
                });

                if (i <= index) {
                    do {
                        turnBlockOn(keys[i]);
                        i++;
                    } while (i <= index);
                }

                initialized = true;
            }

            _this.renderBlock = function (key) {

                if (!initialized) {
                    initializeBlocks(key);
                } else {
                    turnBlockOn(key);
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

                    // Get the function reference from the string
                    var callback = $parse(attrs.callback)(scope),
                        waypoint = new Waypoint({
                            element: iElem[0],
                            handler: function () {

                                callback(attrs.position);

                                waypoint.destroy();
                            }
                        });
                }
            };
        }
    ])

    .directive('colorBlock',[
        function () {

            return {
                restrict: 'E',
                template:
                    '<div class="color-block">' +
                        '<div class="message">Here\'s some content</div>' +
                    '</div>',
                link: function (scope, iElem, attrs) {

                    iElem.children().addClass(attrs.position);
                }
            };
        }
    ]);
})();
