angular.module('weesh').controller('AuthCtrl', [
    '$scope'
    , '$state'
    , 'auth'






    
    , function ($scope, $state, auth) {
        $scope.user = {
            'name': 'Jean-Eude'
            , 'email': ''
            , 'mot de passe': ''
        };
        $scope.register = function () {
            auth.register($scope.user).error(function (error) {
                $scope.error = error;
            }).then(function () {
                $state.go('home');
            });
        };
        $scope.logIn = function () {
            auth.logIn($scope.user).error(function (error) {
                $scope.error = error;
            }).then(function () {
                $state.go('home');
            });
        };
    }
]);