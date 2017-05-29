var tpl = require('./index.html');
var style = require('./index.css');

module.exports = function(mod) {

	mod.directive('globalLoading', ['$http', '$timeout', '$rootScope', function($http, $timeout, $rootScope) {
		return {
			restrict: 'EA',
			replace: true,
			transclde: true,
			template: tpl,
			link: function (scope, elm, attrs) {

				var pendingLength = 0,
					i, l, apiObj;

				scope.isLoading = function () {
					pendingLength = $http.pendingRequests.length;

					$http.pendingRequests.forEach(function(item){
						for(i = 0, l = $rootScope.loadingConfig.excludeApis.length; i < l; i++) {
							apiObj = $rootScope.loadingConfig.excludeApis[i];
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
						$(elm).show();
                        if (typeof $rootScope.loadingConfig.timeout === 'number' &&
                            typeof $rootScope.loadingConfig.timeoutCallback === 'function') {
                            $timeout(function() {
                                    $rootScope.loadingConfig.timeoutCallback();
                            }, $rootScope.loadingConfig.timeout);
                        }
					}else{
                        $(elm).hide();
					}
				});
			}
		};
	}]);
}