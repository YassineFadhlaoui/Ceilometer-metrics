var ram={};
ram.execute=function(app,db){
var RAM = db.collection('RAM');
          RAM.find().toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else if (result.length) {
              app.get('/RAM', function(req, res) {
              res.send(result);
            });
            } else {
            console.log('No document(s) found with defined "find" criteria!');
            }
          });
        }
module.exports=ram;
