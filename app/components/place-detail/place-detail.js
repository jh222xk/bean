'use strict';

import Review from '../review/review.js';

class PlaceDetail {
  constructor(api) {
    this.api = api;
    this.getPlace();
  }

  getPlace() {
    //console.log(this.id);
    return this.api.getPlace(this.id).then(place => {
      this.place = place.data;
      //console.log(this);
    });
  }
}

export default angular.module('placeDetail', [Review.name])
	.directive('placeDetail', function() {
		return {
			templateUrl: 'components/place-detail/place-detail.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
        id: '@'
			},
			bindToController: true,
			controller: PlaceDetail ,
			controllerAs: 'item'
		};
	});
