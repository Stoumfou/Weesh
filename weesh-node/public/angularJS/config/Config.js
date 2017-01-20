angular.module('weesh').config([
        '$stateProvider'
        , '$urlRouterProvider'


    
    , function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home'
            , templateUrl: '/home.ejs'
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
            , templateUrl: '/myLists.ejs'
            , controller: 'AuthCtrl'
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
                    }]
        }).state('mySettings', {
            url: '/mySettings'
            , templateUrl: '/mySettings.ejs'
            , controller: 'AuthCtrl'
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
                    }]
        }).state('myProducts', {
            url: '/myProducts'
            , templateUrl: '/myProducts.ejs'
            , controller: 'AuthCtrl'
            , onEnter: ['$state', 'auth', function ($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
                    }]
        }).state('register', {
            url: '/register'
            , templateUrl: '/register.ejs'
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