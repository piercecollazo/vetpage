const User = require('../models/User')
const Checklist = require('../models/Checklist')

module.exports = {
    createList: (req, res)=>{
        let checklist = new Checklist()

        checklist.name = req.user._id
        if(req.user.profile.status == 'Veteran'){
            checklist.ets.date = 'Completed'
            checklist.ets.ta50 = true
            checklist.ets.health.dental = true
            checklist.ets.health.health = true
        }

        checklist.save((error) => {
            if (error) {
                res.status(400).json({
                    confirmation: 'failure',
                    message: error
                })
            } else {
                console.log('Checklist created successfully!')
                res.redirect('/')
            }
        })
    }
}