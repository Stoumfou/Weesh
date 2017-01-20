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