'use strict';

angular.module('myApp.Network', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Network', {
    templateUrl: 'Network/Network.html',
    controller: 'NetworkCtrl'
  });

}])
.controller('NetworkCtrl', ['$scope',function($scope) {
  $.getJSON("http://localhost:3001/totalOutgoingBytes", function(result){
          var counter=0
          $('#main').append("<table  style:'width:100%; margin-left:30%; table-layout: fixed;'><tbody id='table'></tbody></table>");
          $.each(result, function(k,v){
            counter++;
            //some hacks for good look
            $('#table').append('<tr><td colspan="2"><center><h3 style="color:#fff;">Instance : '+v._id+'</h3><br></center></td></tr>');
            $('#table').append('<tr id="flux'+counter+'"></tr>');
            $('#flux'+counter).append('<td style="width:300px;padding:0 15px 0 15px;"><center><div style="width:100%" class="tile-stats"><span class="count">'+v.value+'</span><div class="icon"><i class="fa fa-upload fa-4x"></i></div><h4><font color="#BAB8B8"> Total Outgoing Bytes </font> </h4></div></div></td>');
            $('#table').append('<tr id="chart'+counter+'"></tr>');
            $('#table').append('<tr id="Incoming'+counter+'"></tr>');
          });
        });

        $.getJSON("http://localhost:3001/totalIncomingBytes", function(result){
                var counter=0
                $.each(result, function(k,v){
                  counter++;
                  $('#table').append('<tr id="flux'+counter+'"></tr>');
                  $('#flux'+counter).append('<td style="width:300px; padding:0 15px 0 15px;"><div style="width:100%" class="tile-stats"><span class="count">'+v.value+'</span><div class="icon"><i class="fa fa-download fa-4x"></i></div><h4><font color="#BAB8B8"> Total Incoming Bytes </font> </h4></div></td>');
                });
              });


              //
              $.getJSON("http://localhost:3001/NetworkOutgonigBytes", function(result){

                      var counter=0
                      $.each(result, function(k,v){
                        counter++;
                        var half=v.value.data.length/2
                        var tab = [];
                        for(var i=0;i<half;i++){
                          var tmp={};
                          tmp.time=String(v.value.data[i]);
                          tmp.time=tmp.time.replace('T',' ').substring(0,16);
                          tmp.bytes=v.value.data[half+i]
                          tab.push(tmp);
                        };
                        $('#chart'+counter).append("<td colspan='2' style='width:600px' ><br><font style='color:#fff'><h3>Outgoing bytes</h3></center><div id='network"+counter+"' style='height: 250px;''></div></div>");
                        new Morris.Line({
                          element: 'network'+counter,
                          data: tab,
                          xkey: 'time',
                          ykeys: ['bytes'],
                          labels: ['Outgoing bytes'],
                          parseTime:false

                        });

                      });
                    });
              //
              $.getJSON("http://localhost:3001/NetworkIncomingBytes", function(result){

                      var counter=0
                      $.each(result, function(k,v){
                        counter++;
                        var half=v.value.data.length/2
                        var tab = [];
                        for(var i=0;i<half;i++){
                          var tmp={};
                          tmp.time=String(v.value.data[i]);
                          tmp.time=tmp.time.replace('T',' ').substring(0,16);
                          tmp.bytes=v.value.data[half+i]
                          tab.push(tmp);
                        };
                        $('#Incoming'+counter).append("<td colspan='2' style='width:600px' ><br><font style='color:#fff'><h3>Incoming bytes</h3></center><div id='networkIncoming"+counter+"' style='height: 250px;''></div></div>");
                        new Morris.Line({
                          element: 'networkIncoming'+counter,
                          data: tab,
                          xkey: 'time',
                          ykeys: ['bytes'],
                          labels: ['Incoming bytes'],
                          parseTime:false

                        });

                      });
                    });
              //

}]);
