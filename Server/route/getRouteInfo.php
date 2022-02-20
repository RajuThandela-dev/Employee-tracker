<?php
   include('../connection/connection.php');
   header("Access-Control-Allow-Origin:*");
   header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
   header("Access-Control-Max-Age:1000");
   header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
   $result=mysqli_query($con,"SELECT * FROM `route_table` WHERE `routeid`  NOT IN(select routeId from assign_route) ");
 	if(mysqli_num_rows($result)>0){
 		$array=array();
 		while($raws=mysqli_fetch_array($result)){
 			array_push($array,$raws);
 		}
 		echo json_encode($array);
 	}else{
 		echo 0;
 	}
