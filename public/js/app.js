angular.module('ReunionApp', [
  'ngRoute',
  'ReunionApp.services',
  'ReunionApp.controllers'
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
      $scope.categoriesList = response;
    });
  }).
  controller('formController', function($scope, $http) {

    var defaultForm = {
      name : ""
    };

    $scope.formData = {};

    $scope.processForm = function(newCategory) {
      $scope.formData["name"] = newCategory.name
      $http({
        method: 'POST',
        url: 'http://localhost:4567/create_category',
        params: $scope.formData
      }).
      success(function(data) {
        console.log(data);
        $scope.categoryForm.$setPristine();
        $scope.newCategory = defaultForm;
        $scope.categoriesList.push(data);
      });
    }
  });

angular.module('ReunionApp.services', []).
  factory('categoriesAPIservice', function($http) {

    var categories = {};

    categories.getCategories = function() {

      return $http({
        method: 'GET', 
        url: "http://localhost:4567/categories.json"
      });
    }
    return categories;
  });

