<?php
require("./PHPMailer-master/src/PHPMailer.php");
require("./PHPMailer-master/src/SMTP.php");
require("./PHPMailer-master/src/Exception.php");
include('../connection/connection.php');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
header("Access-Control-Max-Age:1000");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
$_POST =json_decode(file_get_contents("php://input"),true);

if(isset($_POST)){
	
	$mail = new PHPMailer\PHPMailer\PHPMailer();
	$empId=$_POST['empId'];
	$email=mysqli_fetch_array(mysqli_query($con,"SELECT  `emp_email` FROM `employee` WHERE `emp_id`='$empId'"))[0];
	   		 $mail->IsSMTP(); 

            $mail->CharSet="UTF-8";
            $mail->Host = "smtp.gmail.com";
            $mail->SMTPDebug = 1; 
            $mail->Port = 465 ; //465 or 587

            $mail->SMTPSecure = 'ssl';  
            $mail->SMTPAuth = true; 
            $mail->IsHTML(true);

            //Authentication
            $mail->Username = "projecte276@gmail.com";
            $mail->Password = "projectproject";

            //Set Params
            $mail->SetFrom("projecte276@gmail.com");
            $mail->AddAddress($email);
            // $mail->AddAddress("raghukharvi1234@gmail.com");
            // $mail->Subject = "Leave";
            $mail->Body = "You not reached to the assigned location on time so send me the valid reason";
            if(!$mail->Send()) {
                echo "Mailer Error: " . $mail->ErrorInfo;
            } else {
                echo "Message has been sent";
            }
}