'use strict';

import Api from '../../scripts/services/api.js';

class Place {
	constructor(api) {
    this.api = api;
    this.getPlaces();
  }

  getPlaces() {
    return this.api.getPlaces().then(places => {
      this.places = places.data.results;
      console.log(this.places);
    });
  }
}

export default angular.module('place', [Api.name])
	.directive('place', function() {
		return {
			templateUrl: 'components/place/place.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
			},
			bindToController: true,
			controller: Place,
			controllerAs: 'ctrl'
		};
	});
