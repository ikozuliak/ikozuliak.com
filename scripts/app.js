'use strict';

angular.module('homepageApp', [])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl:'/views/main.html',
                controller:'MainCtrl',
                title: "Hello"
            })
            .when('/labs', {
                templateUrl:'/views/labs.html',
                controller:'MainCtrl',
                title: "Labs"
            })
            .when('/labs/:pageId', {
                controller:'LabsCtrl',
                templateUrl:function (params) {
                    return '/views/labs/' + params.pageId + ".html";
                },
                title: "Labs"
            })
            .when('/processing', {
                templateUrl:'/views/processing.html',
                controller:'ProcessingCtrl',
                title: 'Processing'

            })
            .when('/processing/:pageId', {
                controller:'ProcessingCtrl',
                templateUrl:function (params) {
                    return '/views/processing/' + params.pageId + ".html";
                },
                title: "Labs"
            })
            .when('/about', {
                templateUrl:'/views/about-me.html',
                controller:'MainCtrl',
                title: "About me"

            })
            .otherwise({
                templateUrl:'/views/404.html',
                controller:'EmptyPageCtrl',
                title: "404"
            });
    })
    .run(['$location', '$rootScope', function ($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        })
}]);
