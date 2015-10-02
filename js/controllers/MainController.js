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

    $scope.filterByLead = function (user) {
      $scope.filteredActivities.filterHeader = '<strong>' + user.name + '</strong> read following articles';
      $scope.filteredActivities.filteredByLead = true;
      $scope.data.subLoading = true;
      BasicAPIServiceV1.recentActivitiesFilterByLeadId(user.lead_id)
        .then(function (result) {
          $scope.filteredActivities.list = _.uniq(result.data.activities, 'user.name');
        })
        .finally(function () {
          $scope.data.subLoading = false;
        });
    };

    $scope.filterByUrl = function (page) {
      $scope.filteredActivities.filterHeader = '<strong>' + page.title + '</strong> was read by following leads';
      $scope.filteredActivities.filteredByLead = false;
      $scope.data.subLoading = true;
      BasicAPIServiceV1.recentActivitiesFilterByUrl(page.url)
        .then(function (result) {
          $scope.filteredActivities.list = _.uniq(result.data.activities, 'user.name');
        })
        .finally(function () {
          $scope.data.subLoading = false;
        });
    };

    BasicAPIServiceV1.recentActivities()
      .then(function (result) {
        $scope.recentActivities = _.uniq(result.data.activities, 'user.name');
      })
      .finally(function () {
        $scope.data.mainLoading = false;
      });


    $scope.closeSidePane = function () {
      $scope.filteredActivities = {};
    }


  });