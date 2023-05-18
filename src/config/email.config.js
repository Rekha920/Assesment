const nodemailer = require('nodemailer');

const sendMailF = async (to, subject, text) => {
    const sendEmaild = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "25b2fbac87bd73",
            pass: "810fabd6a38238"
        }
    });

    const options = {
        from: `Forget Password <dilip.bijoriya@emorphis.in>`,
        to: to,
        subject: subject,
        html: text
    };

    sendEmaild.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("email sent!");
        }
    });
}

module.exports = sendMailF;