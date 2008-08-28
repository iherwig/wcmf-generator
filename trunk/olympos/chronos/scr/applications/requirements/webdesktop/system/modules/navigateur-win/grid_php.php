<?php   
function grid_php() {

//Parametros para conectar a la base de datos
// $user='root';   //Usuario
// $pw='';     //Contraseña de usuario
// $db='desktop';     //Nombre de la base de datos 

$table='navigateur_favoris'; //Nombre de la tabla
$field_order='commentaires'; //Campo para ordenar
$type_order=' ASC '; //Tipo de ordenacion
    
//Crear conexion
// $connection = mysql_connect("localhost", $user, $pw) or
//   die("Erreur de connexion à la base de données: " . mysql_error());
// mysql_select_db($db) or die("Erreur lors de la sélection de la base de données");    

/*********************************************************************************************************
Las variables $start y  $end se encuentran en el archivo "grid_js.js" de la siguiente manera
store.load({
params: {
	start: 0,
	limit: 10
		}		   
});
Estos parametros nos permitin definir el tamaño de nuestras consultas a mostrar
*********************************************************************************************************/    
    $start = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
    $end = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);  


/*********************************************************************************************************
Realizamos la consulta SQL con los parametros definidos al principio.
*********************************************************************************************************/   
    
    $sql_count = 'SELECT * FROM ' . $table . ' ORDER BY ' . $field_order . $type_order;
    $sql = $sql_count . ' LIMIT ' . $start . ', '. $end;
    
    $result_count = mysql_query($sql_count);

/*********************************************************************************************************
La variable $rows contiene el total de registros que contiene la tabla definida en la variable: $table
*********************************************************************************************************/   

    $rows = mysql_num_rows($result_count);
    
    $result = mysql_query($sql);
    
    while($rec = mysql_fetch_array($result, MYSQL_ASSOC)){
		/*Guardamos todos los registros*/
        $nom = $rec['nom'];
        $adresse= html_entity_decode($rec['adresse']);
		$commentaires= html_entity_decode($rec['commentaires']);
		$date= html_entity_decode($rec['date']);
        
		/*Creamos el arreglo que se enviara en formato JSON*/
        $arr[] = $rec;
    };
	

//    if (version_compare(PHP_VERSION,"5.2","<"))
//    { 
	/*Si nuestra version de PHP es inferior a 5.2*/   
//        require_once("JSON.php"); //incluimos el archivo JSON.php
//        $json = new Services_JSON();//Instanciamos un nuevo objeto del tipo JSON
//        $data=$json->encode($arr);  //Codificamos el arreglo $arr[] en formato JSON
//    } else
//    {
	/*Si nuestra version de PHP no es inferior a 5.2*/
        $data = json_encode($arr);  //Codificamos el arreglo $arr[] en formato JSON
//    }

/*********************************************************************************************************
Los valores de las propiedades root y totalProperty:

var store = new Ext.data.JsonStore({ 	
    root: 'datos',
	totalProperty: 'total'

Se asignan en la siguiente linea:
*********************************************************************************************************/  	       
     
	echo '({"total":"' . $rows . '","datos":' . $data . '})';

}


// get the os
require_once("../../core/os.php");

$success = "{'success': false}";

$os = new os();

if($os->is_member_logged_in()) {
	$success = grid_php();
}

print $success;


?>