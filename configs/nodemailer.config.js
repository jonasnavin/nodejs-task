const nodemailer = require("nodemailer")
const { MAIL_ADDRESS, MAIL_PASSWORD } = require("./env.config")

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false,
    auth: {
        user: MAIL_ADDRESS,
        pass: MAIL_PASSWORD
    }
})

module.exports = { transporter }