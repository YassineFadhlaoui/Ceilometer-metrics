var mongojs = require('mongojs');
var database = mongojs('mongodb://localhost:27017/ceilometer', ['meter','InstanceFailure']);
var InstanceFailure={};
InstanceFailure.execute = function () {

			var mapInstanceFailure = function(){
				 			 emit (this.resource_metadata.display_name,{ time:this.recorded_at,
                                                           status:this.resource_metadata.status

                                                         });
						                          };//end mapping


			var reduceInstanceFailure = function(key,values){
        var State={"data":[{
          "time":[]
        }]};
        for(var i=0;i<values.length;i++){
            State.data[i]=values[i].time;
            if(values[i].status=="active") {
              State.data[i+values.length]=1;
            }else{
              State.data[i+values.length]=0;
            }
       }
        return State;
					}

								database.meter.mapReduce(
										mapInstanceFailure,
										reduceInstanceFailure, {
										out: "InstanceFailure",
										query : {'counter_name':'instance'}
										}
									);
				};
				module.exports = InstanceFailure;
