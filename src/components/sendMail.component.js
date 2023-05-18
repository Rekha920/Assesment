const nodemailer = require('nodemailer');

const sendMailF = async (req, res) => {
    try {
        const { to, subject, text } = req.body;
        const sendEmaild = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "25b2fbac87bd73",
                pass: "810fabd6a38238"
            }
        });

        const options = {
            from: "dilip.bijoriya@emorphis.in",
            to: to,
            subject: subject,
            text: text,
            html: "<h1>Welcome user</h1>"
        };
        sendEmaild.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                return res.status(200).send({
                    message: "email sent successfully",
                    message_id: info.messageId
                });
            }
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error.message,
            response: null
        });
    }
}

module.exports = sendMailF;