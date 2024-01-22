"use strict"

const { json } = require('express');
const nodemailer = require('nodemailer')

async function sendMail(data) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.NODEMAILER_PASS
        }
    });

    // Veriyi düzgün bir formata dönüştürmek
    const tableData = JSON.parse(data.data).map(({ url, text, id }) => ({
        URL: url,
        CuisineType: text.cuisineType,
        ColorType: text.colorType.join(', '),
        StyleType: text.styleType,
        ID: id
    }));

    let html = `<table border="1"><tr><th>URL</th><th>Cuisine Type</th><th>Color Type</th><th>Style Type</th><th>ID</th></tr>`;

    tableData.forEach(item => {
        html += `<tr>
                   <td>${item.url}</td>
                   <td>${item.text.cuisineType}</td>
                   <td>${item.text.colorType.join(', ')}</td>
                   <td>${item.text.styleType}</td>
                   <td>${item.id}</td>
                 </tr>`;
    });

    html += `</table>`;

    const mailOptions = {
        from: {
            name: "Bonna Touch",
            address: process.env.MAIL_FROM,
        },
        to: data.to,
        subject: data.subject,
        text: `${html}`

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