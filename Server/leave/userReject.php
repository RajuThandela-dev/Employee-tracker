<?php
    include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
    $id=$_POST['empId'];
    $result=mysqli_query($con,"SELECT `id`, `E_id`, `date1`, `time1`, `L_date`, `purpose`, `confirm`, `reject` FROM `leave_table` where `E_id`='$id' AND  `reject`=1 ");
    if(mysqli_num_rows($result)){
       $res['userReject']=array();
    
       while($raw=mysqli_fetch_array($result)){
        $temp=array();
        $temp['id']=$raw['id'];
        $temp['currentDate']=$raw['date1'];
        $temp['currentTime']=$raw['time1'];
        $temp['L_date']=$raw['L_date'];
        $temp['purpose']=$raw['purpose'];
        array_push($res['userReject'],$temp);
       } 
       echo json_encode($res);
    }else{
        echo 0;
    }