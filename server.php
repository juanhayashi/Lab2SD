<?php

//Hay que instalar Composer, y desde Composer instalar Slim. En referencias aparece como instalar.
require 'vendor/autoload.php';
 
 
 
//Funciones: 

//Bubblesort
function bubbleSort(array $arr)
{
    $n = sizeof($arr);
    for ($i = 1; $i < $n; $i++) {
        for ($j = $n - 1; $j >= $i; $j--) {
            if($arr[$j-1] > $arr[$j]) {
                $tmp = $arr[$j - 1];
                $arr[$j - 1] = $arr[$j];
                $arr[$j] = $tmp;
            }
        }
    }
     
    return $arr;
}

//Quicksort
function quicksort($array) {
    if(count($array) < 2) return $array;
 
    $left = $right = array();
 
    reset($array);
    $pivot_key = key($array);
    $pivot = array_shift($array);
 
    foreach($array as $k => $v) {
	if($v < $pivot)
            $left[$k] = $v;
        else
            $right[$k] = $v;
    }
 
    return array_merge(quicksort($left), array($pivot_key => $pivot), quicksort($right));
}

//Mergesort
function merge_sort(&$arrayToSort)  
{  
    if (sizeof($arrayToSort) <= 1)  
        return $arrayToSort;  
  
    // split our input array into two halves  
    // left...  
    $leftFrag = array_slice($arrayToSort, 0, (int)(count($arrayToSort)/2));  
    // right...  
    $rightFrag = array_slice($arrayToSort, (int)(count($arrayToSort)/2));  
  
    // RECURSION  
    // split the two halves into their respective halves...  
    $leftFrag = merge_sort($leftFrag);  
    $rightFrag = merge_sort($rightFrag);  
  
    $returnArray = merge($leftFrag, $rightFrag);  
  
    return $returnArray;  
}  
  
//Funcion auxiliar  
function merge(&$lF, &$rF)  
{  
    $result = array();  
  
    // while both arrays have something in them  
    while (count($lF)>0 && count($rF)>0) {  
        if ($lF[0] <= $rF[0]) {  
            array_push($result, array_shift($lF));  
        }  
        else {  
            array_push($result, array_shift($rF));  
        }  
    }  
  
    // did not see this in the pseudo code,  
    // but it became necessary as one of the arrays  
    // can become empty before the other  
    array_splice($result, count($result), 0, $lF);  
    array_splice($result, count($result), 0, $rF);  
  
    return $result;  
}  


function httpPOST($datos)
{
    //API Url
    $url = 'http://localhost:8081';
     
    $ch = curl_init($url);

    $jsonDatos = json_encode($datos);
     
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDatos);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
    $resultado = curl_exec($ch);
    return $resultado;
}
//Fin Funciones

//Inicio Server
$app = new \Slim\Slim();

$app->get("/", function () {
    echo "<h1>Hola, mundo!</h1>";
});
 
$app->post("/datos", function () use ($app) {
    $json = $app->request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    //var_dump($data);
    $metodo = $data['metodo'];
    $numeros = $data['numeros'];

    switch($metodo){
        case "bubblesort":
            $numeros = bubbleSort($numeros);
            //HTTP POST req
            $resultado = httpPOST($numeros);
            
            break;
        case"mergesort":
            $numeros = merge_sort($numeros);
            //HTTP POST req
            $resultado = httpPOST($numeros);
            
            break;
        case"quicksort":
            $numeros = quicksort($numeros);
            //HTTP POST req
            $resultado = httpPOST($numeros);
            
            break;
    }
    
});
 
$app->run();



?>