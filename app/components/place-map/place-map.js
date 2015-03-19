'use strict';

class PlaceMap {
	constructor() {
    this.map = {center: { latitude: 0.0, longitude: 0.0}, zoom: 13, options: {
      minZoom: 2
    }};
  }
}

export default angular.module('placeMap', ['uiGmapgoogle-maps'])
	.directive('placeMap', function() {
		return {
			templateUrl: 'components/place-map/place-map.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
        places: '=',
        mapOpen: '='
			},
			bindToController: true,
			controller: PlaceMap ,
			controllerAs: 'ctrl'
		};
	});
