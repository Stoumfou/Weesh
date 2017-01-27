angular.module('weesh').controller('MainCtrl', [
        '$scope'
        , 'auth'

    
    , function ($scope, auth) {
        console.log("enter MainCtrl");
        $scope.isLoggedIn = auth.isLoggedIn;
        }
    ]);