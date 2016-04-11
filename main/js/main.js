/**
 * Created with IntelliJ IDEA.
 * User: Mateusz
 * Date: 14.11.12
 * Time: 18:58
 */
'use strict';
var systemInfo = {
    version:'1.0.0',
    debug:true
};

(function () {
    document.getElementById('version').innerHTML=systemInfo.version;
})();

require.config({
    //baseUrl: 'js',
    waitSeconds: 0,
    paths: {
        text: '../lib/text/text',
        jquery: '../lib/jquery/dist/jquery.min',
        angular: '../lib/angular/angular',
        bootstrap: '../lib/bootstrap/dist/js/bootstrap',
        bindonce: '../lib/angular-bindonce/bindonce.min',
       
       
        uiRoute: '../lib/angular-ui-router/release/angular-ui-router',
        oclazyload: '../lib/oclazyload/dist/ocLazyLoad',
        ngAnimate:'../lib/angular-animate/angular-animate.min',
        ngLoading:'../lib/angular-loading-bar/build/loading-bar.min',
        
        app: 'app',
        host:'../host',
        common: 'common'

    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'bindonce': {
            deps: ['angular']
        },
        'ngBootstrap': {
            deps: ['angular']
        },
       
        'uiRoute': {
            deps: ['angular']
        },
        'oclazyload': {
            deps: ['angular']
        },
        'ngAnimate': {
            deps: ['angular']
        },
        'ngLoading': {
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jquery']
        }
    },
    priority: [
        'angular'
    ],
    urlArgs: "v="+(systemInfo.debug? (new Date()).getTime():systemInfo.version)
});

require([
    'angular',
    'jquery',
    'text',
    'app',
    'routes',
    'bootstrap'
], function(angular,$) {
    //This function will be called when all the dependencies
    //listed above are loaded. Note that this function could
    //be called before the page is loaded.
    //This callback is optional.
    $(document).ready(function() {
        var appName = $('body').attr('data-ngApp');
        angular.bootstrap(document, [appName]);
    });
});
