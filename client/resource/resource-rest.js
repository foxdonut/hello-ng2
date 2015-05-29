var when = require("when");

var createClient = function() {
  var browser = require("rest/browser");
  var mime = require("rest/interceptor/mime");
  var restClient = browser.wrap(mime, { mime: "application/json" });

  var client = function(request) {
    var dfd = when.defer();

    restClient(request).then(function(response) {
      dfd.resolve(response.entity);
    }, function(error) {
      dfd.reject(error);
    });

    return dfd.promise;
  };
  return client;
};
  
var resource = function(client) {
  return function(baseUrl) {
    return {
      query: function(params) {
        return client({
          method: "GET",
          path: baseUrl,
          params: params
        });
      },
      get: function(id) {
        return client({
          method: "GET",
          path: baseUrl + "/" + id
        });
      },
      save: function(model) {
        if (model) {
          var request = (model.id) ? {
            method: "PUT",
            path: baseUrl + "/" + model.id
          } : {
            method: "POST",
            path: baseUrl
          };

          request.entity = model;

          return client(request);
        }
        return when.reject();
      },
      "delete": function(model) {
        return client({
          method: "DELETE",
          path: baseUrl + "/" + model.id
        });
      }
    };
  };
};

module.exports = resource(createClient());

