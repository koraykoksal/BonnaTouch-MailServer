"use strict"

const { json } = require('express');
const nodemailer = require('nodemailer')

async function sendMail(to, subject, tableData, userInfo, note) {


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
        text: `Customer Information\n
            About: Liked Data\n
            Name : ${userInfo[0]?.name || ""}\n
            Surname : ${userInfo[0]?.surname || ""}\n
            Job : ${userInfo[0]?.job || ""}\n
            Email : ${userInfo[0]?.email || ""}\n
            Country : ${userInfo[0]?.country || ""}\n
            Company : ${userInfo[0]?.company || ""}\n
            Company Type: ${userInfo[0]?.companyType || ""}\n\n
            
            Note: ${note}\n\n\n${text}`

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