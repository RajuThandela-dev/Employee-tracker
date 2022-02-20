<?php
    include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $result=mysqli_query($con,"SELECT `id`, `E_id`, `date1`, `time1`, `L_date`, `purpose`, `confirm`, `reject` FROM `leave_table` WHERE  `confirm`=1");
    if(mysqli_num_rows( $result)>0){
        $array['confirm']=array();
        
        while($raw=mysqli_fetch_array( $result))
        {
            $temp=array();
            $temp['id']=$raw['id'];
            $temp['E_id']=$raw['E_id'];
            $E_id=$raw['E_id'];
            $EmpName=mysqli_fetch_array(mysqli_query($con,"SELECT emp_name FROM `employee` WHERE emp_id= '$E_id'"))[0];
            $temp['emp_name']=$EmpName;
            $temp['currentDate']=$raw['date1'];
            $temp['currentTime']=$raw['time1'];
            $temp['L_date']=$raw['L_date'];
            $temp['purpose']=$raw['purpose'];
            array_push($array['confirm'],$temp);
          

        }
        echo json_encode($array);

    }else{
        echo 0;
    }
