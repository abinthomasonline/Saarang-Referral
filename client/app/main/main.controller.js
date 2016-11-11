'use strict';

(function() {

  class MainController {

    constructor($http, $stateParams, Auth, $window) {
      this.$http = $http;
      this.$stateParams = $stateParams;
      this.$window = $window;

      this.isLoggedIn = Auth.isLoggedIn;
      this.getCurrentUser = Auth.getCurrentUser;

      this.referralLink = "mainUrl/" + this.getCurrentUser()._id;
    }

    $onInit() {
      //populate tiles
      this.tiles = [{value: 1, class: 'tile'},
                    {value: 2, class: 'tile'},
                    {value: 3, class: 'tile'},
                    {value: 4, class: 'tile'},
                    {value: 5, class: 'tile'},
                    {value: 6, class: 'tile'},
                    {value: 7, class: 'tile'},
                    {value: 8, class: 'tile'},
                    {value: 9, class: 'tile'}];

      //check if reffered
      if(!this.$stateParams.referralId) {
        this.isReferred = false;
      }else {
        this.isReferred = true;
        //request to get referrer name
        this.$http.get('/api/users/' + this.$stateParams.referralId)
          .then(response => {
            this.referredUser = response.data;
          })
          .catch(err => {
            this.isReferred = false;
          });
      }

      //check if submitted
      if(this.isLoggedIn()) {
        this.$http.get('/api/users/me')
        .then(response => {
          this.isSubmitted = response.data.submitted;
        });
      }
    }

    selectTile(tile) {
      if(tile.class === 'tile') {
        tile.class = 'tile selected';
      }else {
        tile.class = 'tile';
      }
    }

    submit() {
      if(this.isLoggedIn()) {
        //update tile count
        for(var i = 0; i<this.tiles.length; ++i) {
          if(this.tiles[i].class === 'tile selected'){
            this.$http.put('/api/tiles/'+this.tiles[i].value);
          }
        }
        //update user count
        this.$http.put('/api/users/' + this.$stateParams.referralId);
        //update submitted
        this.$http.put('/api/users/me/');
        this.isSubmitted = true;
      }else {
        this.$window.location.href = '/auth/facebook';
      }
    }

    shareOnFB() {
      this.$window.location.href = 'https://www.facebook.com/share.php?u=' + this.referralLink;
    }
  }

  angular.module('srApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
