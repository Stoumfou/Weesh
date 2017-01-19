angular.module('weesh', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: '/login.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'auth', function($state, auth) {
                        if (auth.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                })
                .state('register', {
                    url: '/register',
                    templateUrl: '/register.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'auth', function($state, auth) {
                        if (auth.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                });

            $urlRouterProvider.otherwise('home');
        }
    ])
    .factory('auth', ['$http', '$window', '$rootScope', function($http, $window, $rootScope) {
        var auth = {
            saveToken: function(token) {
                $window.localStorage['weesh-token'] = token;
            },
            getToken: function() {
                return $window.localStorage['weesh-token'];
            },
            isLoggedIn: function() {
                var token = auth.getToken();

                if (token) {
                    var payload = JSON.parse($window.atob(token.split('.')[1]));

                    return payload.exp > Date.now() / 1000;
                } else {
                    return false;
                }
            },
            currentUser: function() {
                if (auth.isLoggedIn()) {
                    var token = auth.getToken();
                    var payload = JSON.parse($window.atob(token.split('.')[1]));

                    return payload.username;
                }
            },
            register: function(user) {
                return $http.post('/register', user).success(function(data) {
                    auth.saveToken(data.token);
                });
            },
            logIn: function(user) {
                return $http.post('/login', user).success(function(data) {
                    auth.saveToken(data.token);
                });
            },
            logOut: function() {
                $window.localStorage.removeItem('weesh-token');
            }
        };

        return auth;
    }])
    .controller('AuthCtrl', [
        '$scope',
        '$state',
        'auth',
        function($scope, $state, auth) {
            $scope.user = {};

            $scope.register = function() {
                auth.register($scope.user).error(function(error) {
                    $scope.error = error;
                }).then(function() {
                    $state.go('home');
                });
            };

            $scope.logIn = function() {
                auth.logIn($scope.user).error(function(error) {
                    $scope.error = error;
                }).then(function() {
                    $state.go('home');
                });
            };
        }
    ])
    .controller('NavCtrl', [
        '$scope',
        'auth',
        function($scope, auth) {
            $scope.isLoggedIn = auth.isLoggedIn;
            $scope.currentUser = auth.currentUser;
            $scope.logOut = auth.logOut;
        }
    ]);