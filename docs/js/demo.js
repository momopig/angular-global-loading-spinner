var demo = angular.module('demo', ['loadingSpinner']);

// It suggests that the loadingConifg declare in global code area, as a attribute of $rootScope
demo.config(['$httpProvider', function($httpProvider) {

    // Inject $rootScope in interceptors, unable to inject in app's config function
    $httpProvider.interceptors.push(function ($rootScope) {
        $rootScope.loadingConfig = {
            text: 'Processing, please wait...',
            // excludeApis: [{method: 'get', url: '/api/site/entry'}],	// 站点列表页面,需要5s轮询该接口以刷新列表, loading 样式也会5s显示一次，影响用户体验，所以排除该loading
            excludeApis: [{method: 'get', url: 'http://bigdata.sz.haizhi.com/api/search/es_suggest'}],	// 站点列表页面,需要5s轮询该接口以刷新列表, loading 样式也会5s显示一次，影响用户体验，所以排除该loading
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
            url: 'js/demo.js',
             params: {
                 pageno: 1
             }
        });
    };
    $scope.sendHttpRequest = function() {
        $http({
            method: 'get',
            // url: '/api/site/seed',
            url: 'http://bigdata.sz.haizhi.com/api/search/es_suggest?key_word=4&type=_all&count=5&t=1516411062800&_=1516411057020',
            params: {
                pageno: 1
            }
        });
    };
    $scope.sendExcludeHttpRequest = function() {
        $http({
            method: 'get',
            // url: '/api/site/entry',
            url: 'http://bigdata.sz.haizhi.com/api/search/es_suggest',
            params: {
                key_word: 4,
                type: '_all',
                count: 5
            }
        });
    };
}])
