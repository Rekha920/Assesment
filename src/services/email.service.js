const nodeMailer = require("nodemailer");

const sendMail = async (mailObjectReceived) => {
  const transport= await nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7f4bbde8d07c63",
      pass: "fbece406b9cab3"
    }
  });
  
const mailOptions={
from: '7f4bbde8d07c63',  // sender address
to: mailObjectReceived.to,   // list of receivers
subject: mailObjectReceived.subject,
html: `<b>Hey there! ${mailObjectReceived.text} </b><br> This is our first message sent with Nodemailer<br/>`,
};

const response=await transport.sendMail(mailOptions)
return response.response;
};
module.exports=sendMail;
