var http = require('http');
var port = process.env.port || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);


//var net = require('net'),
//    server;
   
//function handleConnection(connection){
//    connection.on('data', function (data) {
//        console.log('data: ' + data);
//        connection.write('Hi Mom!');
//        connection.end();
//    });
//}

//server = net.createServer(handleConnection);

//server.listen(3000, function () {
//    console.log('Server is listening');
//});