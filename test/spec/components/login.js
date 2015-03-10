'use strict';

describe('Component: <login>', function () {

  // load the directive's module
  beforeEach(module('login'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<login></login>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <login> component');
  }));
});
