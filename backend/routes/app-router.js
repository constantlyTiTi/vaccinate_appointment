const express = require('express')

const appCtrl = require('../controllers/app-ctrl')

const router = express.Router()

router.post('/post', appCtrl.createAppointment)
router.get('/all', appCtrl.listAppointments)
router.delete('/:app_id', appCtrl.deleteAppointment)

module.exports = router