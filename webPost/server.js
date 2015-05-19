var port = 8081;

var express = require('express')
  , app = module.exports = express()
  , cors = require('cors')
  , http = require('http')
  , server = http.createServer(app)
  , bodyParser = require('body-parser');
  //server.listen(port);

var databaseUrl = "TSD"; //Name db MongoDB

//Usado para Routing
app.use("/function", express.static(__dirname + '/function'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/css/", express.static(__dirname + '/css/'));
app.use("/fonts/", express.static(__dirname + '/fonts/'));
app.use("/", express.static(__dirname + '/view/'));
app.use("/", express.static(__dirname + '/'));
//Usado para realizar el Post
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.log('Web Services Online in Port ' + port);

//Inicio post
var request = require('request');
var tweetPOST = {"tweet": "Hola desde NodeJS!"};

request({
    url: "http://localhost:4567/datos",
    method: "POST",
    json: true,   // <--Very important!!!
    body: tweetPOST
}, function (error, response, body){
    console.log(response);
});
//Fin post

