var serveStatic = require('serve-static');
var http = require('http');
var path = require('path');
var colors = require('colors');
var finalhandler = require('finalhandler')

module.exports = function(cwd, args, callback) {

    var port = args.hasOwnProperty('p') ? args.p : 4000 ;

    var serve = serveStatic(cwd, {
        'index': ['index.html', 'index.htm']
    })

    var server = http.createServer(function(req, res) {
        var done = finalhandler(req, res)
        serve(req, res, done)
    })

    server.listen(port)
    console.log('Your project is running at ' + ('http://localhost:' + port).underline)
}
