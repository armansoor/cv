<<<<<<< HEAD
<?php
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "armansoorofficial@gmail.com";
$subject = "Mail From armansoor";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
$headers = "From:armansoor156@gmail.com" . "\r\n" .
"CC:armansoor2016@gmail.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:thankyou.html");
=======
<?php
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "armansoorofficial@gmail.com";
$subject = "Mail From armansoor";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
$headers = "From:armansoor156@gmail.com" . "\r\n" .
"CC:armansoor2016@gmail.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:thankyou.html");
>>>>>>> 96a379d98e278c596d94b548a8aad77c7593eb51
?>