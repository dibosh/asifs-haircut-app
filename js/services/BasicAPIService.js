angular.module('Services')
.factory('BasicAPIServiceV1', ['$http', function ($http) {
    return {
      recentActivities: function () {
        return $http.get('https://fast-brushlands-4500.herokuapp.com/recent-activities');
      },

      recentActivitiesFilterByLeadId: function (leadId) {
        return $http.get('https://fast-brushlands-4500.herokuapp.com/recent-activities?lead_id=' + leadId);
      },

      recentActivitiesFilterByUrl: function (url) {
        return $http.get('https://fast-brushlands-4500.herokuapp.com/recent-activities?page_url=' + url);
      },

      popularPages: function (facetType, facet) {
        var url = 'https://fast-brushlands-4500.herokuapp.com/popular-pages';
        if (facetType && facet) {
          url = url + '?' + facetType.toLowerCase() + '=' + facet;
        }
        return $http.get(url);
      }
    };
  }]);