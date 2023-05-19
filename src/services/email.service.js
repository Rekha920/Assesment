const nodeMailer = require("nodemailer");
console.log()
const sendMail = async (mailObjectReceived) => {
  const transport= await nodeMailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user:  process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SENDER_PASSWORD
    }
  });
  
const mailOptions={
from: process.env.EMAIL_SENDER,
to: mailObjectReceived.to,   
subject: mailObjectReceived.subject,
html: `
      <html>
        <head>
          <title>One-Time Password</title>
        </head>
        <body>
          <h1>Your One-Time Password: ${mailObjectReceived.otp}</h1>
        </body>
      </html>
`,
};

const responseFromMailService=await transport.sendMail(mailOptions)
return responseFromMailService.response;
};
module.exports=sendMail;
