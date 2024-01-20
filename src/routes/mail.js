"use strict"


const mail = require('../controllers/mail')
const router = require('express').Router()

router.route('/email').post(mail.sendMail)





module.exports = router