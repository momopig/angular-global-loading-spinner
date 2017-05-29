var demo = angular.module('demo', ['globalLoading']);

// it suggests that the loadingConifg declare in global code area
demo.config(['$httpProvider', function($httpProvider) {

    //inject $rootScope in interceptors, unable to inject in app's config function
    $httpProvider.interceptors.push(function ($rootScope) {
        $rootScope.loadingConfig = {
            excludeApis: [{method: 'get', url: '/api/site/entry'}],	// 站点列表页面,需要5s轮询该接口以刷新列表, loading 样式也会5s显示一次，影响用户体验，所以排除该loading
            timeout: 5000,
            timeoutCallback: function () {
                console.error('request timeout');
            }
        };
        return {
            'request': function(config) {
                if ($rootScope.loadingConfig.timeout !== undefined) {
                    config.timeout = $rootScope.loadingConfig.timeout;
                }
                return config;
            }
        };
    });
}]);
demo.controller("DemoController", ['$scope', '$http', '$rootScope', function ($scope, $http) {

    $scope.getFile = function() {
         $http({
            method: 'get',
            url: '/demo.js',
             params: {
                 pageno: 1
             }
        });
    };
    $scope.sendHttpRequest = function() {
        $http({
            method: 'get',
            url: '/api/site/seed',
            params: {
                pageno: 1
            }
        });
    };
    $scope.sendExcludeHttpRequest = function() {
        $http({
            method: 'get',
            url: '/api/site/entry',
            params: {
                pageno: 1
            }
        });
    };
}])
