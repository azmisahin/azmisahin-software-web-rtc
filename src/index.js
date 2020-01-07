/**
 * Nodejs Static Server-Side Boot
 */
var static = require('node-static');

// Root
var file = new static.Server('./');
 
// Http Request and Response
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();

})
// Listen Port
.listen(8080);