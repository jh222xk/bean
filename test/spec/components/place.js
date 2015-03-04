'use strict';

describe('Component: <place>', function () {

  // load the directive's module
  beforeEach(module('place'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<place></place>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <place> component');
  }));
});
