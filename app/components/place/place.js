'use strict';

import Api from '../../scripts/services/api.js';
import Storage from '../../scripts/services/storage.js';
import PlaceMap from '../place-map/place-map.js';

class Place {
	constructor(observeOnScope, $scope, api, storage, $window) {
    this.api = api;
    this.storage = storage;
    this.tags = [];
    this.query = null;
    this.tagObj = {};
    this.mapOpen = false;
    this.getTags();

    observeOnScope($scope, 'ctrl.query').skip(2).debounce(250).subscribe(() => {
      this.getPlaces();
    });

    $window.navigator.geolocation.getCurrentPosition(location => {
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      this.getPlaces();
      console.log(this);
    });
  }

  toggleMap() {
    this.mapOpen = !this.mapOpen;
  }

  getPlaces() {
    console.log(this.latitude);
    console.log('HÄMTAR PLACES');
    if (this.query === null) {
      this.query = '';
    }

    return this.api.getPlaces(this.query, this.latitude, this.longitude).then(({data}) => {
      this.places = data.results;
    });
  }

  getTags() {
    return this.api.getTags().then(({data}) => {
      this.tags = data.results;
    });
  }
}

export default angular.module('place', ['rx', Api.name, Storage.name, PlaceMap.name])
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
