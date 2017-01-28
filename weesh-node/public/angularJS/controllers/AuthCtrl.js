angular.module('weesh', ['ui.bootstrap', 'ngMaterial']).config(function ($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
}).controller('AuthCtrl', [
    '$scope'
    , '$state'
    , 'auth'















    
    , function ($scope, $state, auth) {
        console.log("enter AuthCtrl");
        $scope.user = {
            'username': 'Panda'
            , 'lastName': 'a'
            , 'firstName': 'b'
            , 'email': 'patate@gmail.com'
            , 'password': 'pass'
            , 'gender': 'f'
            , 'birthDate': 'new Date();'
            , 'address': {
                'city': 'Boulogne'
                , 'street': 'rue de sèvres'
                , "zip": "92100"
            }
        };
        $scope.user.birthDate = new Date();
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
}]);