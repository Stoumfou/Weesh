angular.module('weesh').config([
    '$ocLazyLoadProvider'
    , '$stateProvider'
    , '$urlRouterProvider'
     , "$mdThemingProvider"



    
    , function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider) {
        var controllerPath = "/public/angularJS/controllers/";
        //Config for ocLazyLoading
        $ocLazyLoadProvider.config({
            'debug': true, // For debugging 'true/false'
            'events': true, // For Event 'true/false'
            'modules': [{ // Set modules initially
                name: 'home', // home state
                files: [controllerPath + 'MainCtrl.js']
            }, {
                name: 'register', // home state
                files: [controllerPath + 'AuthCtrl.js']
            }]
        });
        $mdThemingProvider.theme('default').primaryPalette('purple').accentPalette('orange');
        $stateProvider.state('home', {
            url: '/home'
            , templateUrl: '/partials/home.ejs'
            , controller: 'MainCtrl'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('home'); // Resolve promise and load before view 
                }]
            }
        }).state('login', {
            url: '/login'
            , templateUrl: '/partials/login.ejs'
            , controller: 'AuthCtrl'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('register'); // Resolve promise and load before view 
                }]
            }
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
            }]
        }).state('myLists', {
            url: '/myLists'
            , templateUrl: '/partials/myLists.ejs'
            , controller: 'AuthCtrl'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('register'); // Resolve promise and load before view 
                }]
            }
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
            }]
        }).state('mySettings', {
            url: '/mySettings'
            , templateUrl: '/partials/mySettings.ejs'
            , controller: 'AuthCtrl'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('register'); // Resolve promise and load before view 
                }]
            }
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
            }]
        }).state('myProducts', {
            url: '/myProducts'
            , templateUrl: '/partials/myProducts.ejs'
            , controller: 'AuthCtrl'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('register'); // Resolve promise and load before view 
                }]
            }
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
            }]
        }).state('register', {
            url: '/register'
            , templateUrl: '/partials/register.ejs'
            , controller: 'AuthCtrl'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('register'); // Resolve promise and load before view 
                }]
            }
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
            }]
        });
        $urlRouterProvider.otherwise('home');
    }
]);