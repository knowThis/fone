/**
 * Created with IntelliJ IDEA.
 * User: Mateusz
 * Date: 17.11.12
 * Time: 15:22
 */
'use strict';

define(['angular', 'math','host', 'bindonce', 'common', 'uiRoute',
    'oclazyload','ngAnimate','ngLoading'],
    function(angular, MATH,host) {
    var myApp = angular.module('myApp', ['app.common', 'pasvaz.bindonce', 'ui.router',
        'oc.lazyLoad','angular-loading-bar', 'ngAnimate']);
    myApp.filter("StringLimit", function () {
            return function(string,num) {
                if (string && string.length > num) {
                    return string.slice(0, num) + "...";
                } else {
                    return string
                }
            }})
        .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = true;
            cfpLoadingBarProvider.includeBar = true;
        }])
        .controller('admin', ['$scope', 'config', 'httpData','$location','$rootScope','$timeout',
        function($scope, config, httpData, $location,$rootScope, $timeout) {

    }]);
    return myApp;
});
