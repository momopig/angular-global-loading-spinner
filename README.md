## Demo
[click here to the demo](http://jsrun.net/GhYKp/show)

## Description
+ Angular-global-loading is a directive that will **detect all the http requests**. When a http request is sent, the loading spinner will show automatically, and disappears automatically as soon as the request finishes, and you can exclude the requests that you want to ignore. It makes the code clean and simple.
+ The angular version is **1.x**

## Usage
### 1. import the libs(Jquery, angular and the current directive)
	<!DOCTYPE html>
	<html ng-app="demo">
    <head>
        <title>angular-global-loading-spinner</title>
    </head>
    <body>
        <div class="main" ng-controller="DemoController">
            <global-loading  loading-config="loadingConfig" ></global-loading>
         </div>
        <script type="text/javascript" src="jquery/dist/jquery.min.js"></script>
        <script type="text/javascript" src="angular/angular.min.js"></script>
        <script type="text/javascript" src="js/angular-global-loading-spinner.js"></script>
        <script type="text/javascript" src="demo.js"></script>
    </body>
    </html>

### 2. Use the globalLoading directive and define loadingConfig Object
    var demo = angular.module('demo', ['globalLoading']);

    // It suggests that the loadingConifg declare in global code area, as a attribute of $rootScope
    demo.config(['$httpProvider', function($httpProvider) {

    // Inject $rootScope in interceptors, unable to inject in app's config function
    $httpProvider.interceptors.push(function ($rootScope) {
        $rootScope.loadingConfig = {
            text: 'Processing, please wait...',
            excludeApis: [{method: 'get', url: '/api/site/entry'}],
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

### 3.Send a http Request
#### JS Code
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
#### HTML Code

        <div class="main" ng-controller="DemoController">
            <global-loading  loading-config="loadingConfig" ></global-loading>
            <div>＊＊ In order to  observe the effect of experiment in a better way, you should turn on the network tab of console  ＊＊</div>
            <div>
                <button ng-click="sendHttpRequest()">1. send a http request(ps：set the timeout config as 5s, the timeout msgs will be shown in console)</button>
            </div>
            <div>
                <button ng-click="getFile()">2. send a http request to get a local file(ps:，an invitably successful request, the loading style flashes out on the screen)</button>
            </div>
            <div>
                <button ng-click="sendExcludeHttpRequest()">3. send an excluded http request（ps：Because the request has been excluded, the loading style will not be shown）</button>
            </div>
        </div>

## Deployment
1. npm install
2. gulp demo