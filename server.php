<?php

//Hay que instalar Composer, y desde Composer instalar Slim. En referencias aparece como instalar.
require 'vendor/autoload.php';
 
$app = new \Slim\Slim();

$app->get("/", function () {
    echo "<h1>Hola, mundo!</h1>";
});
 
$app->post("/datos", function () use ($app) {
    $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    var_dump($dat);
    echo $data->numeros;
});
 
// corremos la aplicación
$app->run();

?>