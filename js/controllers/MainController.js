angular.module('Controllers')
  .controller('MainCtrl', function ($scope, BasicAPIServiceV1) {
    $scope.data = {
      mainLoading: true,
      subLoading: false
    };
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

    $scope.filteredActivities = {};

    $scope.filterByLead = function (leadId) {
      $scope.filteredActivities.filterHeader = 'This lead has read';
      $scope.filteredActivities.filteredByLead = true;
      $scope.data.subLoading = true;
      BasicAPIServiceV1.recentActivitiesFilterByLeadId(leadId)
        .then(function (result) {
          $scope.filteredActivities.list = result.data.activities;
        })
        .finally(function () {
          $scope.data.subLoading = false;
        });
    };

    $scope.filterByUrl = function (url) {
      $scope.filteredActivities.filterHeader = 'This article was read by';
      $scope.filteredActivities.filteredByLead = false;
      $scope.data.subLoading = true;
      BasicAPIServiceV1.recentActivitiesFilterByUrl(url)
        .then(function (result) {
          $scope.filteredActivities.list = result.data.activities;
        })
        .finally(function () {
          $scope.data.subLoading = false;
        });
    };

    BasicAPIServiceV1.recentActivities()
      .then(function (result) {
        $scope.recentActivities = result.data.activities;
      })
      .finally(function () {
        $scope.data.mainLoading = false;
      });


    $scope.closeSidePane = function () {
      $scope.filteredActivities = {};
    }


  });