'use strict';

describe('Component: <fab-menu>', function () {

  // load the directive's module
  beforeEach(module('fabMenu'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fab-menu></fab-menu>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <fab-menu> component');
  }));
});
