'use strict';

describe('Component: <create-review>', function () {

  // load the directive's module
  beforeEach(module('createReview'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-review></create-review>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <create-review> component');
  }));
});
