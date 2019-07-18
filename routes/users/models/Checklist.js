const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

let CheckSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'user'},
    name: {type: String, default: ''},
    ets: {
        date:{type: String, default: ''},
        ta50:{type: Boolean, default: false},
        health:{
            dental:{type: Boolean, default: false},
            health:{type: Boolean, default: false}
        }
    },
    school:{
        name:{type: String, default: 'Pending'},
        grants:{type: String, default: 'Pending'},
        benefits:{type: String, default: 'Pending'},
        attendance:{type: String, default: 'Pending'}
    },
    housing: {type: String, default: 'Pending'},
    employment: {type: String, default: 'Pending'},
    timestamp: {type: String, default: ()=> moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}
})

module.exports = mongoose.model('checklist', CheckSchema)