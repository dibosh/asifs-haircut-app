angular.module('Services')
.factory('BasicAPIServiceV1', ['$http', function ($http) {
    function EncodeQueryData(data) {
       var ret = [];
       data = data || {};
       for (var d in data)
          ret.push(d.toLowerCase() + "=" + encodeURIComponent(data[d]));
       return ret.join("&");
    }

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

      popularPages: function (facets) {
        var url = 'https://fast-brushlands-4500.herokuapp.com/popular-pages';
        return $http.get(url + '?' + EncodeQueryData(facets));
      },

      leads: function (facets) {
        var url = 'https://fast-brushlands-4500.herokuapp.com/leads';
        return $http.get(url + '?' + EncodeQueryData(facets));
      }
    };
  }]);