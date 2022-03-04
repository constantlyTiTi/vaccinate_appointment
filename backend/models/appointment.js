const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Appointment = new Schema(
    {
        card_number:{type: String, required: true},
        vaccne_site:{type: String, required: true},
        priority_area: {type: String,
            enum: ['80+', 'healthcare', 'essential'],
            required: true,},
        date_time:{type: Date, required: true}, 
        cancelled:{type: Boolean, required: true},
    },
    { timestamps: true },
)
module.exports = mongoose.model('appointment', Appointment)