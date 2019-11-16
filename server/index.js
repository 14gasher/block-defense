const router = require('express').Router()

router
  .use('/user', require('./user'))
  .use('/game', require('./game'))

module.exports = router
