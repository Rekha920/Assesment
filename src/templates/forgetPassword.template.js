module.exports.ForgetPasswordTemplate = (key, userName) => {
    return `
Dear ${userName},</br>

We have received a request to reset the password for your account. If you did not initiate this request, please ignore this email.</br>
To reset your password, please click the following link:</br>
<a href="${process.env.FORGET_PASSWORD_URL}?key=${key}">Click Here</a>

If you are unable to click the link, please copy and paste it into your web browser.</br>
Once you have clicked the link, you will be prompted to enter a new password. Please ensure that your password is strong and secure.</br>
If you have any questions or concerns, please do not hesitate to contact us at [Insert Contact Information Here].
</br></br>
Thank you,</br>
- DilipBiotech
</br>`
}