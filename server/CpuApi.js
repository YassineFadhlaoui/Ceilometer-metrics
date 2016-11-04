
var cpuApi={};
cpuApi.execute=function(app,db){
var CPUAverage = db.collection('CPUAverage');
          CPUAverage.find().toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else if (result.length) {
              app.get('/CPUAverage', function(req, res) {
              res.send(result);
            });
            } else {
            console.log('No document(s) found with defined "find" criteria!');
            }
          });
          //data retrived from State collection
  var State = db.collection('State');
          State.find().toArray(function (err, result) {
          if (err) {
              console.log(err);
            }else if (result.length) {
              app.get('/State', function(req, res) {
              res.send(result);
              });
           }else {
            console.log('No document(s) found with defined "find" criteria!');
          }
        });
          //data retrived from State collection
  var CPUMonitoring = db.collection('CPUMonitoring');
          CPUMonitoring.find().toArray(function (err, result) {
          if (err) {
              console.log(err);
           }else if (result.length) {
              app.get('/CPUMonitor', function(req, res) {
              res.send(result);
              });
           }else {
            console.log('No document(s) found with defined "find" criteria!');
          }

});

}
module.exports=cpuApi;
