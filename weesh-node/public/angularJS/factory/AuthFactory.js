angular.module('weesh').factory('auth', ['$http', '$window', '$rootScope', function ($http, $window, $rootScope) {
        var auth = {
            saveToken: function (token) {
                $window.localStorage['weesh-token'] = token;
            },
            getToken: function () {
                return $window.localStorage['weesh-token'];
            },
            isLoggedIn: function () {
                var token = auth.getToken();
                if (token) {
                    var payload = JSON.parse($window.atob(token.split('.')[1]));
                    return payload.exp > Date.now() / 1000;
                } else {
                    return false;
                }
            },
            currentUser: function () {
                if (auth.isLoggedIn()) {
                    var token = auth.getToken();
                    var payload = JSON.parse($window.atob(token.split('.')[1]));
                    return payload.username;
                }
            },
            register: function (user) {
                return $http.post('/register', user).then(function (data) {
                    auth.saveToken(data.data.token);
                });
            },
            logIn: function (user) {
                return $http.post('/login', user).then(function (data) {
                    auth.saveToken(data.data.token);
                });
            },
            logOut: function () {
                $window.localStorage.removeItem('weesh-token');
            }
        };
        return auth;
    }]);