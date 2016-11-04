'use strict';

angular.module('myApp.InstanceFailure', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/InstanceFailure', {
    templateUrl: 'InstanceFailure/InstanceFailure.html',
    controller: 'InstanceFailureCtrl'
  });
        // Note that we run everything on the localhost
}])
.controller('InstanceFailureCtrl', ['$scope',function($scope) {
  $.getJSON("http://localhost:3001/InstanceFailure", function(result){

          var counter=0
          $.each(result, function(k,v){
            counter++;
            $('#main').append("<h4 style='color:#fff;'>Instance "+counter+" : "+v._id+"</h4>")
            var half=v.value.data.length/2
            var tab = [];
            for(var i=0;i<half;i++){
              var tmp={};
              tmp.time=String(v.value.data[i]);
              tmp.time=tmp.time.replace('T',' ').substring(0,16);
              tmp.state=v.value.data[half+i]
              tab.push(tmp);
            };
            $('#main').append("<div id='state"+counter+"' style='height: 200px;''></div><br><br><div id='status"+counter+"' ></div>");
            new Morris.Line({
              element: 'state'+counter,
              data: tab,
              xkey: 'time',
              ykeys: ['state'],
              labels: ['Instance State'],
              parseTime:false

            });

          });
        });
}]);
