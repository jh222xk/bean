'use strict';

class Api {
	constructor($http) {
    this.$http = $http;
    this.format = 'json';
    this.key = 'faa8b00f6250385c555eca4b0bbfe27932d133c6';
    this.url = `http://localhost:8000/api/v1/coffeehouses/?key=${this.key}&format=${this.format}`;
  }

  getPlaces() {
    return this.$http.get(this.url);
  }

  getPlace(id) {
    return this.$http.get(`http://localhost:8000/api/v1/coffeehouses/${id}/?key=${this.key}&format=${this.format}`);
  }
}

export default angular.module('api', [])
	.service('api', Api);
