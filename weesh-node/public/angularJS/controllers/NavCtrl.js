angular.module('weesh').controller('NavCtrl', [
        '$scope'
        , 'auth'

    
    , function ($scope, auth) {
        console.log("enter NavCtrl");
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
        }
    ])