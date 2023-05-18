module.exports.EmailVerifyTemplate = (key, userName) => {
    return `
Dear ${userName},</br>

Thank you for signing up with Dilip Biotech.. In order to activate your account, we need to verify your email address.</br>

To verify your email address, please click the following link:</br>

<a href="${process.env.EMAIL_VERIFY_URL}/${key}">Click Here</a>

</br></br>
If you are unable to click the link, please copy and paste it into your web browser.</br>

Once you have verified your email address, you will be able to log in to your account and start using our services.</br>

If you did not create an account with us, please disregard this email.</br>

If you have any questions or concerns, please do not hesitate to contact us at [Insert Contact Information Here].</br>
</br>
Thank you,</br>
Dilip Biotech.`
}