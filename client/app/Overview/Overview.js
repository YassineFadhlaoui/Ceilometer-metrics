'use strict';

angular.module('myApp.Overview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Overview', {
    templateUrl: 'Overview/Overview.html',
    controller: 'OverviewCtrl'
  });

}])
.controller('OverviewCtrl', ['$scope',function($scope) {
  $('#main').append('<table style:"width:100%; margin-right:20%; table-layout: fixed;" ><tbody id="table"><tr id="row1"></tr>');
  $.getJSON("http://localhost:3001/Instances", function(result){
          var counter=0;
          var row=1;
          $.each(result, function(k,v){
            counter++;
            //some hacks for good look

            $('#row'+row).append('<td style="width:400px;padding:20px 15px 0 15px;"><div style="width:100%" class="tile-stats">'+
            '<h4 style="margin-left:10%"><font color="#BAB8B8"> Name</font> </h4>'+
            '<span style="margin-left:10%" class="count1">'+v._id+'</span>'+
            '<h4 style="margin-left:10%"><font color="#BAB8B8"> Status</font> </h4>'+
            '<span style="margin-left:10%" class="count1">'+v.value.status+'</span>'+
            '<h4 style="margin-left:10%"><font color="#BAB8B8"> Host</font> </h4>'+
            '<span style="margin-left:10%" class="count1">'+v.value.host+'</span>'+
            '<h4 style="margin-left:10%"><font color="#BAB8B8"> Memory </font> </h4>'+
            '<span style="margin-left:10%" class="count1">'+v.value.memory+'</span>'+
            '<h4 style="margin-left:10%"><font color="#BAB8B8"> Virtual CPU </font> </h4>'+
            '<span style="margin-left:10%" class="count1">'+v.value.vcpus+'</span>'+
            '<h4 style="margin-left:10%"><font color="#BAB8B8"> Disk </font> </h4>'+
            '<span style="margin-left:10%" class="count1">'+v.value.disk+'</span>'+
            '<h4 style="margin-left:10%"><font color="#BAB8B8"> Flavor</font> </h4>'+
            '<span style="margin-left:10%" class="count1">'+v.value.flavor+'</span>'+
            '<div  class="icon"><i class="fa fa-desktop fa-4x"></i></div><br><br></td>');
            if(counter % 2==0) {
              row+=1;
              $('#table').append('<tr id="row'+row+'"></tr>');
            }

          });
          $('#main').append('</tbody></table>')
        });
}]);
