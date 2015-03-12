'use strict';

class Api {
	constructor($http) {
    this.$http = $http;
    this.format = 'json';
    this.key = 'faa8b00f6250385c555eca4b0bbfe27932d133c6';
    this.url = `http://128.199.44.244:1337/api/v1`;
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

  post(path, data) {
    let req = {
      method: 'POST',
      url: `${this.url}${path}`,
      data: data
    };
    console.log(req);
    return this.$http(req);
  }

  delete(path, jwt) {
    let req = {
      method: 'DELETE',
      url: `${this.url}${path}`,
      headers: {
        'Authorization': `JWT ${jwt}`
      }
    };
    return this.$http(req);
  }

  update(path, data, jwt) {
    let req = {
      method: 'PUT',
      url: `${this.url}${path}`,
      headers: {
        'Authorization': `JWT ${jwt}`
      },
      data: data
    };
    return this.$http(req);
  }

  getPlaces(query, latitude, longitude) {
    return this.get(`/coffeehouses/` + '?query=' + encodeURI(query) + `&latitude=${latitude}&longitude=${longitude}`);
  }

  getPlace(id) {
    return this.get(`/coffeehouses/${id}/`);
  }

  login(data) {
    return this.post(`/auth/`, {username: data.username, password: data.password}).catch((e) => {
      if (e.status === 400) {
        throw false;
      }
      return true;
    });
  }

  createReview(coffeehouse, data, key) {
    //console.log(key);
    this.$http.defaults.headers.common.Authorization = `JWT ${key}`;
    return this.$http.post(this.url + `/reviews/`, {
      coffee: coffeehouse,
      description: data.description,
      rating: data.rating
    });
  }

  deleteReview(review, jwt) {
    return this.delete(`/reviews/${review}/`, jwt);
  }

  updateReview(review, data, jwt) {
    console.log(jwt);
    return this.update(`/reviews/${review}/`, data, jwt);
  }

}

export default angular.module('api', [])
	.service('api', Api);
