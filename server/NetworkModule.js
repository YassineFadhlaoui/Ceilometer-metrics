var mongojs = require('mongojs');
var database = mongojs('mongodb://localhost:27017/ceilometer', ['meter','NetworkOutgonigBytes','NetworkIncomingBytes','totalOutgoingBytes','totalIncomingBytes']);
var Network={};
Network.execute = function () {

			var mapNetworkOutgonigBytes = function(){
				 			 emit (this.resource_metadata.display_name,{time:this.recorded_at, OutgoningBytes :this.counter_volume});
						};//end mapping outgoing bytes
			var mapNetworkIncomingBytes = function(){
								emit (this.resource_metadata.display_name,{time:this.recorded_at, IncomingBytes :this.counter_volume});
						};//e//end mapping incoming bytes
			var maptotalOutgonigBytes = function(){
							 	emit (this.resource_metadata.display_name,this.counter_volume);
						};//end mapping total outgoing
			var maptotalIncomingBytes = function(){
								emit (this.resource_metadata.display_name,this.counter_volume);
						};//end mapping total incoming

			//begin reducing
			var reducetotalOutgonigBytes=function(key,values){
					var total = 0;
					for(var i=0;i<values.length;i++)
						total+=values[i];

					return total;
			}
			//end reduce totalgonig bytes

			var reducetotalIncomingBytes = function(key,values){
				var total=0;
				for(var i=0;i<values.length;i++)
					total+=values[i];

				return total;
			}

			var reduceNetworkOutgonigBytes = function(key,values){
						var OutgoningBytes={"data":[{
							"time":[]
						}]};
						for(var i=0;i<values.length;i++){
					   		OutgoningBytes.data[i]=values[i].time;
						 		OutgoningBytes.data[i+values.length]=values[i].OutgoningBytes;
					 }
						return OutgoningBytes;
					}

				var reduceNetworkIncomingBytes = function(key,values){
							var IncomingBytes={"data":[{
								"time":[]
							}]};
							for(var i=0;i<values.length;i++){
								IncomingBytes.data[i]=values[i].time;
								IncomingBytes.data[i+values.length]=values[i].IncomingBytes;
							}
						return IncomingBytes;
					}//end reduce
					database.meter.mapReduce(
							mapNetworkOutgonigBytes ,
							reduceNetworkOutgonigBytes, {
							out: "NetworkOutgonigBytes",
							query : {'counter_name':'network.outgoing.bytes'}
							}
						);//end map reduce for Instance_State
						database.meter.mapReduce(
								mapNetworkIncomingBytes ,
								reduceNetworkIncomingBytes, {
								out: "NetworkIncomingBytes",
								query : {'counter_name':'network.incoming.bytes'}
								}
							);

							database.meter.mapReduce(
									maptotalIncomingBytes ,
									reducetotalIncomingBytes, {
									out: "totalIncomingBytes",
									query : {'counter_name':'network.incoming.bytes'}
									}
								);
								database.meter.mapReduce(
										maptotalOutgonigBytes ,
										reducetotalOutgonigBytes, {
										out: "totalOutgoingBytes",
										query : {'counter_name':'network.outgoing.bytes'}
										}
									);
				};
				module.exports = Network;
