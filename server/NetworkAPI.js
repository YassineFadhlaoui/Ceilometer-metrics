var networkApi={};
networkApi.execute=function(app,db){
  var NetworkOutgonigBytes = db.collection('NetworkOutgonigBytes');
            NetworkOutgonigBytes.find().toArray(function (err, result) {
              if (err) {
                console.log(err);
              } else if (result.length) {
                app.get('/NetworkOutgonigBytes', function(req, res) {
                res.send(result);
              });
              } else {
              console.log('No document(s) found with defined "find" criteria!');
              }
            });
            var totalOutgoingBytes = db.collection('totalOutgoingBytes');
                      totalOutgoingBytes.find().toArray(function (err, result) {
                        if (err) {
                          console.log(err);
                        } else if (result.length) {
                          app.get('/totalOutgoingBytes', function(req, res) {
                          res.send(result);
                        });
                        } else {
                        console.log('No document(s) found with defined "find" criteria!');
                        }
                      });
    var NetworkIncomingBytes = db.collection('NetworkIncomingBytes');
            NetworkIncomingBytes.find().toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                app.get('/NetworkIncomingBytes', function(req, res) {
                res.send(result);
            });
              } else {
                console.log('No document(s) found with defined "find" criteria!');
                      }
            });
            var totalIncomingBytes = db.collection('totalIncomingBytes');
                    totalIncomingBytes.find().toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                    } else if (result.length) {
                        app.get('/totalIncomingBytes', function(req, res) {
                        res.send(result);
                    });
                      } else {
                        console.log('No document(s) found with defined "find" criteria!');
                              }
                    });

}

module.exports=networkApi;
