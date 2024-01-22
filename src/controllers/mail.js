"use strict"

const mail = require('../helper/sendMail')

module.exports = {
    sendMail: async (req, res) => {

        const { to, note ,data, subject } = req.body;

        if (to && subject && data) {

            const userInfo = data.map((item)=>({
                name:item.user.name,
                surname:item.user.surname,
                job:item.user.job,
                company:item.user.company,
                country:item.user.country,
                email:item.user.email,
                companyType:item.user.companyType
            }))

            // Veriyi düzgün bir formata dönüştürmek
            const tableData = data.map(({ url, text, id }) => ({
                URL: url,
                CuisineType: text.cuisineType,
                ColorType: text.colorType.join(', '),
                StyleType: text.styleType,
                ID: id
            }));


            try {

                // E-posta gönderme işlemini bekleyin
                // data parametresi userInfo bilgisini içeriyor
                await mail(to, subject, tableData, userInfo, note);

                // Başarılı yanıt gönder
                res.status(200).send({
                    response: {
                        error: false,
                        status: 200,
                        message: "Email successfully sent."
                    }
                });
            }
            catch (error) {
                // Hata durumunda hata yanıtı gönder
                res.status(500).send({
                    error: true,
                    message: `Error sending email: ${error.message}`
                });
            }

        }
        else {
            res.status(400).send({
                error: true,
                message: 'To and data required !'
            })
        }


    }
};