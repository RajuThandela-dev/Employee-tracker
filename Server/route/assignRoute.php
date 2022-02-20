<?php
	include('../connection/connection.php');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
    $_POST =json_decode(file_get_contents("php://input"),true);
   
    if($_POST){
    	 $id=$_POST['id'];
   		 $date=$_POST['date'];
    	 $time=$_POST['time'];
   		 $route=(string)$_POST['route'];

   		
   		 if($id==''|| $date==''|| $time==''|| $route==''){
   		 	echo 0;

   		 }else{
   		 	 $routeId=mysqli_fetch_array(mysqli_query($con,"SELECT `routeid` FROM `route_table` WHERE `location`='$route'"))[0];

   		 	 echo $routeId;
   		 	  $d=date($date);
   			  $t=date($time);
   			  if(mysqli_query($con,"INSERT INTO `assign_route`(`id`, `routeId`, `emp_id`, `Date1`, `time1`,`markAttendence`) VALUES ('','$routeId','$id','$d','$t',0)")){
   			  	echo 1;
   			  }else{
   			  	echo 0;
   			  }
   		 }

    }
   