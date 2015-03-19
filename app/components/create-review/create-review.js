'use strict';

import Api from '../../scripts/services/api.js';

class CreateReview {
	constructor(api, auth, $stateParams) {
    this.api = api;
    this.auth = auth;
    this.id = $stateParams.id;
    this.reviewForm = {};
    this.review = {
      rating: 0,
      description: ''
    };

    // Use old value only if old value is present.
    if (this.old) {
      this.review.description = this.old.description;
      this.review.rating = this.old.rating;
    }
  }

  createReview(formData) {
    if (!this.old) {
      if (this.reviewForm.$valid) {
        this.api.createReview(this.id, formData, this.auth.token).then(() => {
          this.reviewForm.$setPristine();
          this.reviewForm.$setUntouched();
          this.review.description = '';
          this.review.rating = 0;
          return this.created();
        });
      }
    } else {
      formData.coffee = this.id;
      this.api.updateReview(this.old.id, formData, this.auth.token).then(() => {
        this.review.edit = false;
        return this.created();
      });

    }
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
        created: '&',
        old: '='
			},
			bindToController: true,
			controller: CreateReview ,
			controllerAs: 'ctrl'
		};
	});
