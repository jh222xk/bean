'use strict';
/*jshint esnext: true */

import Place from './components/place/place.js';
import PlaceDetail from './components/place-detail/place-detail.js';
import FabMenu from './components/fab-menu/fab-menu.js';
import Login from './components/login/login.js';
//import NavbarCtrl from './components/navbar/navbar.controller';

angular.module('bean', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial',
  Place.name, PlaceDetail.name, FabMenu.name, Login.name])
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<place></place>'
      }).state('place', {
          url: '/place/:id',
          template: '<place-detail id="{{id}}"></place-detail>',
          controller: function ($scope, $stateParams) {
            $scope.id = $stateParams.id;
          }
      });
    $urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('green');
  })
;
