var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
/*var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'nancy.gandhi23@gmail.com',
        pass: '**'
    }
});*/
var sendEmail=function() {
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'charllygandhi@gmail.com',
        pass: '***********'
    }
}));

var mailOptions = {
    from: 'charllygandhi@gmail.com',
    //to:to_id,
    to: 'sumitbhutani1412@gmail.com ,nancy.gandhi23@gmail.com,charllygandhi@gmail.com',
    subject: 'Welcome to the virtual classroom.',
    //text: 'That was easy!'
    html: '<h2>Welcome to the Virtual classroom!!</h2><br><p>You have successfully signed up for the virtual classroom.</p><br>Regards,<br>Virtual Classroom Admin'
};


    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
}

module.exports = sendEmail