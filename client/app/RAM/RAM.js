'use strict';

angular.module('myApp.RAM', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/RAM', {
    templateUrl: 'RAM/RAM.html',
    controller: 'RAMCtrl'
  });

}])
.controller('RAMCtrl', ['$scope',function($scope) {
    $.getJSON("http://localhost:3001/RAM", function(result){

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
                tmp.ram=v.value.data[half+i]
                tab.push(tmp);
              };
              $('#main').append("<div id='ram"+counter+"' style='height: 300px;''></div><br><br><div id='ramusage"+counter+"' ></div>");
              new Morris.Line({
                element: 'ram'+counter,
                data: tab,
                xkey: 'time',
                ykeys: ['ram'],
                labels: ['RAM Usage'],
                parseTime:false

              });

            });
          });
}]);
