var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var router = require('./router');
const mongoose = require('mongoose');
var cors = require('cors');

//db connection
mongoose.connect('mongodb://admin:admin@ds125623.mlab.com:25623/wyk');

//Middleware
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
router(app);

var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port);
console.log('Server listening on ' + port);