<?php

//include_once URL.'models/models.php';
include_once '../models/autocompletar.php';

$modelo = new Autocompletar();                                      //Instanciando al modelo
$texto = $_GET['tipo-mascota'];                                     //Llamando al input por su name

$res = $modelo->buscar($texto);
echo json_encode($res);

?>