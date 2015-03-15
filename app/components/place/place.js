'use strict';

import Api from '../../scripts/services/api.js';
import Storage from '../../scripts/services/storage.js';

class Place {
	constructor(observeOnScope, $scope, api, storage, $window) {
    this.api = api;
    this.storage = storage;
    this.tags = [];
    this.getPlaces();
    this.query = '';
    this.tagObj = {};

    $window.navigator.geolocation.getCurrentPosition(location => {
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      this.getPlaces();
    });

    observeOnScope($scope, 'ctrl.query').debounce(250).subscribe(() => {
      this.getPlaces();
    });
  }

  getPlaces() {
    if (!this.latitude || !this.longitude) {
      return;
    }
    return this.api.getPlaces(this.query, this.latitude, this.longitude).then(places => {
      this.places = places.data.results;
      this.getTags();
      console.log(this.places);
    });
  }

  getTags() {
    return this.api.getTags().then(({data}) => {
      this.tags = data.results;
      console.log(this.tags);
    });
  }
}

export default angular.module('place', ['rx', Api.name, Storage.name])
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
