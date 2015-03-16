'use strict';

describe('Component: <place-map>', function () {

  // load the directive's module
  beforeEach(module('placeMap'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<place-map></place-map>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <place-map> component');
  }));
});
