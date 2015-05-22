var port = 8081;

function split_n(a, n) {
    var len = a.length,out = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i += size));
    }
    return out;
}

var express = require('express')
  , app = module.exports = express()
  , cors = require('cors')
  , http = require('http')
  , server = http.createServer(app)
  , bodyParser = require('body-parser');
  server.listen(port);

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
var stdio = require('stdio');
 
var options = stdio.getopt({
	'archivo': {
		key: 'a',
		mandatory: true,
		args: 1
	},
	'servidores': {
		key: 'n',
		args: 1
	},
	'metodo': {
		key: 'm',
		args: 1
	}
})
if(options['metodo']!="bubblesort"){
	if(options['metodo']!="quicksort"){
		if(options['metodo']!="mergesort"){
			console.log("metodo no valido\n")
			return 0
		} 
	} 
} 
console.log(options['archivo'])
console.log(options['servidores'])
console.log(options['metodo'])
//Inicio post
var request = require('request');
var data;
var arrayaux=[];
var fs = require('fs');

fs.readFile('./'+options['archivo'], 'utf8', function(err, data) {
	//console.log(data);
	var arrayaux = data.split("\n").map(function (val) { return +val; });
	arrayaux.pop();
	//console.log(array);
	var array=split_n(arrayaux,options['servidores']);
	//console.log(array);

	servs = ["http://192.168.50.11:8088/datos", "http://192.168.0.174:4567/datos", "http://192.168.50.11:8082/datos"];
	//Inicio for
	for (var i=0; i<options['servidores']; i++){
		var datos = {
			"metodo": options['metodo'],
			"numeros": array[i]
		};
		request({
		url: servs[i],
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		json: true, // <--Very important!!!
		body: datos
		}, function (error, response, body){
		console.log(body);
		});
	}
});

arraytodos=[]

app.post('/send', function(req, res){
	arraytodos.push(req.body.numeros)
	console.log(arraytodos)
	res.send("holo");

});

