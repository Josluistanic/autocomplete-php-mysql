<?php

include_once '../includes/database.php';


class Autocompletar extends Database
{
    function buscar($texto)
    {
        $res = array();
        $query = $this->connect()->prepare("SELECT * FROM mascotas WHERE nombre LIKE :nombre");
        $query->execute(['nombre' => $texto . '%']);

        if ($query->rowCount()) {
            while ($r = $query->fetch()) {
                array_push($res, $r['nombre']);
            }
        }
        return $res;
    }
}
