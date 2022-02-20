<?php
	include('../connection/connection.php');
	 header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
     $_POST =json_decode(file_get_contents("php://input"),true);
     if(isset($_POST)){
     	$id=$_POST['local'];
     	$result=mysqli_query($con,"SELECT * FROM `assign_route` where emp_id='$id'");
	// print_r($result);
	if(mysqli_num_rows($result)>0){
		$array=array();
		while($rows=mysqli_fetch_array($result)){
			$id=$rows['emp_id'];
			$routeId=$rows['routeId'];
			$rows['location']=mysqli_fetch_array(mysqli_query($con,"SELECT  `location` FROM `route_table` WHERE `routeid`='$routeId'"))[0];
			$rows['routeName']=mysqli_fetch_array(mysqli_query($con,"SELECT  `locationName` FROM `route_table` WHERE `routeid`='$routeId'"))[0];
			$rows['empname']=mysqli_fetch_array(mysqli_query($con,"SELECT  `emp_name` FROM `employee` WHERE `emp_id`='$id'"))[0];
			array_push($array,$rows);
		}
		echo json_encode($array);
	}else{
		echo 0;
	}
     }
	