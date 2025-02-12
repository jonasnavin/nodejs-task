const { MAIL_ADDRESS } = require("../configs/env.config")
const { transporter } = require("../configs/nodemailer.config")

const sendExpiryEmail = async (userEmail, enquiryId) => {

    const mailOptions = {
        from: {
            name: "Node JS Task",
            address: MAIL_ADDRESS
        },
        to: [userEmail],
        subject: "Enquiry Expired Notification",
        text: `Your enquiry (ID: ${enquiryId}) has expired.`
    }

    try {
        await transporter.sendMail(mailOptions)

        console.log(`Email sent to ${userEmail}`)
    } catch (error) {
        console.error("Error sending email:", error)
    }
}

module.exports = sendExpiryEmail