var express = require('express');
var bodyParser = require('body-parser');

var server = express();
server.use(bodyParser.json());
server.set("views", __dirnam + "/templates");
server.set("view engine","jade");

server.use(express.static(__dirname + '/public_html'));

require('./routes/api')(server);
require('./routes/client')(server);

server.listen(8000);
