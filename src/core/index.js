var tpl = require('./index.html');
var style = require('./index.css');

module.exports = function(mod) {
	mod.directive('loadingSpinner', ['$http', '$timeout', function($http, $timeout) {
		return {
			restrict: 'EA',
			replace: true,
			transclde: true,
			template: tpl,
			scope: {
				loadingConfig: '='
			},
			link: function (scope, elm, attrs) {

				var pendingLength = 0;
				var i, l;
				var apiObj;
				scope.isShow = false;

				if (!scope.loadingConfig.text) {
                    scope.loadingConfig.text = 'Processing, please wait.';
				}
				scope.isLoading = function () {
					pendingLength = $http.pendingRequests.length;
					$http.pendingRequests.forEach(function(item){
						for(i = 0, l = scope.loadingConfig.excludeApis.length; i < l; i++) {
							apiObj = scope.loadingConfig.excludeApis[i];
							if(item.url === apiObj.url && item.method === apiObj.method.toUpperCase()) {
								pendingLength--;
							}
						}
					});
					return pendingLength > 0;
				};

				/*
				*  isLoading fn  gets called multiple times per digest,
				* the watch callback will be called when the isLoading fn's return value changes.
				*
				* */
				scope.$watch(scope.isLoading, function (v) {
					if(v){
                        scope.isShow = true;
                        if (typeof scope.loadingConfig.timeout === 'number' &&
                            typeof scope.loadingConfig.timeoutCallback === 'function') {
                            $timeout(function() {
                                    scope.loadingConfig.timeoutCallback();
                            }, scope.loadingConfig.timeout);
                        }
					}else{
                        scope.isShow = false;
					}
				});
			}
		};
	}]);
}