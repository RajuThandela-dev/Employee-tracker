<?php
    include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
//    print_r($_POST);
   
    if(isset($_POST)){
        $emp_id=$_POST['e_id'];
        $date=$_POST['date'];
        $confirm=$_POST['confirm'];
        $reject=$_POST['reject'];
        $currentDate=date("Y-m-d");
        $currentTime=date("h:i:s");
        $purpose=$_POST['purpose'];
        
        if($date===''||$purpose===''){
            echo 0;
        }else{
          $result=mysqli_query($con,"SELECT * FROM `leave_table` WHERE `date1`='$currentDate' AND `E_id`='$emp_id'");
          if(mysqli_num_rows($result)>0){
            echo 111;
          }else{
             $qry="INSERT INTO `leave_table`(`id`, `E_id`, `date1`, `time1`, `L_date`, `purpose`, `confirm`, `reject`) VALUES ('','$emp_id','$currentDate','$currentTime','$date','$purpose','$confirm','$reject')";
           if(mysqli_query($con,$qry)){
               echo 1;

           }else{
               echo 0;
           }
          }
          
        }
    }
