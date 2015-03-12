'use strict';

class Review {
	constructor(api, auth) {
    this.api = api;
    this.auth = auth;
    this.edit = false;
    console.log(this);
  }

  removeReview(id) {
    console.log('review deletion');
    return this.api.deleteReview(id, this.auth.token).then(review => {
      return this.reload();
    })
  }
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
        reviews: '=',
        reload: '&'
			},
			bindToController: true,
			controller: Review ,
			controllerAs: 'ctrl'
		};
	});
