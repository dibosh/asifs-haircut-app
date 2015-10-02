angular.module('Controllers')
  .controller('MainCtrl', function ($scope, BasicAPIServiceV1) {
    $scope.data = {};
    $scope.data.loading = true;
    BasicAPIServiceV1.recentActivities()
      .then(function (result) {
        $scope.recentActivities = result.data.activities;
        console.log($scope.recentActivities);
      })
      .finally(function () {
        $scope.data.loading = false;
      });
    ;
  });