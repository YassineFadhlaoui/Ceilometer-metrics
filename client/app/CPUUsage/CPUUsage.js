'use strict';

angular.module('myApp.CPUUsage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/CPUUsage', {
    templateUrl: 'CPUUsage/CPUUsage.html',
    controller: 'CPUUsageCtrl'
  });
        // Note that we run everything on the localhost
}])
.controller('CPUUsageCtrl', ['$scope',function($scope) {
  //getting all instances from API

        $.getJSON("http://localhost:3001/CPUMonitor", function(result){

                var counter=0
                $.each(result, function(k,v){
                  counter++;
                  $('#charts').append("<h4 style='color:#fff;'>Instance "+counter+" : "+v._id+"</h4>")
                  var half=v.value.data.length/2
                  var tab = [];
                  for(var i=0;i<half;i++){
                    var tmp={};
                    tmp.time=String(v.value.data[i]);
                    tmp.time=tmp.time.replace('T',' ').substring(0,16);
                    tmp.cpu=v.value.data[half+i]
                    tab.push(tmp);
                  };
                  $('#charts').append("<div id='cpu"+counter+"' style='height: 250px;''></div><br><br><div id='cpuavg"+counter+"' ></div>");
                  new Morris.Line({
                    element: 'cpu'+counter,
                    data: tab,
                    xkey: 'time',
                    ykeys: ['cpu'],
                    labels: ['CPU Usage'],
                    parseTime:false

                  });

                });
              });
              //cpu overview
              $.getJSON("http://localhost:3001/CPUAverage", function(result){
                var index=0;
                var pie=0;
                  $.each(result, function(k,v){
                    index++;
                    $('#cpuavg'+index+'').append('<table style="width:100%;"><tr><td><center><div class="progress-pie-chart" data-percent="'+v.value.max+'">  <div class="ppc-progress"><div class="ppc-progress-fill"></div></div><div class="ppc-percents"><div class="pcc-percents-wrapper"><span>%</span></div></div></div></center></td><td><center><div class="progress-pie-chart2" data-percent2="'+v.value.min+'"><div class="ppc-progress2"><div class="ppc-progress-fill2"></div></div><div class="ppc-percents2"><div class="pcc-percents-wrapper2"><span>%</span></div></div></div></center></td><td><center><div class="progress-pie-chart3" data-percent3="'+v.value.avg+'"><div class="ppc-progress3"><div class="ppc-progress-fill3"></div></div><div class="ppc-percents3"><div class="pcc-percents-wrapper3"><span>%</span></div></div></div></center></td></tr><tr><td><center style="color:#fff"><br><b>Max CPU</b></center></td><td><center style="color:#fff"><br><b>Min CPU</b></center></td><td><center style="color:#fff"><br><b>Average CPU</b></center></td></tr></table>');
                    console.log(v._id+" ; "+v.value.avg);

                                      $(function(){
                                  var $ppc = $('.progress-pie-chart'),
                                    percent = parseFloat($ppc.data('percent')).toFixed(2),
                                    deg = 360*percent/100;
                                  if (percent > 50) {
                                    $ppc.addClass('gt-50');
                                  }
                                  $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
                                  $('.ppc-percents span').html(percent+'%');
                                });
                                $(function(){
                                var $ppc = $('.progress-pie-chart3'),
                                percent = parseFloat($ppc.data('percent3')).toFixed(2),
                                deg = 360*percent/100;
                                if (percent > 50) {
                                $ppc.addClass('gt-503');
                                }
                                $('.ppc-progress-fill3').css('transform','rotate('+ deg +'deg)');
                                $('.ppc-percents3 span').html(percent+'%');
                                });

                                $(function(){
                                var $ppc = $('.progress-pie-chart2'),
                                percent = parseFloat($ppc.data('percent2')).toFixed(2),
                                deg = 360*percent/100;
                                if (percent > 50) {
                                $ppc.addClass('gt-502');
                                }
                                $('.ppc-progress-fill2').css('transform','rotate('+ deg +'deg)');
                                $('.ppc-percents2 span').html(percent+'%');
                                });
                  });

              });



}]);
