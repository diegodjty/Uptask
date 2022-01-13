const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util')
const emailConfig = require('../config/email');





let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass, // generated ethereal password
    },
});



  // Generate HTML
  const generateHTML = (file, options={}) =>{
      const html = pug.renderFile(`${__dirname}/../views/emails/resetPassword.pug`, options);
      return juice(html);
  }

  exports.send = async (options) =>{
    // send mail with defined transport object
    const html = generateHTML(options.file, options);
    const text = htmlToText.fromString(html)
    let info =  await transporter.sendMail({
      from: 'UpTask <no-reply@uptask.com>', 
      to: options.user.email, 
      subject: options.subject, 
      text,
      html
      
    });
    transporter.sendMail(info);
  }
