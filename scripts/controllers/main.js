'use strict';

angular.module('homepageApp')

    .controller('NavCtrl', function ($scope, $location) {

        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'home';

            return page === currentRoute ? 'current' : '';
        };

        $scope.toggleNav = function(){

            console.log('test');

            var body = document.body;

            if (body.className.match(new RegExp('(\\s|^)sidebar-opened(\\s|$)')))
                body.className = body.className.replace(/(?:^|\s)sidebar-opened(?!\S)/g, '')
            else
                body.className += " sidebar-opened";
        }
    })

    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })

    .controller('MainCtrl',function ($scope, $timeout) {

        var likes = [
            'HTML5',
            'AngularJS',
            'CSS3',
            'Stouts',
            'Ukraine',
            'Vanilla JS',
            'Open-airs',
            'Guitars',
            'Hiking'
        ];

        $scope.likes = shuffleArray(likes);

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        $scope.layoutDone = function () {
            $timeout(function () {
                var breezko = new window.Breezko(document.getElementById('breeze'), {
                    speed:1000,
                    delay:2000
                });
            }, 0);
        }


    }).controller('BreezkoCtrl',function ($scope) {

        window.prettyPrint && prettyPrint()

        var breezko = new window.Breezko(document.getElementById('breeze'), {
            speed:1000
        });

        $scope.breezkoNext = function () {
            breezko.next();
        }

        $scope.breezkoPrev = function () {
            breezko.prev();
        }

        $scope.breezkoPlay = function (delay) {
            breezko.start(delay);
        }

        $scope.breezkoStop = function () {
            breezko.stop();
        }
    }).controller('EmptyPageCtrl', function ($scope) {


    });
