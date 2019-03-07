var Email = require('email-templates');
var nodemailer = require('nodemailer');
var appConfig = require('../config');

let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "cb23f13597ecc9", // generated ethereal user
        pass: "0e3efd33470794" // generated ethereal password
    }
});

const email = new Email({
    views: {
        options: {
            extension: 'ejs' // <---- HERE
        }
    }
});


exports.welcomeEmail = (name, to, link) => {
    email.render('templates/welcome', {
        name: name,
        link: link
    }).then(data => {
        let mailOptions = {
            from: appConfig.adminEmail, // sender address
            to: to, // list of receivers
            subject: "Welcome to Meathut", // Subject line
            html: data
        };
        transporter.sendMail(mailOptions)
            .then(console.log)
            .catch(console.log);
    })
}