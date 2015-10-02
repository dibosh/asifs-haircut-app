angular.module('Controllers')
  .controller('MainCtrl', function ($scope, BasicAPIServiceV1) {
    $scope.data = {};
    $scope.data.loading = true;
    $scope.selectedTabIndex = 0;
    $scope.tabs = [
      {
        title: 'Recent Activities',
        isActive: true,
        template: 'views/partials/recent_activities.html'
      },
      {
        title: 'Insights',
        isActive: false,
        template: 'views/partials/insights.html'
      }
    ];

    $scope.selectTab = function (index) {
      $scope.tabs[$scope.selectedTabIndex].isActive = false;
      $scope.selectedTabIndex = index;
      $scope.tabs[$scope.selectedTabIndex].isActive = true;
    };

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