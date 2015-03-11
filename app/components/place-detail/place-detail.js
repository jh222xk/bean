'use strict';


import CreateReview from '../create-review/create-review.js';
import Auth from '../../scripts/services/auth.js';
import Review from '../review/review.js';

class PlaceDetail {
  constructor(api) {
    this.api = api;
    this.getPlace();
  }

  getPlace() {
    return this.api.getPlace(this.id).then(place => {
      this.place = place.data;
    });
  }
}

export default angular.module('placeDetail', [CreateReview.name, Auth.name, Review.name])
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
