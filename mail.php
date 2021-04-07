<?php
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "armansoorofficial@gmail.com";
$subject = "Mail From armansoor";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
$headers = "From: contact@armansoor.ezyro.com" . "\r\n" .
"CC: armansoor2016@gmail.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:thankyou.html");
?>