'use strict';

import Storage from '../../scripts/services/storage.js';

class Auth {
	constructor(api, storage) {
    this.api = api;
    this.storage = storage;
    this.currentUser = storage.get('user');
    this.token = storage.get('token');
  }

  login(credentials) {
    return this.api.login(credentials).then(({data}) => {
      this.storage.save('token', data.token);
      this.storage.save('user', credentials.username);
      this.setCurrentUser(credentials.username);
    });
  }

  logout() {
    this.storage.remove('user');
    this.setCurrentUser(null);
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }
}

export default angular.module('auth', [Storage.name])
	.service('auth', Auth );
