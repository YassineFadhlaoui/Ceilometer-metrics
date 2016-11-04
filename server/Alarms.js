var nodemailer = require('nodemailer');
var sendAlarm={};
sendAlarm.sendAlarams = function (message) {


  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://openstackmailer%40gmail.com:ceilometer@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"ceilometer" <openstackmailer@gmail.com>', // sender address
      to: 'yassinefadhlaoui93@gmail.com', // list of receivers
      subject: 'Alarm', // Subject line
      html: message // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }

  });

};
module.exports = sendAlarm;
