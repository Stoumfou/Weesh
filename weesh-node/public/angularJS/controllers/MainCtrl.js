angular.module('weesh').controller('MainCtrl', [
        '$scope',
        'auth',
        function ($scope, auth) {
            $scope.isLoggedIn = auth.isLoggedIn;
        }
    ]);