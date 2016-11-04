var InstanceAPI={};
InstanceAPI.execute=function(app,db){
var Instances = db.collection('Instances');
          Instances.find().toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else if (result.length) {
              app.get('/Instances', function(req, res) {
              res.send(result);
            });
            } else {
            console.log('No document(s) found with defined "find" criteria!');
            }
          });
        }
module.exports=InstanceAPI;
