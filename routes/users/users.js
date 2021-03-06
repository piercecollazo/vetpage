var express = require('express');
var router = express.Router();
const passport = require('passport')

let checklistController = require('../users/controllers/checklistController')
let userController = require('../users/controllers/userController')
let signupValidation = require('./utils/signupValidation')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  if(req.isAuthenticated()){
    return res.redirect('/')
  }

  res.render('auth/signup', {errors:req.flash('errors'), error_msg:null});
});

router.post('/signup', signupValidation, userController.signup, checklistController.createList)


router.get('/signin', function(req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/')
  }
  res.render('auth/signin', {errors:req.flash('loginMessage')});
});

router.post('/signin', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/api/users/signin',
  failureFlash: true
}))


router.get('/logout', (req, res, next)=>{
  req.logout()

  res.redirect('/')
})

router.get('/profile', (req, res, next)=>{
  checklistController.getList(req.user._id)
  .then(list => {
    userController.getProfile(req.user._id)
    .then( user => {
        res.render('users/profile', {
            errors:  req.flash('errors'),
            success: req.flash('success'),
            user:    user,
            list: list
        })
    })
  })

})

router.post('/profile', (req, res, next)=>{
  userController.update(req.body, req.user._id)
    .then(user => {
      req.flash('success', 'Successfully updated profile')
      res.redirect('/api/users/profile')
    })
    .catch(error => {
      req.flash('errors', error)
      res.redirect('/api/users/profile')
    })
})

// survey pages
router.get('/survey', (req, res, next)=>{
  res.render('checklist/surveyIntro')
})

router.get('/survey/ets', (req,res,next)=>{
  res.render('checklist/ets')
})

router.post('/survey/ets', (req, res, next)=>{
  checklistController.update(req.body, req.user._id)
    .then(user => {
      req.flash('success', 'Successfully updated checklist!')
      res.redirect('/api/users/survey')
    })
    .catch(error => {
      req.flash('errors', error)
      res.redirect('/api/users/survey/ets')
    })
})

router.get('/survey/school', (req,res,next)=>{
  res.render('checklist/school')
})

router.post('/survey/school', (req, res, next)=>{
  checklistController.update(req.body, req.user._id)
    .then(user => {
      req.flash('success', 'Successfully updated checklist!')
      res.redirect('/api/users/survey')
    })
    .catch(error => {
      req.flash('errors', error)
      res.redirect('/api/users/survey/school')
    })
})

router.get('/survey/housing', (req,res,next)=>{
  res.render('checklist/checkHome')
})

router.post('/survey/housing', (req, res, next)=>{
  checklistController.update(req.body, req.user._id)
    .then(user => {
      req.flash('success', 'Successfully updated checklist!')
      res.redirect('/api/users/survey')
    })
    .catch(error => {
      req.flash('errors', error)
      res.redirect('/api/users/survey/housing')
    })
})

router.get('/survey/counseling', (req,res,next)=>{
  res.render('checklist/counseling')
})

router.post('/survey/counseling', (req, res, next)=>{
  checklistController.update(req.body, req.user._id)
    .then(user => {
      req.flash('success', 'Successfully updated checklist!')
      res.redirect('/api/users/survey')
    })
    .catch(error => {
      req.flash('errors', error)
      res.redirect('/api/users/survey/counseling')
    })
})
module.exports = router;
