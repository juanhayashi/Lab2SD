var port = 8081;

function split_n(a, n) {
    var len = a.length,out = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i += size));
    }
    return out;
}

function merger(array, start, end) {
    if (Math.abs(end - start) <= 1) {
        return [];
    }
    var middle = Math.ceil((start + end) / 2);

    merger(array, start, middle);
    merger(array, middle, end);

    return merge(array, start, middle, end);
}

function merge(array, start, middle, end) {
    var left = [],
        right = [],
        leftSize = middle - start,
        rightSize = end - middle,
        maxSize = Math.max(leftSize, rightSize),
        size = end - start,
        i;

    for (i = 0; i < maxSize; i += 1) {
        if (i < leftSize) {
            left[i] = array[start + i];
        }
        if (i < rightSize) {
            right[i] = array[middle + i];
        }
    }
    i = 0;
    while (i < size) {
        if (left.length && right.length) {
            if (left[0] >= right[0]) {
                array[start + i] = right.shift();
            } else {
                array[start + i] = left.shift();
            }
        } else if (left.length) {
            array[start + i] = left.shift();
        } else {
            array[start + i] = right.shift();
        }
        i += 1;
    }
    return array;
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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
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
			process.exit(1);
		} 
	} 
} 
//console.log(options['archivo'])
//console.log(options['servidores'])
//onsole.log(options['metodo'])
//Inicio post
var request = require('request');
var data;
var  arrayaux=[];
var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require("event-stream");

var lineNr = 0;

s = fs.createReadStream(options['archivo'])
    .pipe(es.split())
    .pipe(es.mapSync(function(line){
        // pause the readstream
        s.pause();
		arrayaux.push(parseFloat(line.replace(",", ".")))
        lineNr += 1;
        (function(){

            // process line here and call s.resume() when rdy
            //logMemoryUsage(lineNr);

            // resume the readstream
            s.resume();

        })();
    })
    .on('error', function(){
        console.log('Error while reading file.');
    })
    .on('end', function(){
        console.log('Archivo leido completamente')
        var array=split_n(arrayaux,options['servidores']);
        //go, ruby, python, php
		servs = ["http://10.42.0.1:8088/datos", "http://10.42.0.100:4567/datos", "http://10.42.0.100:8082/datos","http://10.42.0.1:8080/server.php/datos"];
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
			 	//console.log(body);
			 });
		}
        console.log("Datos enviados")
    })
);

arraytodos=[]
app.post('/send', function(req, res){
	arraytodos=arraytodos.concat(req.body.numeros)
    res.send("hola")
	if (arraytodos.length==lineNr){
    console.log("Se recibieron todas las partes ordenadas")
        arraytodosordenado=merger(arraytodos,0,lineNr);
        var file=fs.createWriteStream('resultado.part');
        file.on('error', function(err){});
        arraytodosordenado.shift();
        arraytodosordenado.forEach(function(v){file.write(v+"\n");});
        file.end();
        console.log("Archivo generado con todos los numeros ordenados")
	}
})
