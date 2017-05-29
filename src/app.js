
var angular = require('angular');
var globalLoading = angular.module('globalLoading', []);
require('./core/index.js')(globalLoading);
module.exports = {
    globalLoading: globalLoading
};
