global.router = require('express').Router()
var router = global.router

router = require('./user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
