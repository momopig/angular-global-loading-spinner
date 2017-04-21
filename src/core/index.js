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
				if(typeof scope.loadingConfig.timeout === 'number') {
					$timeout(function() {
						if (pendingLength > 0) {
							elm.hide();
							console.error('请求超时');
						}
					}, scope.loadingConfig.timeout);
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

				scope.$watch(scope.isLoading, function (v)
				{
					if(v){
						elm.show();
					}else{
						elm.hide();
					}
				});
			}
		};
	}]);
}