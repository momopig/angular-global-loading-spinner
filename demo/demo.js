var demo = angular.module('demo', ['globalLoading']);
demo.controller("DemoController", ['$scope', '$http', function ($scope, $http) {
    $scope.loadingConfig = {
        excludeApis: [{method:'get', url: '/api/site/entry'}],	// 站点列表页面,需要轮训该接口,所以排除该loading
        timeout: 5000, //设置5秒的超时时间
        timeoutCallback: function () {
            console.error('请求超时');
        }
    };
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
