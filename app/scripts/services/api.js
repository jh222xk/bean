'use strict';

import {default as Storage, Type, Time} from '../../scripts/services/storage.js';

class Api {
	constructor($http, storage) {
    this.$http = $http;
    this.format = 'json';
    this.key = 'faa8b00f6250385c555eca4b0bbfe27932d133c6';
    this.url = `http://128.199.44.244:1337/api/v1`;
    this.storage = storage;
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

  getPlaces(query, latitude, longitude, search = false) {
    let cachedData = this.storage.get('places', Type.Local);
    if (cachedData && new Date().getTime() - new Date(cachedData.timestamp) < Time.TEN_MIN && search === false) {
      let obj = { data: {results: cachedData.data } };
      return Promise.resolve(obj);
    } else {
      return this.get(`/coffeehouses/` + '?query=' + query + `&latitude=${latitude}&longitude=${longitude}`).then((data) => {
        if (search === false) {
          this.storage.save('places', data.data.results, Type.Local);
        }
        return data;
      });
    }
  }

  getPlace(id) {
    return this.get(`/coffeehouses/${id}/`).catch((e) => {
      if(e.status === 404) {
        throw false;
      }
      return true;
    });
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

  getTags() {
    return this.get(`/tags/`);
  }

}

export default angular.module('api', [Storage.name])
	.service('api', Api);
