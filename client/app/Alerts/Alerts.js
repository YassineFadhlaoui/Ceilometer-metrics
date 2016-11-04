'use strict';

angular.module('myApp.Alerts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Alert', {
    templateUrl: 'Alerts/Alerts.html',
    controller: 'AlertsCtrl'
  });
}])
.controller('AlertsCtrl', ['$scope',function($scope) {
    var cpu_threshold=4.30;
    var ram_threshold=200;
    var network_threshold=1200;
    var API = ['http://localhost:3001/CPUMonitor','http://localhost:3001/NetworkOutgonigBytes','http://localhost:3001/RAM'];

    $.each(API,function(k){
      var params;
      if(k==0){
        params=[cpu_threshold,"tachometer","CPU reached","%","cpu"];
      }else if(k==1){
        params=[network_threshold,"signal","Outgoing bytes","B","network"];
      }else{
        params=[ram_threshold,"pie-chart","RAM reached","Mo","ram"];
      }
      $.getJSON(API[k], function(result){
              var counter=0
              $.each(result, function(k,v){
                counter++;
                var half=v.value.data.length/2;
                for(var i=0;i<half;i++){
                  if(v.value.data[half+i]>params[0]){
                    var index=params[4]+counter.toString()+i.toString();
                    var alarm=append_Alarm(v._id,v.value.data[i],index,parseFloat(v.value.data[half+i]).toFixed(2),params[1],params[2],params[3]);
                    var year = v.value.data[i].substring(0,4);
                    var month=parseInt(v.value.data[i].substring(5,7))-1;
                    var date =v.value.data[i].substring(8,10);
                    var script=append_script(year,month,date,index);
                    $('#'+params[4]).append(alarm);
                    var s = document.createElement("script");
                    s.type = "text/javascript";
                    s.innerHTML = script;
                    $("head").append(s);
                  }
                };
              });
            });
    });
}]);
var append_Alarm=function(name,time,index,value,icon,metric,unit){
  var cell='<tr><td style="width:280px;padding:0 15px 0 25px;"><div  id="jquery-script-menu">'+
          '<div style="background-color:#E4E4E4 ; border-radius: 30px 10px; width:100%">'+
          '<table style="width:350px; table-layout: fixed;">'+
          '<tbody>'+
          '<tr>'+
          '<td style="width:50px;">'+
          '<div id="ribbon'+index+'"></div>'+
          '</td>'+
          '<td style="width:150px;">'+
            '<h4 style="margin-top: 0.3cm;">'+
            '<font color="#FA7A89">Instance :</font>'+
            '<br><center class="count1">'+name+'</center>'+
            '<font color="#FA7A89">  '+metric+' :</font>'+
            '<br><center class="count1">'+value+' '+unit+'</center></h4></td>'+
            '<td style="width:100px;">'+
            '<div style="margin-bottom:50px"><i class="fa fa-'+icon+' fa-4x" style="color:#A0A6A8"></i></div>'+
            '</td>'+
        '</tr>'+
        '</tbody>'+
        '</table>'+
        '<center><p>'+time.substring(11,22)+'<p></center></div></div></td></tr>';
        return cell;
};
var append_script = function(year,month,date,id){
  var function_core='$(document).ready(function() {$(function(){'+
    '$("#ribbon'+id+'").dateRibbon({titleFormate:"days",date:new Date('+year+','+month+','+date+')});'+
    '});});';
    return function_core;
  }
