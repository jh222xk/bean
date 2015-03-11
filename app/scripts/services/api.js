'use strict';

class Api {
	constructor($http) {
    this.$http = $http;
    this.format = 'json';
    this.key = 'faa8b00f6250385c555eca4b0bbfe27932d133c6';
    this.url = `http://localhost:8000/api/v1`;
  }

  getPlaces(latitude, longitude) {
    return this.$http.get(this.url + `/coffeehouses/?key=${this.key}&latitude=${latitude}&longitude=${longitude}&format=${this.format}`);
  }

  getPlace(id) {
    return this.$http.get(this.url + `/coffeehouses/${id}/?key=${this.key}&format=${this.format}`);
  }

  login(data) {
    return this.$http.post(this.url + `/auth/`, {username: data.username, password: data.password});
  }


  createReview(coffeehouse, data, key) {
    this.$http.defaults.headers.common.Authorization = `JWT ${key}`;
    return this.$http.post(this.url + `/reviews/`, {
      coffee: coffeehouse,
      description: data.description,
      rating: data.rating
    });
  }

}

export default angular.module('api', [])
	.service('api', Api);
