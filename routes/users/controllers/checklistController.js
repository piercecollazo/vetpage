const User = require('../models/User')
const Checklist = require('../models/Checklist')

module.exports = {
    createList: (req, res)=>{
        let checklist = new Checklist()
        checklist.owner = req.user._id
        checklist.name = req.user.profile.name
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
    },
    update:(params, id)=>{
        return new Promise((resolve, reject)=>{
            Checklist.findOne({owner: id})
                .then(checklist=>{
                    if(!checklist){
                        let errors = {}
                        errors.message = 'Cannot find user'
                        errors.status = 400

                        reject(errors)
                    } else {

                        if(params.name)checklist.name = params.name
                        if(params.ets.date)checklist.ets.date = params.ets.date
                        if(params.school.name)checklist.school.name = params.school.name
                        if(params.school.grants)checklist.school.grants = params.school.grants
                        if(params.school.benefits)checklist.school.benefits = params.school.benefits
                        if(params.school.attendance)checklist.school.attendance = params.school.attendance
                        if(params.housing)checklist.housing = params.housing
                        if(params.employment)checklist.employment = params.employment
                        
                        checklist.save((error) => {
                            if (error) {
                                res.status(400).json({
                                    confirmation: 'failure',
                                    message: error
                                })
                            } else {
                                console.log('Checklist update successfully saved!')
                                res.redirect('/')
                            }
                        })
                    }
        })
        .catch(error => reject(error))
    })
    }
}