'use strict';

class Storage {
	constructor($window) {
    this.$sessionStorage = $window.sessionStorage;
  }

  save(id, data) {
    this.$sessionStorage.setItem(id, angular.toJson(data));
  }

  remove(id) {
    this.$sessionStorage.removeItem(id);
  }

  get(id) {
    return angular.fromJson(this.$sessionStorage.getItem(id));
  }
}

export default angular.module('storage', [])
	.service('storage', Storage );
