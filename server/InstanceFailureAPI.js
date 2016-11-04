var InstanceFailureAPI={};
InstanceFailureAPI.execute=function(app,db){
var InstanceFailure = db.collection('InstanceFailure');
          InstanceFailure.find().toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else if (result.length) {
              app.get('/InstanceFailure', function(req, res) {
              res.send(result);
            });
            } else {
            console.log('No document(s) found with defined "find" criteria!');
            }
          });
        }
module.exports=InstanceFailureAPI;
