"use strict"



module.exports = {


    sendMail: async (req, res) => {


        const { to } = req.body

        if (to) {

            res.send({
                error: false,
                result: "to is correct",
                to:to
            })

        } else {
            res.errorStatusCode = 401
            throw new Error('This account is not active.')
        }


    }


}