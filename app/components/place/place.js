'use strict';

import Api from '../../scripts/services/api.js';
import PlaceMap from '../place-map/place-map.js';

class Place {
	constructor(observeOnScope, $scope, $timeout, api, $window) {
    this.api = api;
    this.tags = [];
    this.query = null;
    this.tagObj = {};
    this.mapOpen = false;
    this.getTags();
    this.$scope = $scope;
    this.$timeout = $timeout;

    observeOnScope($scope, 'ctrl.query').skip(2).debounce(250).subscribe(() => {
      if (this.query !== null || this.query !== '') {
        this.getPlaces(true);
      }
    });

    $window.navigator.geolocation.getCurrentPosition(location => {
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      this.getPlaces();
    }, () => {
      this.getPlaces();
    });

  }

  toggleMap() {
    this.mapOpen = !this.mapOpen;
  }

  getPlaces(search = false) {
    if (this.query === null) {
      this.query = '';
    }

    this.api.getPlaces(this.query, this.latitude, this.longitude, search).then(({data}) => {
      this.$timeout(() => {
        this.places = data.results;
      }, 0);
    });
  }

  getTags() {
    return this.api.getTags().then(({data}) => {
      this.tags = data.results;
    });
  }
}

export default angular.module('place', ['rx', Api.name, PlaceMap.name])
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
