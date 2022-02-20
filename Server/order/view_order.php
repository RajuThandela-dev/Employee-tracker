<?php
	include("../connection/connection.php");
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS");
	header("Access-Control-Max-Age:1000");
	header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With");

	$result=mysqli_query($con,"SELECT `id`, `empID`, `currentDate`, `currentTime`, `jsonString` FROM `order_table` order by id desc");

	if(mysqli_num_rows($result)>0){
		$order=Array();
		while($row = mysqli_fetch_assoc($result)){
			$empId= $row['empID'];
			$empName=mysqli_fetch_array(mysqli_query($con,"SELECT  `emp_name` FROM `employee` WHERE `emp_id`= '$empId'"))[0];

			$row["empname"] = $empName;
				
			$row["jsonString"] = json_decode($row["jsonString"],true);
			array_push($order,$row);

		}
		print(json_encode($order));
	}else{
echo 0;
	}
	
