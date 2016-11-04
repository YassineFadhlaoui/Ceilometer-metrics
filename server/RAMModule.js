var mongojs = require('mongojs');
var database = mongojs('mongodb://localhost:27017/ceilometer', ['meter','RAM']);
var RAMmodule={};
RAMmodule.execute = function () {

			var mapRAM = function(){
				 			 emit (this.resource_metadata.display_name,{time:this.recorded_at, usedRAM :this.counter_volume});
						};//end mapping outgoing bytes


			var reduceRAM = function(key,values){
						var RAM={"data":[{
							"time":[]
						}]};
						for(var i=0;i<values.length;i++){
					   		RAM.data[i]=values[i].time;
						 		RAM.data[i+values.length]=values[i].usedRAM;
					 }
						return RAM;
					}

								database.meter.mapReduce(
										mapRAM ,
										reduceRAM, {
										out: "RAM",
										query : {'counter_name':'memory.resident'}
										}
									);
				};
				module.exports = RAMmodule;
