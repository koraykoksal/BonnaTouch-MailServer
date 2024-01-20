"use strict"


const mail = require('../controllers/mail')
const router = require('express').Router()

router.route('/mail').post(mail.mail)


module.exports = router