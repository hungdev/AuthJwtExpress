var router = global.router
let User = require('../models/userModels')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

router.post('/auth/register', function (req, res, next) {
  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    hash_password: bcrypt.hashSync(req.body.password, 10)
  })
  newUser.save((err) => {
    if (err) {
      res.json({
        result: 'failed',
        data: {},
        message: `Error is: ${err}`
      })
    } else {
      res.json({
        result: 'ok',
        data: {
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password,
          message: 'Create new user successfully'
        }
      })
    }
  })
})

router.post('/auth/sign_in', function (req, res, next) {
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) throw err
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' })
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' })
      } else {
        return res.json({token: jwt.sign({email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')})
      }
    }
  })
})

module.exports = router
