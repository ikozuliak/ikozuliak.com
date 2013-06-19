'use strict';

angular.module('homepageApp')

    .controller('NavCtrl', function ($scope, $location) {
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'home';
            return page === currentRoute ? 'current' : '';
        };
    })

    .controller('MainCtrl', function ($scope, $location) {

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        var breezkocontainer = document.getElementById('breeze');
        var breezko = new window.Breezko(breezkocontainer, {
            delay:2000,
            speed:1000
        });


    });
