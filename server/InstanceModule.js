var mongojs = require('mongojs');
var database = mongojs('mongodb://localhost:27017/ceilometer', ['meter','Instances']);
var Instances={};
Instances.execute = function () {

			var mapInstances = function(){
				 			 emit (this.resource_metadata.display_name,{ status:this.resource_metadata.status,
                                                           host:this.resource_metadata.instance_host,
                                                           memory:this.resource_metadata.memory_mb,
                                                           flavor:this.resource_metadata.instance_type,
                                                           ram:this.resource_metadata.flavor.ram,
                                                           vcpus:this.resource_metadata.flavor.vcpus,
                                                           disk:this.resource_metadata.flavor.disk
                                                         });
						};//end mapping


			var reduceInstances = function(key,values){

						return values[values.length-1];
					}

								database.meter.mapReduce(
										mapInstances ,
										reduceInstances, {
										out: "Instances",
										query : {'counter_name':'instance'}
										}
									);
				};
				module.exports = Instances;
