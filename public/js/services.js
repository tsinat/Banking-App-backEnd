'use strict';

var app = angular.module('myapp');

app.service('Balance', function($http) {

  this.getAll = () => {
    return $http.get('/api/balances');
  };

  this.create = balance => {
    return $http.post('/api/balances', balance);
  };

  this.remove = balance => {
    return $http.delete(`/api/balances/${balance.id}`);
  };
  this.edit = balance => {
      return $http.put(`/api/balances/${balance.id}`, balance);
  }
});
