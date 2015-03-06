'use strict';

class FabMenu {
	constructor() {
    this.open = false;
  }

  toggleMenu() {
    this.open = !this.open;
  }
}

export default angular.module('fabMenu', [])
	.directive('fabMenu', function() {
		return {
			templateUrl: 'components/fab-menu/fab-menu.html',
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
			controller: FabMenu ,
			controllerAs: 'ctrl'
		};
	});
