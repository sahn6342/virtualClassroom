/**
 * Created by Nancy.Gandhi on 8/13/2017.
 */
const Nexmo = require('nexmo')
var rand = require('./rand.js').numeric
var randEm = require('./rand.js').static


var otp = rand()
var emCode = randEm()
    //var Nexmo = require('nexmo');

var sendSMS=function(){
    //const Nexmo = require('nexmo');
    const nexmo = new Nexmo({
        apiKey: '7750892a',
        apiSecret: '74d783ed192167a3'
    });

    /*var nexmo = new Nexmo({
     apiKey: config.API_KEY,
     apiSecret: config.API_SECRET
     },
     {debug: config.DEBUG}
     );*/

    nexmo.message.sendSms('NEXMO', '917206668095', 'Welcome to the portal. Your OTP code is '+otp, console.log('sent :'+otp));
    /*
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    }
    */

    /*nexmo.message.sendSms(
     YOUR_VIRTUAL_NUMBER, '15105551234', 'yo',console.log('sent'))
     );*/
}

module.exports=sendSMS