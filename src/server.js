// Required
var express = require('express')
var http = require('http')
var cors = require('cors')

// Server
var app = express()
var server = http.createServer(app)

// Static File
app.use(express.static('./'))

// Cros Origin Enable
app.use(cors())

exports.init = function(){
    return server
}