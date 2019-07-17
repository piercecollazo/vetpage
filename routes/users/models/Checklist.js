const mongoose = require('mongoose')
const moment = require('moment')

let CheckSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    ETS: {type: String, default: ''},
    school:{type: String, default: ''},
    housing: {type: String, default: ''},
    employment: {type: String, default: ''},
    timestamp: {type: String, default: ()=> moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}
})

module.exports = mongoose.model('checklist', CheckSchema)