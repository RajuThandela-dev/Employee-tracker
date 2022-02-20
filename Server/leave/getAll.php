<?php
    include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    // $_POST =json_decode(file_get_contents("php://input"),true);
    $qry="SELECT `id`, `E_id`, `date1`, `time1`, `L_date`, `purpose`, `confirm`, `reject` FROM `leave_table` WHERE `confirm`=0 AND `reject`=0";
    $result=mysqli_query($con,$qry);
    if(mysqli_num_rows($result)>0){
        $response['data']=array();
        while($raw=mysqli_fetch_array($result)){
            $temp=array();
            // $EmpName=array();
            $temp['id']=$raw['id'];
            $E_id=$raw['E_id'];
            $EmpName=mysqli_fetch_array(mysqli_query($con,"SELECT emp_name FROM `employee` WHERE emp_id= '$E_id'"))[0];
            $temp['e_id']=$E_id;
            $temp['name']=$EmpName;
            $temp['L_date']=$raw['L_date'];
            $temp['purpose']=$raw['purpose'];
            $temp['currentDate']=$raw['date1'];
            $temp['currentTime']=$raw['time1'];
            $temp['confirm']=$raw['confirm'];
            $temp['reject']=$raw['reject'];
            array_push($response['data'],$temp);
        }
        echo json_encode($response);
    }else{
        echo 0;
    }