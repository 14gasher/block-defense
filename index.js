const path = require('path')
const express = require('express')
const port = process.env.PORT ? process.env.PORT : 3000 // allow us to provide multiple ports on a single machine

const app = express()

app
  .use((req,res,next) => console.log(req.url) || next())
  .use('/api', require('./server'))
  .use(express.static('public')) // Link all the public files
  .use('*', (req, res) => res.redirect('/'))
  .listen(port)

console.log('Starting on port', port)
module.exports = app
