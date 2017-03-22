# Ceilometer-metrics
This project aims to exploit ceilometer statistics and metrics 
## PART III
* [Autoscaling with heat](https://github.com/YassineFadhlaoui/Autoscaling-Heat)
The third part of the project consist in autoscaling the cluster (adding and removing instances)
# How it works
## the server
* when the server starts it creates new collections :
* RAM collection
* CPU collection
* ...
* sends Alarms to admin email
* creates APIs endpoint

## the client 

* Retrieves date from APIs
* draws charts and pies

## Getting start

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```
$ git clone https://github.com/YassineFadhlaoui/Ceilometer-metrics.git
$ cd Ceilometer-metrics
```

## Install client dependencies

```
$ cd client
$ npm install
```

## Install server dependencies

```
$ cd server
$ npm install
```
# Running the tests

## how to run the project ?

### Running the server

```
$ cd server
$ node server.js
```

### Running the client application

```
  $ cd client
  $ npm start 
```

then visit [http://localhost:8000/](http://localhost:8000/)

# Requirments

* Openstack installed and running
* ceilometer installed and running correctly
* Mongod server up
* mongo client installed
* one instance up and running at least
* nodejs installed
* Internet connection

# Programming languages

* Javascript
* Shell

# Runtime

* Nodejs 4.5.0 LTS 

# Author

*Yassine Fadhlaoui* - **Initial work** - [Yassine Fadhlaoui](https://github.com/YassineFadhlaoui)

# License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/YassineFadhlaoui/Ceilometer-metrics/blob/master/LICENSE) file for details
