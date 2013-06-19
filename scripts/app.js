'use strict';

angular.module('homepageApp', [])
    .config(function ($routeProvider, $locationProvider) {

//        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl:'views/main.html',
                controller:'MainCtrl'
            })
            .when('/labs', {
                templateUrl:'views/labs.html',
                controller:'MainCtrl'
            })
            .when('/about', {
                templateUrl:'views/about.html',
                controller:'MainCtrl'
            })
            .otherwise({
                templateUrl:'views/404.html',
                controller:'EmptyPage'
            });
    });
