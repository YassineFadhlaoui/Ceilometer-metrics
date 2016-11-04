var mongojs = require('mongojs');
var database = mongojs('mongodb://localhost:27017/ceilometer', ['meter', 'State','CPUAverage','CPUMonitoring']);
var cpu={};
cpu.execute = function () {
				var mapInstanceState = function () {
							emit (this.resource_metadata.display_name,this.resource_metadata.state);
						};//end mapInstanceState
			var mapAverageCPU = function(){
				 			emit (this.resource_id,this.counter_volume);
						};//end mapAverageCPU
			var mapRealTime = function () {
						emit (this.resource_metadata.display_name,{time:this.recorded_at, cpu :this.counter_volume});
					};//Real Time CPU Usage Monitoring

				var reduceInstanceState = function(key,values){
					return values[values.length-1];
				};//end reduceInstanceState
				var reduceAverageCPU = function(key,values){
					var total = 0;
					var max = 0;
					var min =100;
					for (var i=0;i< values.length ; i++){
							total += values[i];
							if(values[i]>max) max=values[i];
							if(values[i]<min) min=values[i];
					}

					var reduceResult={};
						reduceResult.max=max;
					  reduceResult.min=min;
						reduceResult.avg=total/values.length;
					return reduceResult;
				}//end reduce
				var reduceRealTime = function(key,values){
					var Timetab = {"data":[{
						"time":[]
					}]};
					var Cputab = {"data":[{
						"cpu":[]
					}]};
					for(var i=0;i<values.length;i++){
				   Timetab.data[i]=values[i].time;
					 Timetab.data[i+values.length]=values[i].cpu ;
				 }
					return Timetab;
		    };//cpu usage

				database.meter.mapReduce(
						mapInstanceState ,
						reduceInstanceState, {
						out: "State"
						}
					);//end map reduce for Instance_State
					database.meter.mapReduce(
							mapAverageCPU ,
							reduceAverageCPU, {
							out: "CPUAverage",
							query : {'counter_name':'cpu_util'}
							}
						);//end map reduce for Instance_State

					database.meter.mapReduce(
				        mapRealTime,
				        reduceRealTime, {
				            out: "CPUMonitoring",
										query : {'counter_name':'cpu_util'}
				        }
				    );

				};
        module.exports = cpu;
