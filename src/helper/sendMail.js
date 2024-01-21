"use strict"

const nodemailer = require('nodemailer')

async function sendMail(data) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.NODEMAILER_PASS
        }
    });

    const mailOptions = {
        from: {
            name: "Bonna Touch",
            address: process.env.MAIL_FROM,
        },
        to: data.to,
        subject: 'Bonna Touch Design AI Support Information',
        text: `
            ${data.data}
        `

    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
}


module.exports = sendMail;