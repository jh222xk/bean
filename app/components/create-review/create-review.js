'use strict';

import Api from '../../scripts/services/api.js';

class CreateReview {
	constructor(api, auth, $stateParams) {
    this.api = api;
    this.auth = auth;
    this.review = {};
    this.id = $stateParams.id;
    console.log(this);
  }

  createReview(formData) {
    console.log(formData.description);
    console.log(this.auth.currentUser);
    console.log(this.id);
    return this.api.createReview(this.id, formData, this.auth.token);
  }
}

export default angular.module('createReview', [Api.name, 'ui.router'])
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
			},
			bindToController: true,
			controller: CreateReview ,
			controllerAs: 'ctrl'
		};
	});
