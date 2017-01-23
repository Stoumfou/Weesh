angular.module('weesh').config([
        '$stateProvider'
        , '$urlRouterProvider'


    
    , function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home'
            , templateUrl: '/partials/home.ejs'
            , controller: 'MainCtrl'
        }).state('login', {
            url: '/login'
            , templateUrl: '/login.ejs'
            , controller: 'AuthCtrl'
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
                    }]
        }).state('myLists', {
            url: '/myLists'
            , templateUrl: '/partials/myLists.ejs'
            , controller: 'AuthCtrl'
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
                    }]
        }).state('mySettings', {
            url: '/mySettings'
            , templateUrl: '/partials/mySettings.ejs'
            , controller: 'AuthCtrl'
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
                    }]
        }).state('myProducts', {
            url: '/myProducts'
            , templateUrl: '/partials/myProducts.ejs'
            , controller: 'AuthCtrl'
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
                    }]
        }).state('register', {
            url: '/register'
            , templateUrl: '/partials/register.ejs'
            , controller: 'AuthCtrl'
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
                    }]
        });
        $urlRouterProvider.otherwise('home');
        }
    ]);