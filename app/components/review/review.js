'use strict';

import CreateReview from '../create-review/create-review.js';
import Auth from '../../scripts/services/auth.js';

class Review {
	constructor(auth) {
    this.auth = auth;
    console.log(this);
  }
}

export default angular.module('review', [CreateReview.name, Auth.name])
	.directive('review', function() {
		return {
			templateUrl: 'components/review/review.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
        reviews: '='
			},
			bindToController: true,
			controller: Review ,
			controllerAs: 'ctrl'
		};
	});
