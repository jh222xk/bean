'use strict';

class Review {
	constructor() {}
}

export default angular.module('review', [])
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
