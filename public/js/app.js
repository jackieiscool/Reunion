angular.module('ReunionApp', [
  'ngRoute',
  'ReunionApp.controllers',
  'ReunionApp.services',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when("/planning", {templateUrl: "partials/planning.html", controller: "planningController"}).
  otherwise({redirectTo: '/'});
}]);

angular.module('ReunionApp.controllers', []).
  controller('planningController', function($scope, categoriesAPIservice) {
    $scope.categoriesList = [];

    categoriesAPIservice.getCategories().success(function (response) {
        //Dig into the responde to get the relevant data
        $scope.categoriesList = response;
    });
  });

angular.module('ReunionApp.services', []).
  factory('categoriesAPIservice', function($http) {

    var categories = {};

    categoriesAPI.getCategories = function() {
      return $http({
        method: 'GET', 
        url: "http://localhost:4567/categories.json"
      });
    }

    return categories;
  });
