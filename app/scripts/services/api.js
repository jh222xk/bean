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

  /**
   * Setup for get request
   * @param path
   * @returns {*}
   */
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

  /**
   * Setup for post request
   * @param path
   * @param data
   * @returns {*}
   */
  post(path, data) {
    let req = {
      method: 'POST',
      url: `${this.url}${path}`,
      data: data
    };
    return this.$http(req);
  }

  /**
   * Setup for delete request
   * @param path
   * @param jwt
   * @returns {*}
   */
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

  /**
   * Setup for the update request
   * @param path
   * @param data
   * @param jwt
   * @returns {*}
   */
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

  /**
   * Get all places depending on the given params
   * @param query
   * @param latitude
   * @param longitude
   * @param search
   * @returns {*}
   */
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

  /**
   * Get a single place
   * @param id
   * @returns {*}
   */
  getPlace(id) {
    return this.get(`/coffeehouses/${id}/`).catch((e) => {
      if(e.status === 404) {
        throw false;
      }
      return true;
    });
  }

  /**
   *
   * @param data
   * @returns {*}
   */
  login(data) {
    return this.post(`/auth/`, {username: data.username, password: data.password}).catch((e) => {
      if (e.status === 400) {
        throw false;
      }
      return true;
    });
  }

  /**
   * Create a review bound to a given coffehouse
   * @param coffeehouse
   * @param data
   * @param key
   * @returns {*}
   */
  createReview(coffeehouse, data, key) {
    this.$http.defaults.headers.common.Authorization = `JWT ${key}`;
    return this.$http.post(this.url + `/reviews/`, {
      coffee: coffeehouse,
      description: data.description,
      rating: data.rating
    });
  }

  /**
   * Deletes a given review
   * @param review
   * @param jwt
   * @returns {*}
   */
  deleteReview(review, jwt) {
    return this.delete(`/reviews/${review}/`, jwt);
  }

  /**
   * Updates a given review
   * @param review
   * @param data
   * @param jwt
   * @returns {*}
   */
  updateReview(review, data, jwt) {
    return this.update(`/reviews/${review}/`, data, jwt);
  }

  /**
   * Get all tags
   * @returns {*}
   */
  getTags() {
    return this.get(`/tags/`);
  }

}

export default angular.module('api', [Storage.name])
	.service('api', Api);
