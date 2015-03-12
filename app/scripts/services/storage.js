'use strict';


export const Type = {
  Session: 0,
  Local: 1
};

class Storage {
	constructor($window) {
    this.sessionStorage = $window.sessionStorage;
    this.localStorage = $window.localStorage;
  }

  save(id, data, type) {
    if (type === Type.Session) {
      this.sessionStorage.setItem(id, angular.toJson(data));
    } else if (type === Type.Local) {
      this.localStorage.setItem(id, angular.toJson(data));
    }
  }

  remove(id) {
    this.sessionStorage.removeItem(id);
  }

  get(id) {
    let data;
    try {
      data = angular.fromJson(this.sessionStorage.getItem(id));
    } catch(e) {
      return;
    }
    return data;
  }
}

export default angular.module('storage', [])
	.service('storage', Storage );
