'use strict';

angular.module('homepageApp', [])
    .config(function ($routeProvider, $locationProvider) {
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
            });
    });
