angular.module('weesh').controller('MainCtrl', [
        '$scope',
        'auth',
        function ($scope, auth) {
            $scope.test = "Hello world!";

            $scope.isLoggedIn = auth.isLoggedIn;
        }
    ]);