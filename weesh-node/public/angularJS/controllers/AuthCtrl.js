angular.module('weesh').controller('AuthCtrl', [
    '$scope'
    , '$state'
    , 'auth'







    
    , function ($scope, $state, auth) {
        $scope.user = {
            'username': 'Jeans1'
            , 'lastName': 'olo'
            , 'firstName': 'lalal'
            , 'email': 'lepere@gmail.com'
            , 'password': 'papapapapapap'
            , 'gender': 'm'
            , 'address': ''
            , birthDate: ''
        };
        $scope.user.birthDate = new Date();
        $scope.minDate = new Date($scope.user.birthDate.getFullYear(), $scope.user.birthDate.getMonth() - 2, $scope.user.birthDate.getDate());
        $scope.maxDate = new Date($scope.user.birthDate.getFullYear(), $scope.user.birthDate.getMonth() + 2, $scope.user.birthDate.getDate());
        $scope.register = function () {
            auth.register($scope.user).error(function (error) {
                $scope.error = error;
            }).then(function () {
                $state.go('home');
            });
        };
        $scope.logIn = function () {
            auth.logIn($scope.user).error(function (error) {
                /* $scope.error = error;*/
            }).then(function () {
                $state.go('home');
            });
        };
    }
]);