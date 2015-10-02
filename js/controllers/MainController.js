angular.module('Controllers')
  .controller('MainCtrl', function ($scope, BasicAPIServiceV1, $interval) {
    $scope.data = {
      mainLoading: true,
      mainPanelLoading: false,
      sidePaneLoading: false
    };
    $scope.selectedTabIndex = 0;
    $scope.popularPages = {};
    $scope.filteredActivities = {};

    $scope.closeSidePane = function () {
      $scope.filteredActivities = {};
    };

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
      if ($scope.selectedTabIndex === 1) $scope.fetchInsights();
    };

    $scope.filterByLead = function (user) {
      $scope.filteredActivities.filterHeader = '<strong>' + user.name + '</strong> read following articles';
      $scope.filteredActivities.filteredByLead = true;
      $scope.data.sidePaneLoading = true;
      BasicAPIServiceV1.recentActivitiesFilterByLeadId(user.lead_id)
        .then(function (result) {
          $scope.filteredActivities.list = _filterActivities(result.data.activities);
        })
        .finally(function () {
          $scope.data.sidePaneLoading = false;
        });
    };

    $scope.filterByUrl = function (page) {
      $scope.filteredActivities.filterHeader = '<strong>' + page.title + '</strong> was read by following leads';
      $scope.filteredActivities.filteredByLead = false;
      $scope.data.sidePaneLoading = true;
      BasicAPIServiceV1.recentActivitiesFilterByUrl(page.url)
        .then(function (result) {
          $scope.filteredActivities.list = _filterActivities(result.data.activities);
        })
        .finally(function () {
          $scope.data.sidePaneLoading = false;
        });
    };

    $scope.currentFacets = {};

    $scope.insights = {};

    $scope.fetchInsights = function (facetName, facets) {
      if (facetName) {
        $scope.currentFacets[facetName] = facets;
      }

      $scope.data.mainPanelLoading = true;
      $scope.closeSidePane();
      BasicAPIServiceV1.popularPages($scope.currentFacets)
        .then(function (result) {
          $scope.popularPages.pages = _.uniq(result.data.pages, 'url');
          $scope.insights.facets = {
            'Industry': _((_.sortBy(_.map(result.data.facets.Industry, function (count, name) { return {facet: name, count: count }; }), 'count'))).reverse().value(),
            'Function': _((_.sortBy(_.map(result.data.facets['Function'], function (count, name) { return {facet: name, count: count }; }), 'count'))).reverse().value(),
            'Seniority': _((_.sortBy(_.map(result.data.facets.Seniority, function (count, name) { return {facet: name, count: count }; }), 'count'))).reverse().value()
          };
        })
        .finally(function () {
          $scope.data.mainPanelLoading = false;
        });

      BasicAPIServiceV1.leads($scope.currentFacets)
        .then(function (result) {
          $scope.insights.users = result.data.leads;
        });
    };

    function _filterActivities(activities) {
      return _.uniq(activities, function (activity) {
          return activity.user.name + activity.page.url;
      });
    }

    function _loadRecentActivities() {
      BasicAPIServiceV1.recentActivities()
      .then(function (result) {
        $scope.recentActivities = _filterActivities(result.data.activities);
      })
      .finally(function () {
        $scope.data.mainLoading = false;
      });
    }

    _loadRecentActivities();
    $interval(_loadRecentActivities, 10000);


  });
