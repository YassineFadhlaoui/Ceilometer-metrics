var MailAgent={};
MailAgent.sendMail = function () {
//Use Mongodb driver (native driver)
var mongodb = require('mongodb');
var server = new mongodb.Server("localhost", 27017, {});
var db = new mongodb.Db('ceilometer', server, {});
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/ceilometer';
var Mailer=require('./Alarms');
MongoClient.connect(url, function (err, db) {
  if (err) {
    //if connection fails
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    var cpu_threshold=5;
    var ram_threshold=220;
    var network_threshold=2000;

var message = {
    base : '<b>CPU alarms :</b><ul>',
    get basem() {
        return this.base;
    },
    set basem(m) {

        this.base = this.base+m;
    }
}

    var CPU = db.collection('CPUMonitoring');
              CPU.find().toArray(function (err, result) {
                var cpu_message="";
                if (err) {
                  console.log(err);
                } else if (result.length) {

                  for(var index=0;index<result.length;index++){
                    try{
                      var half=result[index].value.data.length/2
                      for(var i=0;i<half;i++){
                        if(result[index].value.data[half+i] > cpu_threshold){
                        var tmp={};
                        tmp.time=String(result[index].value.data[i]);
                        tmp.time=tmp.time.replace('T',' ').substring(0,24);
                        tmp.cpu=parseFloat(result[index].value.data[half+i]).toFixed(2);
                        cpu_message+="<li>Instance :"+result[index]._id+"=> CPU reached :"+tmp.cpu+" % at "+tmp.time+"</li>";

                      }
                      };
                    }catch(err){

                    }

                  }
                  cpu_message+="</ul>";
                } else {

                }
                //console.log(cpu_message+"gggg");
                message.basem=(cpu_message);
              });
              //message+="<b>RAM alarms :</b><ul>";
              var RAM = db.collection('RAM');
                        RAM.find().toArray(function (err, result) {
                          if (err) {
                            console.log(err);
                          } else if (result.length) {
                            message.basem="<b>RAM Alarms</b><ul>";
                            for(var index=0;index<result.length;index++){
                              try{
                              var half=result[index].value.data.length/2
                              for(var i=0;i<half;i++){

                                  if(result[index].value.data[half+i] > ram_threshold){
                                  var tmp={};
                                  tmp.time=String(result[index].value.data[i]);
                                  tmp.time=tmp.time.replace('T',' ').substring(0,24);
                                  tmp.ram=result[index].value.data[half+i]
                                  message.basem="<li>Instance :"+result[index]._id+" => RAM reached :"+tmp.ram+" Mo at "+tmp.time+"</li>";

                                }
                                };
                                }catch(err){}


                            }
                            message.basem="</ul>";
                          } else {
                          console.log('No document(s) found with defined "find" criteria!');
                          }
                        });
                      //  message+="<b>Network alarms :</b><ul>";
                        var Network = db.collection('NetworkOutgonigBytes');
                                  Network.find().toArray(function (err, result) {
                                    if (err) {
                                      console.log(err);
                                    } else if (result.length) {
                                      message.basem="<b>Bandwidth Alarms</b><ul>";
                                      for(var index=0;index<result.length;index++){
                                        try{
                                          var half=result[index].value.data.length/2
                                          for(var i=0;i<half;i++){
                                            if(result[index].value.data[half+i] > network_threshold){
                                            var tmp={};
                                            tmp.time=String(result[index].value.data[i]);
                                            tmp.time=tmp.time.replace('T',' ').substring(0,24);
                                            tmp.btes=result[index].value.data[half+i]
                                          message.basem="<li> Instance :"+result[index]._id+" => Outgoing bytes reached :"+tmp.bytes+" Bytes at "+tmp.time+"</li>";

                                          }
                                          };
                                        }catch(err){}

                                      }
                                    message.basem="</ul>";
                                    Mailer.sendAlarams(message.basem);

                                    } else {
                                    }
                                  });


            }
		db.close();
});

}
module.exports=MailAgent;
