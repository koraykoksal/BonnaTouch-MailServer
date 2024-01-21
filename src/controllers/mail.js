"use strict"

const mail = require('../helper/sendMail')

module.exports = {
    sendMail: async (req, res) => {
        const result = req.body;

        // if (!result.to && !result.data) {
        //     return res.status(401).send({
        //         error: true,
        //         message: 'To and data required !'
        //     });
        // }

        if (result.to && result.data) {

            try {
                // E-posta gönderme işlemini bekleyin
                await mail(result);

                // Başarılı yanıt gönder
                res.status(200).send({
                    error: false,
                    message: "Email successfully sent."
                });
            } catch (error) {
                // Hata durumunda hata yanıtı gönder
                res.status(500).send({
                    error: true,
                    message: `Error sending email: ${error.message}`
                });
            }

        }
        else {
            res.status(401).send({
                error: true,
                message: 'To and data required !'
            })
        }


    }
};