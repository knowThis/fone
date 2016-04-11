'use strict';

define(['app'], function(app) {

    return app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            jsLoader: requirejs,
            debug: true
        });
        //默认的路由
        $urlRouterProvider.otherwise("/");
        //设置路由-状态
        $stateProvider
            .state('index', {
                url: "/",
                templateUrl: 'modules/index/index.html',
                controller: 'indexCtrl',
                resolve: { 
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'indexCtrl',
                            files: ['modules/index/indexCtrl.js']
                        });
                    }]
                }
            })

    }]);

    return app;
});
