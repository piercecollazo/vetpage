var express = require('express');
var router = express.Router();
const passport = require('passport')

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

router.post('/signup', signupValidation, userController.signup)


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
  userController.getProfile(req.user._id)
  .then( user => {
      res.render('users/profile', {
          errors:  req.flash('errors'),
          success: req.flash('success'),
          user:    user
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

module.exports = router;
