'use strict';

describe('Component: <review>', function () {

  // load the directive's module
  beforeEach(module('review'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<review></review>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <review> component');
  }));
});
