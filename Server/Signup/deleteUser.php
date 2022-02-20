<?php
    
    include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
    if($_POST['check']===1){
        $empid=$_POST['empid'];
        mysqli_query($con,"delete from `employee` where `emp_id`='$empid'");
        echo 1;
    }