angular.module('weesh').controller('AuthCtrl', [
    '$scope'
    , '$state'
    , 'auth'




    
    , function ($scope, $state, auth) {
        $scope.user = {
            'username': 'Panda'
            , 'lastName': 'a'
            , 'firstName': 'b'
            , 'email': ''
            , 'password': 'pass'
            , 'gender': 'f'
            , 'address': {
                'city': 'Boulogne'
                , 'street': 'rue de sèvres'
                , "zip": "92100"
            }
            , birthDate: ''
        };
        $scope.user.birthDate = new Date();
        $scope.minDate = new Date($scope.user.birthDate.getFullYear(), $scope.user.birthDate.getMonth() - 2, $scope.user.birthDate.getDate());
        $scope.maxDate = new Date($scope.user.birthDate.getFullYear(), $scope.user.birthDate.getMonth() + 2, $scope.user.birthDate.getDate());
        $scope.register = function () {
            auth.register($scope.user).then(function success() {
                $state.go('home');
            }, function error(error) {
                $scope.error = error;
            });
        };
        $scope.logIn = function () {
            auth.logIn($scope.user).then(function success() {
                $state.go('home');
            }, function error(error) {
                $scope.error = error;
            });
        };
    }
]);