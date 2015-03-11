'use strict';

class Api {
	constructor($http) {
    this.$http = $http;
    this.format = 'json';
    this.key = 'faa8b00f6250385c555eca4b0bbfe27932d133c6';
    this.url = `http://localhost:8000/api/v1`;
  }

  get(path) {
    let req = {
      method: 'GET',
      url: `${this.url}${path}`,
      headers: {
        'Content-Type': this.format
      },
      params: {
        key: this.key
      }
    };
    return this.$http(req);
  }

  getPlaces(latitude, longitude) {
    return this.get(`/coffeehouses/?latitude=${latitude}&longitude=${longitude}`);
  }

  getPlace(id) {
    return this.get(`/coffeehouses/${id}`);
  }

  login(data) {
    return this.$http.post(this.url + `/auth/`, {username: data.username, password: data.password}).catch((e) => {
      if (e.status === 400) {
        throw false;
      }
      return true;
    });
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
