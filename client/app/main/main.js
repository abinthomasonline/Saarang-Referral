'use strict';

angular.module('srApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/{referralId}',
      template: '<main></main>'
    });
  });
