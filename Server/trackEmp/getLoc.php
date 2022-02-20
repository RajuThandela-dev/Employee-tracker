<?php
	include('../connection/connection.php');
	 header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age:1000");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");
	$result=mysqli_query($con,"SELECT `id`, `emp_id`, `location`, `date1`, `time1` FROM `attendence_table`");
	if(mysqli_num_rows($result)>0){
		$arr=array();
		while($row=mysqli_fetch_array($result)){
			$empId=$row['emp_id'];
			$row['empName']=mysqli_fetch_array(mysqli_query($con,"SELECT  `emp_name` FROM `employee` WHERE `emp_id`='$empId'"))[0];
			array_push($arr,$row);

		}
		echo json_encode($arr);
	}else{
		echo 0;
	}