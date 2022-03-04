const Appointment = require("../models/appointment")


createAppointment = async (req, res) => {

    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'please provide the information'
        })
    }

    const appointment = Appointment(body)

    if (!appointment) {
        return res.status(400).json({ success: false, error: err })
    }

    const error = appointment.validateSync()
    // if(error.errors){
    //     return res.status(422).json({
    //         error:'validation error'
    //     })
    // }

    appointment.save()
        .then((item) => {
            return res.status(201).json({
                success: true,
                data: item,
                message: 'Appointment created!',
            })
        })
        .catch(error => {
            console.log(error)
            return res.status(422).json({
                message: 'Appointment not created!',
            })
        })
}

deleteAppointment = async (req, res) => {
    await Appointment.findOneAndDelete({ _id: req.params.app_id }, (err, app) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!app) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: app })
    }).catch(err => console.log(err))
}

listAppointments = async (req, res)=>{
    try{
        let apps = await Appointment.find()
        return res.status(200).json({ success: true, data:apps })
    }
    catch(e){
        return res.status(500).json(e) 
    }
}

module.exports = {
    createAppointment,
    deleteAppointment,
    listAppointments
}