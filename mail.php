<?php

$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "armansoorofficial@gmail.com";
$subject = "Mail From armansoor's blog";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
$headers = "From:armansoor156@gmail.com" . "\r\n" .
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
?>