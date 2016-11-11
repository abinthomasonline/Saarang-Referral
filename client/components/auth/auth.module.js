'use strict';

angular.module('srApp.auth', ['srApp.constants', 'srApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
