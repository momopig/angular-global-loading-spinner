
var angular = require('angular');
var loadingSpinner = angular.module('loadingSpinner', []);
require('./core/index.js')(loadingSpinner);
module.exports = {
    loadingSpinner: loadingSpinner
};
