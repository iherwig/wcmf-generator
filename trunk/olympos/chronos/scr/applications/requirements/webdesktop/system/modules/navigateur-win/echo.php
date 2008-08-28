<?php

	// connexion à la base
//	mysql_connect("localhost","root","") or die ("Impossible de se connecter");
//	mysql_select_db("desktop") or die("Impossible de trouver la base");           

	// recuperation des valeurs du formulaire
//	$nom= $_POST['nom'];
//	$adresse= $_POST['adresse'];
//	$commentaires= $_POST['commentaires'];
//	$date= $_POST['date'];


	// insertion des valeurs dans la base
//	$query = "insert into navigateur_favoris (nom, adresse, commentaires, date) values ('$nom','$adresse','$commentaires','$date')";
//	$result=mysql_query($query);

//	mysql_close();


// Modified coding below.


// get the os
require_once("../../core/os.php");

$success = "{'success': false}";

$os = new os();

if($os->is_member_logged_in()) {
	$success = saveFormData();
}

print $success;


function saveFormData() {
	// make all the strings safe
	$nom 		= '\''.mysql_real_escape_string($_REQUEST['nom']).'\'';
	$adresse 	= '\''.mysql_real_escape_string($_REQUEST['adresse']).'\'';
	$commentaires 	= '\''.mysql_real_escape_string($_REQUEST['commentaires']).'\'';
	$date 		= '\''.mysql_real_escape_string($_REQUEST['date']).'\'';
	
	$sql = 'INSERT INTO `navigateur_favoris` (`nom`, `adresse`, `commentaires`, `date`)
            VALUES ('.$nom.','.$adresse.','.$commentaires.','.$date.')';

	if (mysql_query($sql)) {
		return "{success:true}";
	} else {
                return "{success:false}";
	}
}


?>