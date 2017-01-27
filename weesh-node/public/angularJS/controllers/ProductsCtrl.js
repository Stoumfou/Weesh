angular.module('weesh', ['ngMaterial']).controller('ProductsCtrl', [
    '$scope'
    , '$state'
    , 'auth'






    
    , function ($scope, $state, auth) {
        console.log("enter ProductsCtrl");
        $scope.products = {
            'sku': 'Panda'
            , 'name': 't-shirt blanc'
            , 'provider': 'Amazon'
            , 'image': 'https://images-eu.ssl-images-amazon.com/images/I/61vqREopVcL._UY445_.jpg'
            , 'price': '3€'
            , ecoGrade: ''
            , 'sales': {
                'startDate': 'Boulogne'
                , 'endDate': 'rue de sèvres'
                , "newPrice": "92100"
            }
            , 'shipping': {
                'cost': 'Boulogne'
                , 'delay': 'rue de sèvres'
            }
        };
        $scope.todos = [
            {
                face: 'img / logo.png'
                , what: 'Brunch this weekend?'
                , who: 'Min Li Chan'
                , when: '3:08PM'
                , notes: " I'll be in your neighborhood doing errands"
      }
        , {
                face: 'img / logo.png'
                , what: 'Brunch this weekend?'
                , who: 'Min Li Chan'
                , when: '3:08PM'
                , notes: " I'll be in your neighborhood doing errands"
      }
        , {
                face: 'img / logo.png'
                , what: 'Brunch this weekend?'
                , who: 'Min Li Chan'
                , when: '3:08PM'
                , notes: " I'll be in your neighborhood doing errands"
      }
        , {
                face: 'img / logo.png'
                , what: 'Brunch this weekend?'
                , who: 'Min Li Chan'
                , when: '3:08PM'
                , notes: " I'll be in your neighborhood doing errands"
      }
        , {
                face: 'img / logo.png'
                , what: 'Brunch this weekend?'
                , who: 'Min Li Chan'
                , when: '3:08PM'
                , notes: " I'll be in your neighborhood doing errands"
      }
    , ];
}
]);