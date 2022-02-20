<?php
// require("./PHPMailer-master/src/PHPMailer.php");
// require("./PHPMailer-master/src/SMTP.php");
// require("./PHPMailer-master/src/Exception.php");

    include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
    // print_r($_POST);
    // $mail = new PHPMailer\PHPMailer\PHPMailer();
    $emp_id=$_POST['emp_id'];
    $id=$_POST['ID'];
    $val=$_POST['value'];
    if($val===1){
    //    $i=$GLOBALS['id'];
        $qry="SELECT * FROM `leave_table` WHERE id='$id'";
        $result=mysqli_query($con,$qry);
        if(mysqli_num_rows($result)>0){
            // $p=$GLOBALS['id'];
            $qry1="UPDATE `leave_table` SET `confirm`=1 WHERE `id`='$id'";
            mysqli_query($con,$qry1);
            // $email=mysqli_fetch_array(mysqli_query($con,"SELECT  `emp_email` FROM `employee` WHERE `emp_id`='$emp_id'"))[0];
            // $mail->IsSMTP(); 

            // $mail->CharSet="UTF-8";
            // $mail->Host = "smtp.gmail.com";
            // $mail->SMTPDebug = 1; 
            // $mail->Port = 465 ; //465 or 587

            // $mail->SMTPSecure = 'ssl';  
            // $mail->SMTPAuth = true; 
            // $mail->IsHTML(true);

            // //Authentication
            // $mail->Username = "projecte276@gmail.com";
            // $mail->Password = "projectproject";

            // //Set Params
            // $mail->SetFrom("projecte276@gmail.com");
            // $mail->AddAddress($email);
            // // $mail->AddAddress("raghukharvi1234@gmail.com");
            // // $mail->Subject = "Leave";
            // $mail->Body = "your leave has been confirmed";
            // if(!$mail->Send()) {
            //     echo "Mailer Error: " . $mail->ErrorInfo;
            // } else {
            //     echo "Message has been sent";
            // }
            echo "confirmed";
        }else{
            echo 0;
        }
    }else{
        // $email1=mysqli_fetch_array(mysqli_query($con,"SELECT  `emp_email` FROM `employee` WHERE `emp_id`='$emp_id'"))[0];
        // $mail->IsSMTP(); 
        mysqli_query($con,"UPDATE `leave_table` SET `reject`=1 WHERE `id`='$id'");
        // $mail->CharSet="UTF-8";
        // $mail->Host = "smtp.gmail.com";
        // $mail->SMTPDebug = 1; 
        // $mail->Port = 465 ; //465 or 587

        // $mail->SMTPSecure = 'ssl';  
        // $mail->SMTPAuth = true; 
        // $mail->IsHTML(true);

        // //Authentication
        // $mail->Username = "projecte276@gmail.com";
        // $mail->Password = "projectproject";

        // //Set Params
        // $mail->SetFrom("projecte276@gmail.com");
        // $mail->AddAddress($email1);
        // // $mail->AddAddress("raghukharvi1234@gmail.com");
        // // $mail->Subject = "Leave";
        // $mail->Body = "your leave has been rejected";
        // if(!$mail->Send()) {
        //     echo "Mailer Error: " . $mail->ErrorInfo;
        // } else {
        //     echo "Message has been sent";
        // }
        echo 'rejected';
    }
   