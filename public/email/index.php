<?php
require_once 'lib/swift_required.php';
//
//POST FIELDS
$POST_FIELD_NAME        = "nombreyapellido";
$POST_FIELD_EMAIL       = "email";
////POST VARS
$name                   = $_POST[$POST_FIELD_NAME];
$email                  = $_POST[$POST_FIELD_EMAIL];

//echo $name . ' ' . $email;
//exit;

//- Configuration --------------------------------
$SMTP_USER              = "contacto@colorbotanico.com"; //'javi@quadramma.com';         //IMPORTANT
$SMTP_PASS              = "cbotanico";                           //IMPORTANT
$SMTP                   = "server.microtech3.com"; //"smtp.gmail.com";             //IMPORTANT
$SMTP_PORT              = 465;                          //IMPORTANT
$SMTP_SECURITY          = "ssl"; // ssl or null    //IMPORTANT
$SUCCESS_MSG            = "1";
$FAILED_MSG             = "0";
//VALIDATIONS
$NAME_REQUIRED          = "Name required";
$EMAIL_REQUIRED         = "E-mail required";
//MESSAGE
$MSG_TITLE              = $name .' utilizo el formulario de contacto.';
$MSG_FROM               = 'info@colorbotanico.com';
$MSG_FROM_NICK          = 'Color Botanico Mailing';
$MSG_TO                 = 'damian@quadramma.com';                       //IMPORTANT

$MSG = "\nNombre y Apellido: " . $name;
$MSG = $MSG . "\nEmail: " .$email;
$MSG = $MSG . "\nTelefono: " .$_POST['telefono'];
$MSG = $MSG . "\nPais: " .$_POST['pais'];
$MSG = $MSG . "\nDesde: " .$_POST['dtpFrom'];
$MSG = $MSG . "\nHasta: " .$_POST['dtpTo'];
$MSG = $MSG . "\nTipo de apartamento: " .$_POST['tipoApartamento'];
$MSG = $MSG . "\nComentarios: " .$_POST['comentario'];
$MSG_BODY               =  $MSG;
$rta = 0;

$traces = array();

try{
  $rta = sendMail();
  echo $rta;
  exit;
}catch(Exception $e){
  $traces[] = $e->getMessage();
  echo json_encode($traces);
  exit;
}


function sendMail(){
    $traces[] = 'Creado Swift_SmtpTransport';
    $transport = Swift_SmtpTransport::newInstance($GLOBALS["SMTP"], $GLOBALS["SMTP_PORT"], $GLOBALS["SMTP_SECURITY"])
      ->setUsername($GLOBALS["SMTP_USER"])
      ->setPassword($GLOBALS["SMTP_PASS"]);
    $traces[] = 'Creado mailer';
    $mailer = Swift_Mailer::newInstance($transport);
    $traces[] = 'creando message';
    $message = Swift_Message::newInstance($GLOBALS["MSG_TITLE"])
      ->setFrom($GLOBALS["MSG_FROM"] , $GLOBALS["MSG_FROM_NICK"])
      ->setTo($GLOBALS["MSG_TO"],$GLOBALS["MSG_TO"])
      ->setBody($GLOBALS["MSG_BODY"]);
    $traces[] = 'enviando mensaje';  
    $r = $mailer->send($message);
    $traces[] = 'mensaje enviado. Respuesta: '. $r;
    //
    if($r == 1) return $GLOBALS["SUCCESS_MSG"];
    else        return $GLOBALS["FAILED_MSG"];
}
?>