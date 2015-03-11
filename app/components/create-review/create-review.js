'use strict';

import Api from '../../scripts/services/api.js';

class CreateReview {
	constructor(api, auth, $stateParams) {
    this.api = api;
    this.auth = auth;
    this.id = $stateParams.id;
    this.reviewForm = {};
  }

  createReview(formData, reviewForm) {
    this.api.createReview(this.id, formData, this.auth.token).then(() => {
      reviewForm.$setPristine();
      formData.description = '';
      formData.rating = '';
      return this.created();
    });
  }
}

export default angular.module('createReview', ['ui.router', 'rx', 'ngMessages', Api.name])
	.directive('createReview', function() {
		return {
			templateUrl: 'components/create-review/create-review.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
        //id: '='
        created: '&'
			},
			bindToController: true,
			controller: CreateReview ,
			controllerAs: 'ctrl'
		};
	});
