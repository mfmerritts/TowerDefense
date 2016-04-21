var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    mimeTypes = {
        '.js' : 'text/javascript',
        '.html' : 'text/html',
        '.css' : 'text/css'
    };

function handleRequest(request, response) {
    var lookup = (request.url === '/') ? '/Scaffold/index.html' : decodeURI(request.url),
        file;
    console.log('request: ' + request.url);
    file = lookup.substring(1, lookup.length);
    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, function (err, data) {
                if (err) {
                    response.writeHead(500);
                    response.end('Server Error!');
                } else {
                    var headers = { 'Content-type': mimeTypes[path.extname(lookup)] };
                    response.writeHead(200, headers);
                    response.end(data);
                }
            });
        } else {
            response.writeHead(404);
            response.end();
        }
    });
}

http.createServer(handleRequest).listen(3000, function () {
    console.log('Server is listening');
});

/* Depricated
var http = require('http'),
    port = process.env.port || 1337,
    path = require('path'),
    fs = require('fs'),
    mimeTypes = {
        '.js' : 'text/javascript',
        '.html' : 'text/html',
        '.css' : 'text/css'
    };

function handleRequest(request, response){
    var lookup = (request.url === '/') ? '/Scaffold/index.html' : decodeURI(request.url),
        file;

    file = lookup.substring(1, lookup.length);
    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, function (err, data) {
                if (err) {
                    response.writeHead(500);
                    response.end('Server Error');
                } else {
                    var headers = { 'Content-type' : mimeTypes[path.extname(lookup)] };
                    response.writeHead(200, headers);
                    response.end(data);
                }
            });
        } else {
            console.log(file + ' does not exist');
        }
    });
}

http.createServer(handleRequest).listen(port, function () {
    console.log('Server is listening');
});
*/