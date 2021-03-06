'use strict';

import {default as Storage, Type} from '../../scripts/services/storage.js';

class Auth {
	constructor(api, storage) {
    this.api = api;
    this.storage = storage;
    this.currentUser = storage.get('user', Type.Session);
    this.token = storage.get('token', Type.Session);
  }

  /**
   * Login a given user and set data into sessionStorage.
   * @param credentials
   * @returns {*}
   */
  login(credentials) {
    return this.api.login(credentials).then(({data}) => {
      this.storage.save('token', data.token, Type.Session);
      this.token = data.token;
      this.storage.save('user', credentials.username, Type.Session);
      this.setCurrentUser(credentials.username);
    });
  }

  /**
   * Logouts the current user
   */
  logout() {
    this.storage.remove('user');
    this.storage.remove('token');
    this.setCurrentUser(null);
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }
}

export default angular.module('auth', [Storage.name])
	.service('auth', Auth );
