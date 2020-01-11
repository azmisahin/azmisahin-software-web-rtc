// Required
var express = require('express')
var http = require('http')

// Server
var app = express()
var server = http.createServer(app)

// Static File
app.use(express.static('./'))

exports.init = function(){
    return server
}