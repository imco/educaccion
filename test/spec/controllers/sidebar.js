'use strict';

describe('Controller: SidebarCtrl', function () {

  // load the controller's module
  beforeEach(module('caminoAlExitoApp'));

  var SidebarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidebarCtrl = $controller('SidebarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

/*  it('should close defined', function () {
    expect(scope.close).to.be.a('function');
  });*/
});
