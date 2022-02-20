<?php
   include('../connection/connection.php');
   header("Access-Control-Allow-Origin:*");
   header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
   header("Access-Control-Max-Age:1000");
   header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
   $_POST =json_decode(file_get_contents("php://input"),true);
//    print_r($_POST);
if($_POST['check']===1){
    $currentDate=date('Y-m-d');
    $currentTime=date('h:i:s');
    $E_id=$_POST['E_id'];
    $msg=$_POST['msg'];
    if($currentDate===''||$currentTime===''||$E_id===''||$msg===''){
        echo 0;
    }else{
        mysqli_query($con," INSERT INTO `issues`(`id`, `E_id`, `Date1`, `Time1`, `msg`) VALUES ('','$E_id','$currentDate','$currentTime','$msg')");
        echo 1;
    }
}
 