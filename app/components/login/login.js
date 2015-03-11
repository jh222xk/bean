'use strict';

import Auth from '../../scripts/services/auth.js';

class Login {
	constructor(auth, $mdDialog) {
    this.auth = auth;
    this.$mdDialog = $mdDialog;
  }

  isAuthorized(ev) {
    this.auth.currentUser ? this.auth.logout() : this.showLogin(ev);
  }

  showLogin(ev) {
    this.$mdDialog.show({
      targetEvent: ev,
      templateUrl: 'components/login/form.html',
      controller: (scope, $mdDialog) => {
        scope.error = false;
        scope.closeDialog = () => $mdDialog.hide();

        scope.login = (formData) => {
          console.log(formData);
          this.auth.login(formData).then(function() {
            $mdDialog.hide();
          }).catch(() => {
            scope.error = true;
          });
        };
      }
    });
  }
}

export default angular.module('login', [Auth.name])
	.directive('login', function() {
		return {
			templateUrl: 'components/login/login.html',
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
			controller: Login ,
			controllerAs: 'ctrl'
		};
	});
