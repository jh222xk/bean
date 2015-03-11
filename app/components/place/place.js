'use strict';

import Api from '../../scripts/services/api.js';

class Place {
	constructor(api) {
    this.api = api;
    this.getPlaces();

    navigator.geolocation.getCurrentPosition(location => {
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      this.getPlaces();
    });
  }

  getPlaces() {
    if (!this.latitude || !this.longitude) {
      return;
    }
    console.log(this.latitude);
    console.log(this.longitude);
    return this.api.getPlaces(this.latitude, this.longitude).then(places => {
      this.places = places.data.results;
      //console.log(this.places);
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
