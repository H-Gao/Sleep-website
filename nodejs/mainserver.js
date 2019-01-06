const http = require('http');

http.createServer(function (req, res) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.writeHead(200, {'Access-Control-Allow-Origin':'*'});
    res.write('Testing');
    return res.end();
}).listen(8080);