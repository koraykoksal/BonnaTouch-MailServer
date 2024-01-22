"use strict"

const { json } = require('express');
const nodemailer = require('nodemailer')

async function sendMail(to, subject, tableData) {

    let text = "";

    tableData.forEach(element => {
        const colorTypes = element.ColorType
        text += `CuisineType: ${element.CuisineType}\n`;
        text += `StyleType: ${element.StyleType}\n`;
        text += `ColorType: ${colorTypes}\n`;
        text += `Url: ${element.URL}\n\n`;
        
    });

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
        to: to,
        subject: subject,
        text: `Müşteri bilgileri\n\n\n${text}`

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