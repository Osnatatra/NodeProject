const nodeMailer= require('nodemailer')
const sendMail=(email)=>{
    
var transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Osnatatra@gmail.com',
    // pass: '0509060113'
    pass: process.env.PASS
  }
});

var mailOptions = {
  from: 'osnatatra@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js',
  text: 'welcome!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
}
module.exports={sendMail}