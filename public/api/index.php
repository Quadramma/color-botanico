<?php

require 'flight/Flight.php'; 
require 'flight/rb.php'; 

//SYNGENTA START
	Flight::route('GET /', function(){
		Flight::connectQuadrammaSyngentaDB();
	    $res = array(
	      "ok"=>true,
	      "message"=>'Everything work just fine Mr Syngenta.',
	      );
	    Flight::jsoncallback($res);
	});
	
	Flight::route('GET /planes', function(){
		Flight::connectQuadrammaSyngentaDB();
		$planes = R::getAll( 'SELECT * FROM planes');
	    $res = array(
	      "ok"=>true,
	      "data"=> $planes,
	      "message"=>'Everything work just fine Mr Syngenta.',
	      );
	    Flight::jsoncallback($res);
	});

	
	Flight::map('connectQuadrammaSyngentaDB',function(){
		R::setup('mysql:host=localhost;dbname=lc000386_syngenta','lc000386_syng','Syng@155335740'); 
	});

//SYNGENTA END

Flight::map('getData',function(){
	return json_decode(file_get_contents('php://input'),TRUE);
});
Flight::map("setCrossDomainHeaders",function(){
	header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
});
Flight::route("OPTIONS *",function(){
	Flight::setCrossDomainHeaders();
});
Flight::route("OPTIONS /*/*",function(){
	Flight::setCrossDomainHeaders();
});
Flight::map("jsoncallback",function($data){
	Flight::setCrossDomainHeaders();
		echo json_encode($data);
		exit;
	});
Flight::start();
?>