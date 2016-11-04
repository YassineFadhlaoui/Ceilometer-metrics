var express = require('express');
//Use Mongodb driver (native driver)
var mongodb = require('mongodb');
//data in meter collection is huge so we use Map Reduce to retrieve "useful data " only
var mongojs = require('mongojs');
//use the mongoclient to connect to the ceilometer database
//my modules
var cpuModule = require('./CPUModule');
var NetworkModule =require('./NetworkModule');
var RAMModule =require('./RAMModule');
var InstanceModule=require('./InstanceModule');
var InstanceFailureModule = require('./InstanceFailureModule');
var cpuApi = require('./CpuApi');
var networkApi= require('./NetworkAPI');
var ramApi= require('./RAMAPI');
var instanceApi= require('./InstanceAPI');
var InstanceFailureApi= require('./InstanceFailureAPI');
var MailAgent=require('./MailAgent');
//end my modules
var MongoClient = mongodb.MongoClient;
var sys = require('util');
var server = new mongodb.Server("localhost", 27017, {});
var db = new mongodb.Db('ceilometer', server, {});
var	express 		 = require('express');
var bodyParser		 = require('body-parser');
//Create The APPLication
var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(function(req, res , next){
	res.header('Access-Control-Allow-Origin' , '*');
	res.header('Access-Control-Allow-Methods' , 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers','Content-Type');
	next();
});
//ceilometer database url
var url = 'mongodb://localhost:27017/ceilometer';

//writing data to mongo collections

		cpuModule.execute();
		console.log('updating cpu collections ...OK!');
 		NetworkModule.execute();
		console.log('updating network collections ...OK!');
		RAMModule.execute();
		console.log('updating ram collection ...OK!');
		InstanceModule.execute();
		console.log('updating Instances collection ...OK!');
		InstanceFailureModule.execute();
		console.log('updating InstanceFailure collection ...OK!');
	//establishing connection
MongoClient.connect(url, function (err, db) {
  if (err) {
    //if connection fails
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //if connection succeed
    console.log('Connection established to ceilometer to retrive data');
		console.log('Retrieving data from cpu collections ...OK!');
		cpuApi.execute(app,db);
		console.log('Creating CPU APIs ...OK!');
		console.log('Retrieving data from Network collections ...OK!');
		networkApi.execute(app,db);
		console.log('Creating Network APIs ...OK!');
		ramApi.execute(app,db);
		console.log('Creating RAM APIs ...OK!');
		instanceApi.execute(app,db);
		console.log('Creating RAM APIs ...OK!');
		InstanceFailureApi.execute(app,db);
		console.log('Creating InstanceFailure APIs ...OK!');
		console.log('preparing mail template');
		//MailAgent.sendMail();
		console.log('mail sent');
		console.log('closing connection to ceilometer database');
		db.close();
		console.log('connection closed ...OK!');

}
}
);

app.listen(3001);
console.log('Listening on port 3001...');
