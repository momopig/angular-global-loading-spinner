var tpl = require('./index.html');
var style = require('./index.css');

module.exports = function(mod) {

	mod.directive('globalLoading', ['$window', '$http', '$timeout', function($window, $http, $timeout) {
		return {
			restrict: 'EA',
			replace: true,
			transclde: true,
			scope:{
				loadingConfig: '='
			},
			template: tpl,
			link: function (scope, elm, attrs) {

				var pendingLength = 0,
					i, l, apiObj;

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
				scope.$watch(scope.isLoading, function (v)
				{
                    if(typeof scope.loadingConfig.timeout === 'number') {
                        $timeout(function() {
                            var pendingLength = $http.pendingRequests.length;
                            if (pendingLength > 0) {
							$(elm).hide();
                                $http.pendingRequests = [];
                                if (typeof scope.loadingConfig.timeoutCallback === 'function') {
                                    scope.loadingConfig.timeoutCallback();
								}
                            }
                        }, scope.loadingConfig.timeout);
                    }
					if(v){
						$(elm).show();
					}else{
                        $(elm).hide();
					}
				});
			}
		};
	}]);
}