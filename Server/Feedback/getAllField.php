<?php
   include('../connection/connection.php');
   header("Access-Control-Allow-Origin:*");
   header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
   header("Access-Control-Max-Age:1000");
   header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
   $result=mysqli_query($con,"SELECT `id`, `E_id`, `Date1`, `Time1`, `msg` FROM `issues` order  by id desc");
   if(mysqli_num_rows($result)>0){
        $res['feedback']=array();
        while($raw=mysqli_fetch_array($result)){
            $temp=array();
            $temp['E_id']=$raw['E_id'];
            $id=  $temp['E_id'];
            $name=mysqli_fetch_array(mysqli_query($con,"select emp_name from employee where emp_id='$id'"))[0];
            $temp['name']=$name;
            $temp['date']=$raw['Date1'];
            $temp['time']=$raw['Time1'];
            $temp['msg']=$raw['msg'];
            array_push($res['feedback'],$temp);

        }
        echo json_encode($res);
   }else{
       echo 0;
   }